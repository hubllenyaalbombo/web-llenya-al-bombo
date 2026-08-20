"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { STATS } from "@/lib/constants";

function AnimatedCounter({
  target,
  prefix,
  suffix,
  isText,
  textValue,
  inView,
}: {
  target: number;
  prefix: string;
  suffix: string;
  isText?: boolean;
  textValue?: string;
  inView: boolean;
}) {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!inView || hasAnimated.current || isText) return;
    hasAnimated.current = true;

    const duration = 1500;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const interval = duration / steps;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, interval);

    return () => clearInterval(timer);
  }, [inView, target, isText]);

  if (isText) {
    return <span>{textValue}</span>;
  }

  return (
    <span>
      {prefix}
      {count}
      {suffix}
    </span>
  );
}

export default function StatsBar() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section
      className="relative bg-rojo py-10 md:py-14 overflow-hidden"
      aria-label="Datos clave de Llenya al Bombo"
    >
      {/* Subtle diagonal pattern */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,0.1) 10px, rgba(0,0,0,0.1) 11px)",
        }}
      />

      <div ref={ref} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ul className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4" role="list">
          {STATS.map((stat, index) => (
            <li
              key={index}
              className="text-center"
              style={{
                opacity: isInView ? 1 : 0,
                transform: isInView ? "translateY(0)" : "translateY(20px)",
                transition: `all 0.5s ease ${index * 0.15}s`,
              }}
            >
              <span className="block font-heading comic-stroke text-4xl md:text-5xl lg:text-6xl text-blanco-pure leading-none mb-1">
                <AnimatedCounter
                  target={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  isText={"isText" in stat && stat.isText === true}
                  textValue={"isText" in stat && stat.isText ? "Toda España" : undefined}
                  inView={isInView}
                />
              </span>
              <span className="block text-blanco-pure/80 text-sm md:text-base font-medium uppercase tracking-wider">
                {stat.label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
