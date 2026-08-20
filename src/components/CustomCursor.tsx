"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useMotionValue } from "framer-motion";

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  // Use useMotionValue instead of useSpring for instant, zero-delay tracking
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const hoverRef = useRef(false);

  const handleMouseEnterInteractive = useCallback(() => {
    hoverRef.current = true;
    setIsHovering(true);
  }, []);

  const handleMouseLeaveInteractive = useCallback(() => {
    hoverRef.current = false;
    setIsHovering(false);
  }, []);

  useEffect(() => {
    const isTouch =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia("(pointer: coarse)").matches;

    setIsTouchDevice(isTouch);
    if (isTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setIsVisible(true);
    };

    const handleMouseLeaveWindow = () => setIsVisible(false);
    const handleMouseEnterWindow = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", handleMouseLeaveWindow);
    document.documentElement.addEventListener("mouseenter", handleMouseEnterWindow);

    const attachListeners = () => {
      const interactives = document.querySelectorAll(
        'a, button, [data-cursor-hover], input[type="submit"], [role="button"]'
      );
      interactives.forEach((el) => {
        el.addEventListener("mouseenter", handleMouseEnterInteractive);
        el.addEventListener("mouseleave", handleMouseLeaveInteractive);
      });
      return interactives;
    };

    let interactives = attachListeners();

    const observer = new MutationObserver(() => {
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnterInteractive);
        el.removeEventListener("mouseleave", handleMouseLeaveInteractive);
      });
      interactives = attachListeners();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeaveWindow);
      document.documentElement.removeEventListener("mouseenter", handleMouseEnterWindow);
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnterInteractive);
        el.removeEventListener("mouseleave", handleMouseLeaveInteractive);
      });
      observer.disconnect();
    };
  }, [cursorX, cursorY, handleMouseEnterInteractive, handleMouseLeaveInteractive]);

  if (isTouchDevice) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 z-[9999] pointer-events-none rounded-full mix-blend-difference bg-white"
      style={{
        x: cursorX,
        y: cursorY,
        translateX: "-50%",
        translateY: "-50%",
      }}
      animate={{
        width: isHovering ? 64 : 16,
        height: isHovering ? 64 : 16,
        opacity: isVisible ? 1 : 0,
      }}
      transition={{
        width: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
        height: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
        opacity: { duration: 0.15 },
      }}
    />
  );
}
