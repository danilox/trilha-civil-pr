"use client";

import { useEffect, useRef } from "react";

export function AnimatedHeroBackground() {
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const background = backgroundRef.current;
    const hero = background?.closest<HTMLElement>(".hero-shell");
    if (!background || !hero) return;

    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktop = window.matchMedia("(min-width: 1024px)");
    if (!finePointer.matches || !desktop.matches || reducedMotion.matches) return;

    let frame = 0;
    let targetX = 0;
    let targetY = 0;

    const applyPointer = () => {
      frame = 0;
      background.style.setProperty("--hero-pointer-x", `${targetX.toFixed(2)}px`);
      background.style.setProperty("--hero-pointer-y", `${targetY.toFixed(2)}px`);
    };

    const queuePointerUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(applyPointer);
    };

    const onMove = (event: PointerEvent) => {
      const rect = hero.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      targetX = Math.max(-6, Math.min(6, x * 12));
      targetY = Math.max(-4.5, Math.min(4.5, y * 9));
      queuePointerUpdate();
    };

    const onLeave = () => {
      targetX = 0;
      targetY = 0;
      queuePointerUpdate();
    };

    hero.addEventListener("pointermove", onMove);
    hero.addEventListener("pointerleave", onLeave);

    return () => {
      hero.removeEventListener("pointermove", onMove);
      hero.removeEventListener("pointerleave", onLeave);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={backgroundRef} className="hero-background" aria-hidden="true">
      <div className="hero-background-layer hero-background-base" />
      <div className="hero-background-layer hero-background-city" />
      <div className="hero-background-layer hero-background-pcpr">PCPR</div>
      <div className="hero-background-layer hero-background-officer" />
      <div className="hero-background-layer hero-background-vehicle" />
      <div className="hero-background-layer hero-background-fog hero-background-fog-a" />
      <div className="hero-background-layer hero-background-fog hero-background-fog-b" />
      <div className="hero-background-layer hero-background-light-beam" />
      <div className="hero-background-layer hero-background-beacon hero-background-beacon-cool" />
      <div className="hero-background-layer hero-background-beacon hero-background-beacon-clear" />
      <div className="hero-background-layer hero-background-vignette" />
    </div>
  );
}
