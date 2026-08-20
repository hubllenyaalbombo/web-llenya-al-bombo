"use client";

import React from "react";

/**
 * Global background texture made of irregular graffiti/brush strokes and splatters.
 * It is fixed to the viewport and sits behind all content.
 */
export default function GlobalGraffiti() {
  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden opacity-[0.15]">
      {/* SVG Filter for rough brush/graffiti effect */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <filter id="global-brush-texture">
            <feTurbulence type="fractalNoise" baseFrequency="0.06" numOctaves="3" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="8" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>

      {/* 
        We use multiple SVG blocks scattered around the screen.
        Since it's a fixed background, we can use percentage-based positioning
        to ensure it covers large screens well.
      */}

      {/* Top Left Area - Red Stroke */}
      <svg className="absolute -top-[10%] -left-[10%] w-[60%] h-[50%] text-rojo transform -rotate-12" viewBox="0 0 200 100" preserveAspectRatio="none">
        <path d="M -20,60 Q 50,10 100,60 T 250,40" fill="none" stroke="currentColor" strokeWidth="40" strokeLinecap="round" filter="url(#global-brush-texture)" opacity="0.8" />
        <path d="M 10,30 Q 70,80 150,30 T 300,50" fill="none" stroke="currentColor" strokeWidth="25" strokeLinecap="round" filter="url(#global-brush-texture)" opacity="0.6" />
      </svg>

      {/* Top Right Area - White Stroke */}
      <svg className="absolute -top-[5%] -right-[5%] w-[40%] h-[40%] text-blanco transform rotate-12" viewBox="0 0 200 100" preserveAspectRatio="none">
        <path d="M 250,30 Q 150,90 100,50 T -20,40" fill="none" stroke="currentColor" strokeWidth="35" strokeLinecap="round" filter="url(#global-brush-texture)" opacity="0.6" />
      </svg>

      {/* Middle Left - Thick White Splatter/Stroke */}
      <svg className="absolute top-[35%] -left-[5%] w-[50%] h-[30%] text-blanco transform -rotate-6" viewBox="0 0 200 100" preserveAspectRatio="none">
        <path d="M -50,50 Q 80,10 120,50 T 250,80" fill="none" stroke="currentColor" strokeWidth="30" strokeLinecap="round" filter="url(#global-brush-texture)" opacity="0.5" />
      </svg>

      {/* Middle Right - Red Zig-Zag */}
      <svg className="absolute top-[40%] right-[5%] w-[30%] h-[30%] text-rojo transform rotate-6" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
        <path d="M 0,90 L 30,10 L 60,80 L 90,20 L 120,90" fill="none" stroke="currentColor" strokeWidth="10" strokeLinejoin="round" strokeLinecap="round" filter="url(#global-brush-texture)" opacity="0.7" />
      </svg>

      {/* Bottom Right - Massive Red Stroke */}
      <svg className="absolute bottom-[5%] -right-[15%] w-[70%] h-[50%] text-rojo transform -rotate-12" viewBox="0 0 200 100" preserveAspectRatio="none">
        <path d="M 250,60 Q 150,20 100,60 T -50,40" fill="none" stroke="currentColor" strokeWidth="50" strokeLinecap="round" filter="url(#global-brush-texture)" opacity="0.7" />
      </svg>

      {/* Bottom Left - White Stroke */}
      <svg className="absolute -bottom-[10%] -left-[5%] w-[60%] h-[40%] text-blanco transform rotate-6" viewBox="0 0 200 100" preserveAspectRatio="none">
        <path d="M -20,50 Q 100,100 150,50 T 300,50" fill="none" stroke="currentColor" strokeWidth="40" strokeLinecap="round" filter="url(#global-brush-texture)" opacity="0.5" />
      </svg>

      {/* Random Dots/Splatter Overlay */}
      <div className="absolute inset-0 w-full h-full" style={{ filter: 'url(#global-brush-texture)' }}>
        <div className="absolute top-[20%] left-[20%] w-6 h-6 rounded-full bg-rojo opacity-60"></div>
        <div className="absolute top-[25%] left-[25%] w-3 h-3 rounded-full bg-rojo opacity-60"></div>
        <div className="absolute top-[50%] left-[10%] w-8 h-8 rounded-full bg-blanco opacity-40"></div>
        <div className="absolute top-[60%] right-[20%] w-5 h-5 rounded-full bg-blanco opacity-50"></div>
        <div className="absolute top-[65%] right-[25%] w-3 h-3 rounded-full bg-blanco opacity-50"></div>
        <div className="absolute bottom-[20%] left-[30%] w-7 h-7 rounded-full bg-rojo opacity-60"></div>
      </div>
    </div>
  );
}
