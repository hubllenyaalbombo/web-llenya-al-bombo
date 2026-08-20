"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/* ─────────────────────────────────────────────
   Web Audio API — Synthetic drum/instrument sounds
   Each sound uses oscillators + envelope.
   TODO: Replace each synth with a real recorded sample (.mp3/.wav)
         by using: const audio = new Audio('/sounds/bombo.mp3'); audio.play();
───────────────────────────────────────────── */

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  // Lazy singleton so we only create one context per session
  if (!(window as Window & { __audioCtx?: AudioContext }).__audioCtx) {
    (window as Window & { __audioCtx?: AudioContext }).__audioCtx = new AudioContext();
  }
  return (window as Window & { __audioCtx?: AudioContext }).__audioCtx!;
}

function resumeContext(ctx: AudioContext) {
  if (ctx.state === "suspended") ctx.resume();
}

// TODO: sustituir por una grabación real del bombo
function playBombo(ctx: AudioContext) {
  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.type = "sine";
  osc.frequency.setValueAtTime(150, now);
  osc.frequency.exponentialRampToValueAtTime(40, now + 0.12);
  gain.gain.setValueAtTime(1, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
  osc.start(now);
  osc.stop(now + 0.35);
}

// TODO: sustituir por una grabación real de la caja
function playCaja(ctx: AudioContext) {
  const now = ctx.currentTime;
  // Noise burst
  const bufferSize = ctx.sampleRate * 0.15;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
  const source = ctx.createBufferSource();
  source.buffer = buffer;
  const gain = ctx.createGain();
  const filter = ctx.createBiquadFilter();
  filter.type = "highpass";
  filter.frequency.value = 1200;
  source.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);
  gain.gain.setValueAtTime(0.8, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
  source.start(now);
}

// TODO: sustituir por una grabación real de los platillos
function playPlatillos(ctx: AudioContext) {
  const now = ctx.currentTime;
  const bufferSize = ctx.sampleRate * 0.5;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
  const source = ctx.createBufferSource();
  source.buffer = buffer;
  const gain = ctx.createGain();
  const filter = ctx.createBiquadFilter();
  filter.type = "highpass";
  filter.frequency.value = 5000;
  source.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);
  gain.gain.setValueAtTime(0.6, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
  source.start(now);
}

// TODO: sustituir por una grabación real de la trompeta
function playTrompeta(ctx: AudioContext) {
  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  const distortion = ctx.createWaveShaper();
  // Simple curve for buzz
  const curve = new Float32Array(256);
  for (let i = 0; i < 256; i++) {
    const x = (i * 2) / 256 - 1;
    curve[i] = (Math.PI + 200) * x / (Math.PI + 200 * Math.abs(x));
  }
  distortion.curve = curve;
  osc.connect(distortion);
  distortion.connect(gain);
  gain.connect(ctx.destination);
  osc.type = "sawtooth";
  osc.frequency.setValueAtTime(466, now); // Bb4
  osc.frequency.setValueAtTime(523, now + 0.08); // C5
  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(0.4, now + 0.02);
  gain.gain.setValueAtTime(0.4, now + 0.18);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
  osc.start(now);
  osc.stop(now + 0.5);
}

// TODO: sustituir por una grabación real de los coros/olé
function playOle(ctx: AudioContext) {
  const now = ctx.currentTime;
  // Chorus-like chord: three oscillators slightly detuned
  [220, 277, 330].forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = "sine";
    osc.frequency.value = freq + i * 2;
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.25, now + 0.04);
    gain.gain.setValueAtTime(0.25, now + 0.3);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.7);
    osc.start(now);
    osc.stop(now + 0.75);
  });
}

/* ─── Pad definitions ─── */
const PADS = [
  {
    id: "bombo",
    label: "Bombo",
    key: "1",
    play: playBombo,
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-8 h-8" aria-hidden="true">
        <circle cx="24" cy="24" r="18" stroke="currentColor" strokeWidth="2.5" />
        <circle cx="24" cy="24" r="10" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
        <line x1="24" y1="6" x2="24" y2="42" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="24" cy="24" r="3" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: "caja",
    label: "Caja",
    key: "2",
    play: playCaja,
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-8 h-8" aria-hidden="true">
        <ellipse cx="24" cy="18" rx="16" ry="6" stroke="currentColor" strokeWidth="2.5" />
        <rect x="8" y="18" width="32" height="12" stroke="currentColor" strokeWidth="2.5" />
        <ellipse cx="24" cy="30" rx="16" ry="6" stroke="currentColor" strokeWidth="2.5" />
        <line x1="16" y1="36" x2="12" y2="44" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <line x1="32" y1="36" x2="36" y2="44" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "platillos",
    label: "Platillos",
    key: "3",
    play: playPlatillos,
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-8 h-8" aria-hidden="true">
        <ellipse cx="24" cy="22" rx="18" ry="5" stroke="currentColor" strokeWidth="2.5" />
        <line x1="24" y1="22" x2="24" y2="44" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <ellipse cx="24" cy="14" rx="10" ry="3" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    id: "trompeta",
    label: "Trompeta",
    key: "4",
    play: playTrompeta,
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-8 h-8" aria-hidden="true">
        <path d="M6 28c0 0 4-8 10-8h16l6 8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <ellipse cx="38" cy="32" rx="4" ry="6" stroke="currentColor" strokeWidth="2.5" />
        <path d="M16 20v-6a4 4 0 0 1 4-4h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <circle cx="20" cy="14" r="2" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="26" cy="14" r="2" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    id: "ole",
    label: "¡Olé!",
    key: "5",
    play: playOle,
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-8 h-8" aria-hidden="true">
        <path d="M12 36c4-8 8-14 12-18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M36 36c-4-8-8-14-12-18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="24" cy="14" r="4" stroke="currentColor" strokeWidth="2.5" />
        <path d="M16 42h16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="14" cy="26" r="2" fill="currentColor" />
        <circle cx="34" cy="26" r="2" fill="currentColor" />
      </svg>
    ),
  },
] as const;

type PadId = typeof PADS[number]["id"];

export default function DrumSampler() {
  const [muted, setMuted] = useState(false);
  const [activeId, setActiveId] = useState<PadId | null>(null);
  const mutedRef = useRef(false);

  // Keep ref in sync for use inside keydown handler
  useEffect(() => { mutedRef.current = muted; }, [muted]);

  const triggerPad = useCallback((pad: typeof PADS[number]) => {
    if (mutedRef.current) return;
    const ctx = getAudioContext();
    if (!ctx) return;
    resumeContext(ctx);
    pad.play(ctx);

    // Flash animation
    setActiveId(pad.id);
    setTimeout(() => setActiveId(null), 150);
  }, []);

  /* ─── Keyboard shortcuts 1-5 ─── */
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      // Don't fire if user is typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      const pad = PADS.find((p) => p.key === e.key);
      if (pad) triggerPad(pad);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [triggerPad]);

  return (
    <div className="relative z-10 w-full max-w-3xl mx-auto px-5 pb-12 pointer-events-auto">
      {/* Header row */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          {/* Blinking indicator */}
          <span className="w-2 h-2 rounded-full bg-rojo animate-pulse" />
          <span className="text-blanco/60 text-xs sm:text-sm font-semibold uppercase tracking-[0.2em]">
            {/* PLACEHOLDER: texto editable del bloque sampler */}
            Toca con nosotros
          </span>
          <span className="hidden sm:inline text-blanco/20 text-xs uppercase tracking-widest ml-1">
            · teclas 1–5
          </span>
        </div>

        {/* Mute toggle */}
        <button
          onClick={() => setMuted((m) => !m)}
          className="flex items-center gap-1.5 text-blanco/40 hover:text-blanco transition-colors duration-300 text-xs uppercase tracking-wider"
          aria-label={muted ? "Activar sonido" : "Silenciar"}
          data-cursor-hover
        >
          {muted ? (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M11 5L6 9H2v6h4l5 4V5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <line x1="23" y1="9" x2="17" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <line x1="17" y1="9" x2="23" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <span>Sin sonido</span>
            </>
          ) : (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M11 5L6 9H2v6h4l5 4V5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <span>Sonido</span>
            </>
          )}
        </button>
      </div>

      {/* Pads grid — 5 cols on sm+, 2-3 cols on mobile */}
      <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 sm:gap-4">
        {PADS.map((pad) => {
          const isActive = activeId === pad.id;
          return (
            <button
              key={pad.id}
              onClick={() => triggerPad(pad)}
              aria-label={`Tocar ${pad.label}`}
              data-cursor-hover
              className={`
                group relative flex flex-col items-center justify-center gap-2.5
                aspect-square rounded-md border transition-all duration-75 select-none
                focus:outline-none focus-visible:ring-2 focus-visible:ring-rojo focus-visible:ring-offset-2 focus-visible:ring-offset-negro
                ${isActive
                  ? "bg-rojo border-rojo scale-[0.93] shadow-[0_0_20px_rgba(225,6,0,0.5)]"
                  : "bg-negro border-rojo/30 hover:border-rojo hover:bg-rojo/5 hover:shadow-[0_0_12px_rgba(225,6,0,0.2)]"
                }
              `}
            >
              {/* Key hint badge */}
              <span
                className={`absolute top-1.5 right-2 text-[9px] font-bold font-mono transition-colors ${
                  isActive ? "text-blanco/60" : "text-blanco/20 group-hover:text-blanco/40"
                }`}
                aria-hidden="true"
              >
                {pad.key}
              </span>

              {/* Icon */}
              <span className={`transition-colors duration-75 ${isActive ? "text-blanco-pure" : "text-blanco/50 group-hover:text-blanco/80"}`}>
                {pad.icon}
              </span>

              {/* Label */}
              <span
                className={`text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-colors duration-75 ${
                  isActive ? "text-blanco-pure" : "text-blanco/50 group-hover:text-blanco/80"
                }`}
              >
                {pad.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
