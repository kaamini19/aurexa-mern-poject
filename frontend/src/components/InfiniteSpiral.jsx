import React, { useEffect, useRef, useState, useMemo, useCallback } from "react";

/**
 * InfiniteSpiral - High-performance 3D Spatial Exhibition Gallery
 *
 * Distributes artwork cards across a broad elliptical 3D field spanning 75-85%
 * of viewport width. Features a primary focal card at center foreground,
 * flanking secondary artworks at varying depths and elevations, and softly
 * blurred background pieces. Preserves continuous auto-rotation, smooth inertia
 * dragging, hover-pause, and card selection interactions.
 */
export default function InfiniteSpiral({
  items = [],
  speed = 0.5,
  radiusX = null, // Auto-computed responsively from container width if null
  radiusZ = null, // Auto-computed responsively from radiusX if null
  cardWidth = 210,
  cardHeight = 280,
  perspective = 1200,
  cardRadius = 14,
  centerScale = 1.22,
  edgeBlur = 7,
  cardsPerTurn = 8,
  pauseOnHover = true,
  className = "",
  style = {},
  onCardClick = null,
}) {
  const containerRef = useRef(null);
  const [containerDimensions, setContainerDimensions] = useState({ width: 1200, height: 680 });
  const [isHovered, setIsHovered] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [activeOffset, setActiveOffset] = useState(0);

  // Responsive dimension observer to keep exact 75-85% viewport coverage across all screen sizes
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
    window.addEventListener("resize", updateSize);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", updateSize);
    };
  }, []);

  // Compute responsive radii for broad elliptical spatial arrangement
  const { computedRadiusX, computedRadiusZ } = useMemo(() => {
    const w = containerDimensions.width;
    // Distribute cards across ~78-84% of the container width
    const calculatedRadiusX = radiusX ?? Math.max(280, Math.min(w * 0.42, 680));
    const calculatedRadiusZ = radiusZ ?? calculatedRadiusX * 0.52;
    return {
      computedRadiusX: calculatedRadiusX,
      computedRadiusZ: calculatedRadiusZ,
    };
  }, [containerDimensions.width, radiusX, radiusZ]);

  // Fallback high-res luxury artworks if items are empty
  const fallbackItems = useMemo(
    () => [
      { src: "https://images.unsplash.com/photo-1578301978162-7aae4d755744?q=80&w=800&auto=format&fit=crop", alt: "Classical Oil Painting", title: "Alpine Solitude" },
      { src: "https://images.unsplash.com/photo-1685062478366-907bf61feee0?q=80&w=800&auto=format&fit=crop", alt: "Carrara Marble Sculpture", title: "Emerald Canopy" },
      { src: "https://images.unsplash.com/photo-1779497698182-2316ce352f94?q=80&w=800&auto=format&fit=crop", alt: "Roman Antiquity Bronze", title: "Highlands Peak" },
      { src: "https://images.unsplash.com/photo-1579783901586-d88db74b4fe4?q=80&w=800&auto=format&fit=crop", alt: "Dutch Floral Masterpiece", title: "Lapis Horizon" },
      { src: "https://images.unsplash.com/photo-1625948085447-2881572802ca?q=80&w=800&auto=format&fit=crop", alt: "Vestal Virgin Marble", title: "Verdant Mist" },
      { src: "https://images.unsplash.com/photo-1556005693-00fff02f134c?q=80&w=800&auto=format&fit=crop", alt: "Baroque Canvas", title: "Golden Dune" },
    ],
    []
  );

  const displayItems = useMemo(() => {
    if (!items || items.length === 0) return fallbackItems;
    return items.map((item, idx) =>
      typeof item === "string" ? { src: item, alt: `Gallery item ${idx + 1}` } : item
    );
  }, [items, fallbackItems]);

  const totalSlots = useMemo(() => {
    const minSlots = Math.max(displayItems.length * 4, 25);
    return minSlots % 2 === 0 ? minSlots + 1 : minSlots;
  }, [displayItems.length]);

  const halfSlots = Math.floor(totalSlots / 2);

  // Physics & Animation State Refs
  const offsetRef = useRef(0);
  const velocityRef = useRef(0);
  const isDraggingRef = useRef(false);
  const lastPointerYRef = useRef(0);
  const lastPointerXRef = useRef(0);
  const lastTimeRef = useRef(performance.now());
  const rafIdRef = useRef(null);

  // Smooth continuous animation loop with inertia
  const animate = useCallback(
    (time) => {
      const delta = Math.min((time - lastTimeRef.current) / 1000, 0.1);
      lastTimeRef.current = time;

      if (!isDraggingRef.current) {
        const effectiveSpeed = pauseOnHover && isHovered ? 0 : speed * 0.42;
        offsetRef.current += (effectiveSpeed + velocityRef.current) * delta;

        // Inertia damping
        velocityRef.current *= 0.92;
        if (Math.abs(velocityRef.current) < 0.0001) {
          velocityRef.current = 0;
        }
      }

      setActiveOffset(offsetRef.current);
      rafIdRef.current = requestAnimationFrame(animate);
    },
    [speed, pauseOnHover, isHovered]
  );

  useEffect(() => {
    lastTimeRef.current = performance.now();
    rafIdRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [animate]);

  // Unified pointer handlers for dragging across the wide gallery space
  const handlePointerDown = (e) => {
    isDraggingRef.current = true;
    lastPointerYRef.current = e.clientY;
    lastPointerXRef.current = e.clientX;
    velocityRef.current = 0;
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // Ignore if pointer capture fails
    }
  };

  const handlePointerMove = (e) => {
    if (!isDraggingRef.current) return;
    const deltaY = e.clientY - lastPointerYRef.current;
    const deltaX = e.clientX - lastPointerXRef.current;

    // Responsive horizontal and vertical rotation sensitivity
    const moveFactor = deltaX * 0.0045 + deltaY * 0.0025;
    offsetRef.current -= moveFactor;
    velocityRef.current = -moveFactor * 22;

    lastPointerYRef.current = e.clientY;
    lastPointerXRef.current = e.clientX;
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

  // Wheel interaction with momentum
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onWheel = (e) => {
      const wheelFactor = e.deltaX !== 0 ? e.deltaX * 0.0012 : e.deltaY * 0.0012;
      offsetRef.current += wheelFactor;
      velocityRef.current += wheelFactor * 4;
    };

    el.addEventListener("wheel", onWheel, { passive: true });
    return () => {
      el.removeEventListener("wheel", onWheel);
    };
  }, []);

  // Pre-calculate 3D spatial positioning for broad exhibition composition
  const cards = useMemo(() => {
    const list = [];
    const angleStep = (2 * Math.PI) / Math.max(cardsPerTurn, 4);
    const nItems = displayItems.length;

    for (let i = -halfSlots; i <= halfSlots; i++) {
      const virtualIdx = i - activeOffset;
      const angle = virtualIdx * angleStep;

      const rawItemIdx = Math.floor(virtualIdx) % nItems;
      const itemIdx = (rawItemIdx + nItems) % nItems;
      const item = displayItems[itemIdx] || displayItems[0];

      // Broad elliptical horizontal and depth positions
      const x = Math.sin(angle) * computedRadiusX;
      const z = Math.cos(angle) * computedRadiusZ;

      // Graceful multi-depth harmonic vertical elevation
      const yWave = Math.sin(angle * 1.5) * 32 + Math.cos(angle * 0.75) * 18;
      const yStagger = ((Math.abs(i) % 3) - 1) * 12;
      const y = yWave + yStagger;

      // Depth factor: 1 at front focal point (closest z), 0 at deep back
      const depthFactor = (z + computedRadiusZ) / (2 * computedRadiusZ || 1);
      const clampedDepth = Math.max(0, Math.min(1, depthFactor));

      // Focal card at center gets primary scale; background cards recede gracefully
      const scale = 0.78 + (centerScale - 0.78) * Math.pow(clampedDepth, 1.35);

      // Depth-of-field blur: sharp focus at front (0px), progressive blur receding back (up to edgeBlur)
      const blur = Math.pow(1 - clampedDepth, 1.4) * edgeBlur;

      // Subtle opacity falloff for distant atmospheric depth
      const opacity = 0.35 + 0.65 * Math.pow(clampedDepth, 0.85);

      // Gentle inward rotation facing viewer for museum-like visibility
      const rotateYDeg = Math.atan2(x, z + computedRadiusZ * 1.3) * (180 / Math.PI) * 0.72;
      const rotateXDeg = -y * 0.05;

      if (opacity > 0.05) {
        list.push({
          slotId: i,
          item,
          x,
          y,
          z,
          scale,
          blur,
          opacity,
          rotateYDeg,
          rotateXDeg,
          depthFactor: clampedDepth,
          zIndex: Math.round(clampedDepth * 1000 + 100),
          isFocalPoint: clampedDepth > 0.92,
        });
      }
    }

    return list.sort((a, b) => a.zIndex - b.zIndex);
  }, [
    activeOffset,
    displayItems,
    halfSlots,
    cardsPerTurn,
    computedRadiusX,
    computedRadiusZ,
    centerScale,
    edgeBlur,
  ]);

  return (
    <div
      ref={containerRef}
      role="region"
      aria-label="3D Infinite Spatial Exhibition Gallery"
      className={`relative h-full w-full select-none overflow-hidden touch-none cursor-grab active:cursor-grabbing ${className}`}
      style={{
        perspective: `${perspective}px`,
        ...style,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
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
        {cards.map((card) => {
          const isSelected = selectedCard === card.item;

          return (
            <div
              key={card.slotId}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedCard(card.item);
                if (onCardClick) onCardClick(card.item);
              }}
              className="absolute pointer-events-auto transition-[box-shadow,border-color] duration-300 group"
              style={{
                width: `${cardWidth}px`,
                height: `${cardHeight}px`,
                borderRadius: `${cardRadius}px`,
                transformStyle: "preserve-3d",
                zIndex: card.zIndex,
                opacity: card.opacity,
                filter: `blur(${card.blur.toFixed(1)}px)`,
                transform: `translate3d(${card.x.toFixed(1)}px, ${card.y.toFixed(1)}px, ${card.z.toFixed(1)}px) rotateY(${card.rotateYDeg.toFixed(1)}deg) rotateX(${card.rotateXDeg.toFixed(1)}deg) scale(${card.scale.toFixed(3)})`,
                boxShadow:
                  card.depthFactor > 0.8
                    ? "0 20px 45px -10px rgba(0, 0, 0, 0.85), 0 0 25px rgba(185, 154, 104, 0.12)"
                    : card.depthFactor > 0.5
                    ? "0 12px 28px -6px rgba(0, 0, 0, 0.7)"
                    : "0 6px 16px rgba(0, 0, 0, 0.5)",
              }}
            >
              {/* Artwork Card Container */}
              <div
                className={`relative h-full w-full overflow-hidden transition-all duration-300 border ${
                  isSelected
                    ? "border-champagne ring-2 ring-champagne/80 ring-offset-2 ring-offset-ink"
                    : card.isFocalPoint
                    ? "border-champagne/40 group-hover:border-champagne/80"
                    : "border-champagne/20 group-hover:border-champagne/50"
                } ${card.depthFactor > 0.6 ? "group-hover:scale-[1.03]" : ""}`}
                style={{
                  borderRadius: `${cardRadius}px`,
                  backgroundColor: "#081220",
                }}
              >
                <img
                  src={card.item.src}
                  alt={card.item.alt || "Artwork"}
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = fallbackItems[Math.abs(card.slotId) % fallbackItems.length].src;
                  }}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                />

                {/* Subtle Cinematic Vignette Overlay */}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent pointer-events-none opacity-60 group-hover:opacity-30 transition-opacity"
                  style={{ borderRadius: `${cardRadius}px` }}
                />

                {/* Artwork Title Overlay for Focal & Prominent Cards */}
                {card.item.title && (
                  <div
                    className={`absolute inset-x-0 bottom-0 p-3.5 transition-opacity duration-300 pointer-events-none ${
                      card.isFocalPoint ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                    }`}
                  >
                    <p className="font-serif text-xs tracking-wider text-ivory drop-shadow-md">
                      {card.item.title}
                    </p>
                    <span className="text-[9px] uppercase tracking-[0.2em] text-champagne/90">
                      Curated Piece
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Top & Bottom Cinematic Edge Vignettes */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-ink via-ink/60 to-transparent z-20"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-ink via-ink/60 to-transparent z-20"
      />

      {/* Left & Right Peripheral Edge Fades for Seamless Infinite Horizon */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-ink/90 via-ink/40 to-transparent z-20"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-ink/90 via-ink/40 to-transparent z-20"
      />

      {/* Ambient Lighting Depth Glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] rounded-full bg-champagne/[0.05] blur-3xl"
      />
    </div>
  );
}
