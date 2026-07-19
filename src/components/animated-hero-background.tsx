"use client";

import { useEffect, useRef } from "react";

export function AnimatedHeroBackground() {
  const shellRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = shellRef.current;
    if (!element) return;

    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!finePointer.matches || reducedMotion.matches) return;

    let frame = 0;
    let targetX = 0;
    let targetY = 0;

    const apply = () => {
      frame = 0;
      element.style.setProperty("--hero-x", `${targetX.toFixed(2)}px`);
      element.style.setProperty("--hero-y", `${targetY.toFixed(2)}px`);
    };

    const onMove = (event: PointerEvent) => {
      const rect = element.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      targetX = Math.max(-8, Math.min(8, x * 16));
      targetY = Math.max(-6, Math.min(6, y * 12));
      if (!frame) frame = window.requestAnimationFrame(apply);
    };

    const onLeave = () => {
      targetX = 0;
      targetY = 0;
      if (!frame) frame = window.requestAnimationFrame(apply);
    };

    element.addEventListener("pointermove", onMove);
    element.addEventListener("pointerleave", onLeave);

    return () => {
      element.removeEventListener("pointermove", onMove);
      element.removeEventListener("pointerleave", onLeave);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={shellRef} className="hero-motion" aria-hidden="true">
      <div className="hero-layer hero-main-image" />
      <div className="hero-layer hero-urban-depth" />
      <div className="hero-layer hero-pcpr-layer">PCPR</div>
      <div className="hero-layer hero-fog hero-fog-a" />
      <div className="hero-layer hero-fog hero-fog-b" />
      <div className="hero-layer hero-lightbar hero-lightbar-cool" />
      <div className="hero-layer hero-lightbar hero-lightbar-clear" />
      <div className="hero-layer hero-light-beam" />
      <div className="hero-layer hero-contrast-field" />
      <div className="hero-layer hero-vignette" />
    </div>
  );
}