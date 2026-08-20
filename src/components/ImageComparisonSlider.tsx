"use client";

import React, { useState, useRef, useEffect, MouseEvent, TouchEvent } from 'react';

interface ImageComparisonSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeAlt?: string;
  afterAlt?: string;
  beforeImageClassName?: string;
  afterImageClassName?: string;
  className?: string;
}

export default function ImageComparisonSlider({
  beforeImage,
  afterImage,
  beforeAlt = "Before",
  afterAlt = "After",
  beforeImageClassName = "object-[50%_10%] scale-100",
  afterImageClassName = "object-[50%_45%] scale-120 translate-x-[2.5%] -translate-y-[3.5%]",
  className = ""
}: ImageComparisonSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current || !isDragging) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percentage = Math.max(0, Math.min((x / rect.width) * 100, 100));
    setSliderPosition(percentage);
  };

  const handleMouseMove = (e: MouseEvent) => handleMove(e.clientX);
  const handleTouchMove = (e: TouchEvent) => handleMove(e.touches[0].clientX);

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);

    const handleWindowMouseMove = (e: globalThis.MouseEvent) => {
      if (!isDragging || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
      const percentage = Math.max(0, Math.min((x / rect.width) * 100, 100));
      setSliderPosition(percentage);
    };

    const handleWindowTouchMove = (e: globalThis.TouchEvent) => {
      if (!isDragging || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(e.touches[0].clientX - rect.left, rect.width));
      const percentage = Math.max(0, Math.min((x / rect.width) * 100, 100));
      setSliderPosition(percentage);
    };

    if (isDragging) {
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchend', handleMouseUp);
      window.addEventListener('mousemove', handleWindowMouseMove);
      window.addEventListener('touchmove', handleWindowTouchMove, { passive: false });
    }

    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleMouseUp);
      window.removeEventListener('mousemove', handleWindowMouseMove);
      window.removeEventListener('touchmove', handleWindowTouchMove);
    };
  }, [isDragging]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden select-none cursor-ew-resize group ${className}`}
      onMouseDown={() => setIsDragging(true)}
      onMouseUp={() => setIsDragging(false)}
      onMouseMove={handleMouseMove}
      onTouchStart={() => setIsDragging(true)}
      onTouchMove={handleTouchMove}
    >
      {/* Background (After) Image */}
      <img
        src={afterImage}
        alt={afterAlt}
        className={`absolute inset-0 w-full h-full object-cover ${afterImageClassName} pointer-events-none transition-transform duration-300`}
        draggable={false}
      />

      {/* Foreground (Before) Image with Clip Path */}
      <div
        className="absolute inset-0 w-full h-full overflow-hidden"
        style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
      >
        <img
          src={beforeImage}
          alt={beforeAlt}
          className={`absolute inset-0 w-full h-full object-cover ${beforeImageClassName} pointer-events-none transition-transform duration-300`}
          draggable={false}
        />
        <div className="absolute inset-0 bg-negro/10 pointer-events-none" />
      </div>

      {/* Slider Line & Handle */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-blanco/80 cursor-ew-resize flex items-center justify-center pointer-events-none"
        style={{ left: `calc(${sliderPosition}% - 2px)` }}
      >
        <div className="w-10 h-10 bg-rojo rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(0,0,0,0.5)] transform transition-transform group-hover:scale-110">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 18l-6-6 6-6" />
            <path d="M14 6l6 6-6 6" />
          </svg>
        </div>
      </div>

      {/* Labels */}
      <div className="absolute top-4 left-4 bg-negro/60 backdrop-blur-sm text-blanco px-3 py-1 text-xs font-bold tracking-widest uppercase rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
        2007
      </div>
      <div className="absolute top-4 right-4 bg-negro/60 backdrop-blur-sm text-blanco px-3 py-1 text-xs font-bold tracking-widest uppercase rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
        2026
      </div>
    </div>
  );
}
