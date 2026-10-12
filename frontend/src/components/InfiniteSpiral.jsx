import React, { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { Sparkles, Layers, Maximize2 } from "lucide-react";

/**
 * InfiniteSpiral — Ultra-High Performance 3D Stacked-Card Gallery
 *
 * Renders distinct 3D card stacks arranged in a spatial elliptical arc.
 * Each stack contains approximately 3–4 layered images with physical depth,
 * subtle angular fanning, and elegant champagne borders.
 *
 * Performance features:
 * - Direct DOM transform updates in requestAnimationFrame (ZERO React re-renders during 60fps rotation)
 * - IntersectionObserver pauses rotation when off-screen (0% GPU/CPU when not visible)
 * - Hover & drag pause auto-rotation
 * - Removed expensive multi-pass CSS blur filters
 * - Touch & pointer drag with smooth inertia
 */
export default function InfiniteSpiral({
  stacks = [],
  items = [],
  speed = 0.38,
  radiusX = null,
  radiusZ = null,
  cardWidth = 250,
  cardHeight = 330,
  perspective = 1250,
  cardRadius = 14,
  centerScale = 1.24,
  pauseOnHover = true,
  className = "",
  style = {},
  onCardClick = null,
  onActiveStackChange = null,
}) {
  const containerRef = useRef(null);
  const [containerDimensions, setContainerDimensions] = useState({ width: 1200, height: 680 });
  const [isHovered, setIsHovered] = useState(false);
  const [activeStackIndex, setActiveStackIndex] = useState(0);

  // Per-stack active card index (which of the 3-4 cards is currently in front)
  const [stackCardPointers, setStackCardPointers] = useState({});

  // Group items into stacks if `stacks` prop is empty
  const galleryStacks = useMemo(() => {
    if (stacks && stacks.length > 0) return stacks;
    if (!items || items.length === 0) return [];

    // Chunk items into stacks of 4 images each
    const chunkSize = 4;
    const result = [];
    for (let i = 0; i < items.length; i += chunkSize) {
      const slice = items.slice(i, i + chunkSize);
      result.push({
        id: `stack-${Math.floor(i / chunkSize) + 1}`,
        title: slice[0]?.title || `Collection Stack ${Math.floor(i / chunkSize) + 1}`,
        category: slice[0]?.category || "Curated Pieces",
        description: slice[0]?.description || "",
        images: slice,
      });
    }
    return result;
  }, [stacks, items]);

  const numStacks = galleryStacks.length || 1;

  // Responsive dimension tracking
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const updateSize = () => {
      const rect = el.getBoundingClientRect();
      if (rect.width > 0) {
        setContainerDimensions({
          width: rect.width,
          height: rect.height || 680,
        });
      }
    };

    updateSize();
    const ro = new ResizeObserver(updateSize);
    ro.observe(el);

    return () => ro.disconnect();
  }, []);

  // Responsive card sizing
  const { responsiveWidth, responsiveHeight, computedRadiusX, computedRadiusZ } = useMemo(() => {
    const w = containerDimensions.width;
    let rw = cardWidth;
    let rh = cardHeight;

    if (w < 480) {
      rw = 175;
      rh = 235;
    } else if (w < 768) {
      rw = 210;
      rh = 280;
    } else if (w < 1100) {
      rw = 230;
      rh = 305;
    }

    const radX = radiusX ?? Math.max(260, Math.min(w * 0.40, 620));
    const radZ = radiusZ ?? radX * 0.52;

    return {
      responsiveWidth: rw,
      responsiveHeight: rh,
      computedRadiusX: radX,
      computedRadiusZ: radZ,
    };
  }, [containerDimensions.width, cardWidth, cardHeight, radiusX, radiusZ]);

  // Animation & Physics Refs
  const rotationRef = useRef(0);
  const velocityRef = useRef(0);
  const isDraggingRef = useRef(false);
  const isHoveredRef = useRef(false);
  const isInViewRef = useRef(true);
  const lastPointerXRef = useRef(0);
  const lastTimeRef = useRef(performance.now());
  const rafIdRef = useRef(null);
  const stackElementsRef = useRef([]);
  const lastActiveIndexRef = useRef(0);

  // Pause rotation when section is off-screen using IntersectionObserver
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isInViewRef.current = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Cycle the front card of a stack
  const cycleStackCard = useCallback((stackIdx, e) => {
    e?.stopPropagation();
    setStackCardPointers((prev) => {
      const current = prev[stackIdx] || 0;
      const stack = galleryStacks[stackIdx];
      const max = (stack?.images?.length || 4) - 1;
      return {
        ...prev,
        [stackIdx]: current >= max ? 0 : current + 1,
      };
    });
  }, [galleryStacks]);

  // Direct DOM 3D transform updates for smooth 60–120 FPS
  const updateStackTransforms = useCallback((currentRotation) => {
    const N = numStacks;
    if (N === 0) return;

    let closestStackIdx = 0;
    let maxClampedDepth = -1;

    for (let i = 0; i < N; i++) {
      const el = stackElementsRef.current[i];
      if (!el) continue;

      const angle = (i * (2 * Math.PI) / N) + currentRotation;
      const x = Math.sin(angle) * computedRadiusX;
      const z = Math.cos(angle) * computedRadiusZ;

      // Depth factor: 1 at front center, 0 at deep back
      const depthFactor = (z + computedRadiusZ) / (2 * computedRadiusZ || 1);
      const clampedDepth = Math.max(0, Math.min(1, depthFactor));

      if (clampedDepth > maxClampedDepth) {
        maxClampedDepth = clampedDepth;
        closestStackIdx = i;
      }

      // Center stack gets prominent scale; side stacks recede
      const scale = 0.74 + (centerScale - 0.74) * Math.pow(clampedDepth, 1.35);

      // Angled stacks on the left and right face inward towards the center focus
      const rotateYDeg = Math.atan2(x, z + computedRadiusZ * 1.25) * (180 / Math.PI) * 0.76;

      // Subtle atmospheric opacity falloff for depth
      const opacity = 0.42 + 0.58 * Math.pow(clampedDepth, 0.85);
      const zIndex = Math.round(clampedDepth * 1000 + 10);

      // Direct GPU transform update
      el.style.transform = `translate3d(${x.toFixed(1)}px, 0px, ${z.toFixed(1)}px) rotateY(${rotateYDeg.toFixed(1)}deg) scale(${scale.toFixed(3)})`;
      el.style.zIndex = zIndex;
      el.style.opacity = opacity.toFixed(2);

      // Add a subtle focal class for the front center stack
      if (clampedDepth > 0.94) {
        el.setAttribute("data-focal", "true");
      } else {
        el.removeAttribute("data-focal");
      }
    }

    // Only update React state when active center stack changes (avoids spamming renders)
    if (closestStackIdx !== lastActiveIndexRef.current) {
      lastActiveIndexRef.current = closestStackIdx;
      setActiveStackIndex(closestStackIdx);
      if (onActiveStackChange) {
        onActiveStackChange(galleryStacks[closestStackIdx], closestStackIdx);
      }
    }
  }, [numStacks, computedRadiusX, computedRadiusZ, centerScale, galleryStacks, onActiveStackChange]);

  // Main high-efficiency animation loop
  const animate = useCallback((time) => {
    // Only process when visible on screen
    if (isInViewRef.current) {
      const delta = Math.min((time - lastTimeRef.current) / 1000, 0.1);
      lastTimeRef.current = time;

      const shouldPause = (pauseOnHover && isHoveredRef.current) || isDraggingRef.current;

      if (!shouldPause) {
        // Continuous auto-rotation
        rotationRef.current += (speed * 0.32 + velocityRef.current) * delta;
        // Friction damping for velocity
        velocityRef.current *= 0.93;
        if (Math.abs(velocityRef.current) < 0.0001) {
          velocityRef.current = 0;
        }
      } else if (!isDraggingRef.current && isHoveredRef.current) {
        // Decelerate inertia while hovered
        if (Math.abs(velocityRef.current) > 0.0001) {
          rotationRef.current += velocityRef.current * delta;
          velocityRef.current *= 0.88;
        }
      }

      updateStackTransforms(rotationRef.current);
    } else {
      lastTimeRef.current = time;
    }

    rafIdRef.current = requestAnimationFrame(animate);
  }, [speed, pauseOnHover, updateStackTransforms]);

  useEffect(() => {
    lastTimeRef.current = performance.now();
    rafIdRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [animate]);

  // Pointer drag handlers
  const handlePointerDown = (e) => {
    isDraggingRef.current = true;
    lastPointerXRef.current = e.clientX;
    velocityRef.current = 0;
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // Ignore
    }
  };

  const handlePointerMove = (e) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.clientX - lastPointerXRef.current;
    lastPointerXRef.current = e.clientX;

    const moveFactor = deltaX * 0.0042;
    rotationRef.current -= moveFactor;
    velocityRef.current = -moveFactor * 20;

    // Immediate visual update during drag
    updateStackTransforms(rotationRef.current);
  };

  const handlePointerUp = (e) => {
    isDraggingRef.current = false;
    try {
      if (e?.pointerId && e.currentTarget?.hasPointerCapture?.(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
    } catch {
      // Ignore
    }
  };

  // Wheel interaction
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onWheel = (e) => {
      const wheelFactor = (e.deltaX || e.deltaY) * 0.0012;
      rotationRef.current += wheelFactor;
      velocityRef.current += wheelFactor * 3.5;
    };

    el.addEventListener("wheel", onWheel, { passive: true });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  return (
    <div
      ref={containerRef}
      role="region"
      aria-label="3D Stacked-Card Exhibition Gallery"
      className={`relative h-full w-full select-none overflow-hidden touch-none cursor-grab active:cursor-grabbing ${className}`}
      style={{
        perspective: `${perspective}px`,
        ...style,
      }}
      onMouseEnter={() => {
        isHoveredRef.current = true;
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        isHoveredRef.current = false;
        setIsHovered(false);
        isDraggingRef.current = false;
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      {/* 3D Scene Origin */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {galleryStacks.map((stack, stackIdx) => {
          const isFocal = stackIdx === activeStackIndex;
          const currentPointer = stackCardPointers[stackIdx] || 0;
          const stackImages = stack.images || [];
          const totalInStack = Math.min(stackImages.length, 4);

          // Rearrange the 3-4 images so the current pointer is at index 0 (front)
          const orderedImages = [];
          for (let k = 0; k < totalInStack; k++) {
            const wrappedIdx = (currentPointer + k) % totalInStack;
            orderedImages.push(stackImages[wrappedIdx] || stackImages[0]);
          }

          return (
            <div
              key={stack.id || stackIdx}
              ref={(el) => (stackElementsRef.current[stackIdx] = el)}
              className="absolute pointer-events-auto will-change-transform"
              style={{
                width: `${responsiveWidth}px`,
                height: `${responsiveHeight}px`,
                transformStyle: "preserve-3d",
                marginTop: "-16px",
              }}
            >
              {/* Stack Wrapper: 3–4 layered images with physical depth */}
              <div
                className="relative h-full w-full group"
                style={{
                  transformStyle: "preserve-3d",
                }}
              >
                {orderedImages.map((image, layerIdx) => {
                  const isFront = layerIdx === 0;

                  // Layered offsets: exactly 3–4 images with elegant fanning depth
                  // Layer 0 is front. Layers 1, 2, 3 fan backwards with subtle tilts and elevations
                  const layerTransforms = [
                    { x: 0, y: 0, z: 0, rz: 0 },
                    { x: 9, y: -12, z: -26, rz: 3.2 },
                    { x: -11, y: -22, z: -52, rz: -3.8 },
                    { x: 2, y: -30, z: -76, rz: 1.6 },
                  ];

                  const layer = layerTransforms[layerIdx] || layerTransforms[3];

                  return (
                    <div
                      key={image.id || layerIdx}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (isFront) {
                          if (onCardClick) onCardClick(image);
                        } else {
                          // Clicking a rear card brings it to front!
                          cycleStackCard(stackIdx, e);
                        }
                      }}
                      className={`absolute inset-0 rounded-2xl transition-transform duration-500 ease-out cursor-pointer ${
                        isFront
                          ? isFocal
                            ? "border-2 border-champagne shadow-[0_20px_45px_-10px_rgba(0,0,0,0.85),0_0_25px_rgba(185,154,104,0.22)]"
                            : "border border-champagne/45 shadow-[0_15px_30px_-8px_rgba(0,0,0,0.7)] group-hover:border-champagne/80"
                          : layerIdx === 1
                          ? "border border-champagne/30 shadow-lg"
                          : layerIdx === 2
                          ? "border border-champagne/20 shadow-md"
                          : "border border-champagne/15"
                      }`}
                      style={{
                        transform: `translate3d(${layer.x}px, ${layer.y}px, ${layer.z}px) rotateZ(${layer.rz}deg)`,
                        zIndex: 10 - layerIdx,
                        borderRadius: `${cardRadius}px`,
                        backgroundColor: "#07101D",
                      }}
                    >
                      {/* Inner Card Container with zero stretching or distortion */}
                      <div
                        className="relative h-full w-full overflow-hidden rounded-2xl"
                        style={{ borderRadius: `${cardRadius}px` }}
                      >
                        <img
                          src={image.src}
                          alt={image.alt || image.title}
                          loading="lazy"
                          onError={(e) => {
                            if (image.fallback && e.currentTarget.src !== image.fallback) {
                              e.currentTarget.src = image.fallback;
                            }
                          }}
                          style={{
                            objectFit: "cover",
                            objectPosition: image.objectPosition || "center",
                          }}
                          className={`h-full w-full object-cover transition-transform duration-700 ease-out ${
                            isFront ? "group-hover:scale-105" : ""
                          }`}
                        />

                        {/* Soft Vignette Overlay */}
                        <div
                          className={`absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/25 to-transparent pointer-events-none transition-opacity ${
                            isFront ? "opacity-60 group-hover:opacity-40" : "opacity-75"
                          }`}
                        />

                        {/* Front Card Header Details (Stack Index + Layer Indicator) */}
                        {isFront && (
                          <div className="absolute top-3 inset-x-3 flex items-center justify-between pointer-events-none z-10">
                            <span className="flex items-center gap-1 rounded-full border border-champagne/25 bg-ink/75 px-2.5 py-0.5 text-[9px] uppercase tracking-[0.2em] text-champagne/90 backdrop-blur-sm">
                              <Sparkles size={10} className="text-champagne" />
                              <span>Stack {String(stackIdx + 1).padStart(2, "0")}</span>
                            </span>

                            {/* Indicator: 3–4 layered cards indicator */}
                            <div className="flex items-center gap-1 rounded-full border border-champagne/20 bg-ink/75 px-2 py-0.5 text-[9px] text-ivory/70 backdrop-blur-sm">
                              <Layers size={10} className="text-champagne/80" />
                              <span>
                                {currentPointer + 1}/{totalInStack}
                              </span>
                            </div>
                          </div>
                        )}

                        {/* Front Card Bottom Overlay */}
                        {isFront && (
                          <div className="absolute inset-x-0 bottom-0 p-3.5 sm:p-4 pointer-events-none z-10 transition-transform duration-300">
                            <span className="text-[9px] uppercase tracking-[0.22em] text-champagne font-medium">
                              {image.category || stack.theme}
                            </span>
                            <p className="font-serif text-xs sm:text-sm tracking-wide text-ivory drop-shadow-md line-clamp-1">
                              {image.title}
                            </p>
                          </div>
                        )}

                        {/* Quick Inspect Button on Front Card */}
                        {isFront && isFocal && (
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                            <span className="flex items-center gap-1.5 rounded-full border border-champagne/60 bg-navy/90 px-3.5 py-1.5 text-[10px] uppercase tracking-[0.2em] text-champagne backdrop-blur-md shadow-xl">
                              <Maximize2 size={11} />
                              <span>Inspect</span>
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Top & Bottom Cinematic Edge Vignettes */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#060D17] via-[#060D17]/60 to-transparent z-20"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#060D17] via-[#060D17]/60 to-transparent z-20"
      />

      {/* Peripheral Edge Fades for Seamless Wide Stage */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#060D17]/90 via-[#060D17]/30 to-transparent z-20"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#060D17]/90 via-[#060D17]/30 to-transparent z-20"
      />

      {/* Ambient Depth Glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[300px] rounded-full bg-champagne/[0.04] blur-3xl"
      />
    </div>
  );
}
