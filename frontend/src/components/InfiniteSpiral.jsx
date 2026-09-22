import React, { useEffect, useRef, useState, useMemo, useCallback } from "react";

/**
 * InfiniteSpiral - High-performance 3D Helix & Spiral Gallery
 *
 * Supports continuous auto-rotation, smooth pointer dragging with momentum,
 * depth-of-field blur, perspective scaling, and luxury borderless styling.
 */
export default function InfiniteSpiral({
  items = [],
  animationMode = "all",
  speed = 0.55,
  radius = 170,
  cardWidth = 100,
  cardHeight = 100,
  verticalSpacing = 60,
  perspective = 1000,
  cardRadius = 10,
  centerScale = 1.2,
  edgeBlur = 6,
  cardsPerTurn = 7,
  pauseOnHover = true,
  className = "",
  style = {},
  onCardClick = null,
}) {
  const containerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [activeOffset, setActiveOffset] = useState(0);

  // Fallback high-res luxury artworks if items are empty or paths fail
  const fallbackItems = useMemo(
    () => [
      { src: "https://images.unsplash.com/photo-1578301978162-7aae4d755744?q=80&w=800&auto=format&fit=crop", alt: "Classical Oil Painting", title: "Argonauts" },
      { src: "https://images.unsplash.com/photo-1685062478366-907bf61feee0?q=80&w=800&auto=format&fit=crop", alt: "Carrara Marble Sculpture", title: "Venus" },
      { src: "https://images.unsplash.com/photo-1779497698182-2316ce352f94?q=80&w=800&auto=format&fit=crop", alt: "Roman Antiquity Bronze", title: "Imperial Mask" },
      { src: "https://images.unsplash.com/photo-1579783901586-d88db74b4fe4?q=80&w=800&auto=format&fit=crop", alt: "Dutch Floral Masterpiece", title: "Still Life" },
      { src: "https://images.unsplash.com/photo-1625948085447-2881572802ca?q=80&w=800&auto=format&fit=crop", alt: "Vestal Virgin Marble", title: "Vestal Bust" },
      { src: "https://images.unsplash.com/photo-1556005693-00fff02f134c?q=80&w=800&auto=format&fit=crop", alt: "Baroque Canvas", title: "Magdalene" },
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
    const minSlots = Math.max(displayItems.length * 3, 21);
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

  // Smooth animation loop
  const animate = useCallback(
    (time) => {
      const delta = Math.min((time - lastTimeRef.current) / 1000, 0.1);
      lastTimeRef.current = time;

      if (!isDraggingRef.current) {
        const effectiveSpeed = pauseOnHover && isHovered ? 0 : speed * 0.45;
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

  // Unified pointer handlers (desktop mouse + touch screen)
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

    const moveFactor = deltaY * 0.008 + deltaX * 0.004;
    offsetRef.current -= moveFactor;
    velocityRef.current = -moveFactor * 25;

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

  // Safe wheel listener setup without passive event violations
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onWheel = (e) => {
      // Only scroll helix if hovering with alt/shift or if user intentionally drags
      const wheelFactor = e.deltaY * 0.0015;
      offsetRef.current += wheelFactor;
      velocityRef.current += wheelFactor * 5;
    };

    el.addEventListener("wheel", onWheel, { passive: true });
    return () => {
      el.removeEventListener("wheel", onWheel);
    };
  }, []);

  // Pre-calculate 3D positioning for visible slots
  const cards = useMemo(() => {
    const list = [];
    const angleStep = (2 * Math.PI) / Math.max(cardsPerTurn, 3);
    const nItems = displayItems.length;

    for (let i = -halfSlots; i <= halfSlots; i++) {
      const virtualIdx = i - activeOffset;
      const angle = virtualIdx * angleStep;

      const rawItemIdx = Math.floor(virtualIdx) % nItems;
      const itemIdx = (rawItemIdx + nItems) % nItems;
      const item = displayItems[itemIdx] || displayItems[0];

      const x = Math.sin(angle) * radius;
      const z = Math.cos(angle) * radius;
      const y = virtualIdx * verticalSpacing;

      // depthFactor = 1 at closest front, 0 at back
      const depthFactor = (z + radius) / (2 * radius || 1);
      const clampedDepth = Math.max(0, Math.min(1, depthFactor));

      const scale = 1 + (centerScale - 1) * clampedDepth;
      const blur = (1 - clampedDepth) * edgeBlur;

      const maxVertical = halfSlots * verticalSpacing * 0.85;
      const verticalFade = Math.max(0, 1 - Math.pow(Math.abs(y) / (maxVertical || 1), 2.5));
      const opacity = (0.2 + 0.8 * clampedDepth) * verticalFade;

      const rotateYDeg = (angle * 180) / Math.PI;

      if (opacity > 0.01) {
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
          depthFactor: clampedDepth,
          zIndex: Math.round(clampedDepth * 1000 + 500),
        });
      }
    }

    return list.sort((a, b) => a.zIndex - b.zIndex);
  }, [
    activeOffset,
    displayItems,
    halfSlots,
    cardsPerTurn,
    radius,
    verticalSpacing,
    centerScale,
    edgeBlur,
  ]);

  return (
    <div
      ref={containerRef}
      role="region"
      aria-label="3D Infinite Spiral Interactive Gallery"
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
              className="absolute pointer-events-auto transition-shadow duration-300 group"
              style={{
                width: `${cardWidth}px`,
                height: `${cardHeight}px`,
                borderRadius: `${cardRadius}px`,
                transformStyle: "preserve-3d",
                zIndex: card.zIndex,
                opacity: card.opacity,
                filter: `blur(${card.blur.toFixed(1)}px)`,
                transform: `translate3d(${card.x.toFixed(1)}px, ${card.y.toFixed(1)}px, ${card.z.toFixed(1)}px) rotateY(${card.rotateYDeg.toFixed(1)}deg) scale(${card.scale.toFixed(3)})`,
                boxShadow:
                  card.depthFactor > 0.7
                    ? "0 12px 28px -6px rgba(0, 0, 0, 0.75)"
                    : "0 4px 14px rgba(0, 0, 0, 0.5)",
              }}
            >
              {/* Borderless Card Container */}
              <div
                className={`relative h-full w-full overflow-hidden transition-transform duration-300 ${
                  card.depthFactor > 0.6 ? "group-hover:scale-105" : ""
                } ${isSelected ? "ring-2 ring-champagne/80 ring-offset-2 ring-offset-ink" : ""}`}
                style={{
                  borderRadius: `${cardRadius}px`,
                  backgroundColor: "#0B1728",
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
                  className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                />

                {/* Subtle Vignette Overlay for Depth */}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent pointer-events-none opacity-50 group-hover:opacity-20 transition-opacity"
                  style={{ borderRadius: `${cardRadius}px` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Top & Bottom Depth Vignettes */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-ink via-ink/60 to-transparent z-20"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ink via-ink/60 to-transparent z-20"
      />

      {/* Ambient Lighting Glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-champagne/[0.06] blur-3xl"
      />
    </div>
  );
}
