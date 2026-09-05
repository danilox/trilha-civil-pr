"use client";

import Image from "next/image";
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

    let frame = 0;
    let targetX = 0;
    let targetY = 0;
    let heroVisible = true;

    const applyPointer = () => {
      frame = 0;
      background.style.setProperty("--hero-pointer-x", `${targetX.toFixed(2)}px`);
      background.style.setProperty("--hero-pointer-y", `${targetY.toFixed(2)}px`);
    };

    const queuePointerUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(applyPointer);
    };

    const onMove = (event: PointerEvent) => {
      if (background.dataset.active !== "true") return;
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

    const updateActivity = () => {
      const active = heroVisible && document.visibilityState === "visible";
      background.dataset.active = String(active);
      if (!active) onLeave();
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        heroVisible = entry.isIntersecting;
        updateActivity();
      },
      { rootMargin: "120px 0px", threshold: 0.01 },
    );

    observer.observe(hero);
    document.addEventListener("visibilitychange", updateActivity);
    updateActivity();

    const pointerEnabled = finePointer.matches && desktop.matches && !reducedMotion.matches;
    if (pointerEnabled) {
      hero.addEventListener("pointermove", onMove);
      hero.addEventListener("pointerleave", onLeave);
    }

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", updateActivity);
      if (pointerEnabled) {
        hero.removeEventListener("pointermove", onMove);
        hero.removeEventListener("pointerleave", onLeave);
      }
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={backgroundRef} className="hero-background" data-active="true" aria-hidden="true">
      <div className="hero-background-layer hero-background-base">
        <Image
          src="/images/hero-pcpr-motion-v2.webp"
          alt=""
          fill
          sizes="(min-width: 1200px) 65vw, 100vw"
          quality={75}
          preload
          className="hero-background-image"
        />
      </div>
      <div className="hero-background-layer hero-background-pcpr">PCPR</div>
      <div className="hero-background-layer hero-background-fog hero-background-fog-a" />
      <div className="hero-background-layer hero-background-light-beam" />
      <div className="hero-background-layer hero-background-beacon-ambient" />
      <div className="hero-background-layer hero-background-beacon-rotor hero-background-beacon-rotor-blue" />
      <div className="hero-background-layer hero-background-beacon-rotor hero-background-beacon-rotor-red" />
      <div className="hero-background-layer hero-background-rain hero-background-rain-far" />
      <div className="hero-background-layer hero-background-rain hero-background-rain-near" />
      <svg className="hero-background-layer hero-background-parana-map" viewBox="0 0 320 240" focusable="false">
        <defs>
          <path id="parana-geographic-outline" d="M162.3 202.5 L164.7 205.2 L164.1 207.3 L161.7 208.9 L157 209.4 L156.1 211.7 L152 205.8 L146.5 206.1 L145 205 L135.9 206.6 L130 205.1 L126.8 203.3 L126 201.4 L122.3 199.8 L120.4 200.8 L112.9 198.9 L110.3 199.7 L107.5 197.8 L104.1 198.5 L100.8 195.8 L98.2 195.3 L87.2 195.5 L82.7 197.5 L75.2 193 L74.3 191.1 L70.3 190.9 L66.6 193.3 L62.7 193.2 L61.1 191.6 L58.8 191.4 L58.3 188.9 L54.4 185.5 L54.7 182.3 L50.2 179.2 L50.9 176 L49.6 175.3 L50.8 174.8 L49.6 173.4 L50.8 171.4 L49.3 170.2 L50.3 169.5 L48.9 169.2 L48.3 167.6 L50 166.8 L47.9 165.6 L47.8 163.9 L45.3 163.4 L45 165 L42.6 161.5 L40.8 162.3 L39.7 161.1 L38.6 163.7 L37.7 161.5 L38.5 158.3 L35.9 160.4 L34.1 160.4 L35.4 162.3 L33 161.3 L32 162.8 L30.5 160.9 L27.8 163.2 L26.2 162.8 L24.2 167.2 L21.6 163.7 L20.1 164.2 L18.9 162.4 L17.2 162.6 L16 156.5 L24.4 144 L22.8 139.2 L26 127 L28.6 123.2 L28.8 113.4 L31.8 109 L31 105.8 L28.6 103.1 L28.2 98.4 L38.6 91 L39.6 83.5 L43.7 69.7 L52.9 65.8 L54.4 64.1 L58.9 54.9 L59 49.4 L60.2 47.3 L71 39.8 L78.3 37.4 L82.1 32.9 L82.9 34.5 L87.4 30.9 L90 30.4 L92.9 32.3 L99.8 33.2 L104.9 30.5 L108.4 33.5 L111.3 32.2 L116.7 33.5 L119.5 32.6 L120.7 35.2 L123.6 33.9 L123.9 29.7 L125.6 28.3 L133 30.5 L136.1 33.3 L141.9 33 L142.7 35 L146.6 34.5 L149.6 36.2 L154.6 34.3 L162.5 34.9 L167.5 38.7 L178.9 40.5 L183.1 44.8 L182.6 47 L185.6 47.8 L188.8 44.8 L191.1 46.1 L194.1 45.6 L195.6 47 L198.9 47.1 L199.4 45.7 L201.2 45.3 L203 47.2 L205.8 46.4 L207.3 47.4 L214.8 46.2 L215.6 45.1 L217.9 46.3 L218.3 44.9 L219.1 47.9 L222.1 49.5 L221.6 51.6 L229.1 53.7 L229.5 55.6 L231.8 56.6 L234 61.8 L233.6 64.8 L235.6 66.1 L234.3 66.8 L236.6 68 L233.9 71.8 L235.2 72.8 L234.4 77.3 L237.4 80.1 L236.3 82.4 L236.9 85 L234.7 86.6 L237.1 89.7 L239 89.8 L238.8 91.8 L242.6 96.9 L246.7 99.1 L245.8 102.4 L249 106.5 L252.6 108 L250.3 110.8 L250.6 113.6 L248.4 115 L249.1 116.5 L247.6 117.3 L248 122.5 L252 123.7 L253.5 122.4 L258.6 123 L259.6 120.9 L261.2 120.7 L261 121.9 L263.2 123 L268.9 121.6 L271 123.5 L274.9 123.4 L275.4 122.4 L276.2 123.9 L279.6 122.4 L281.9 125.3 L283.2 125.3 L280.8 128.3 L280.3 130.8 L281.3 131.5 L280.1 132.2 L280.3 135.5 L278.8 137.2 L280.8 140.5 L282 141.1 L284.3 137.3 L287.1 135.9 L290.9 138.3 L290.6 139.8 L294.1 135.7 L295.9 137.9 L296.1 141.1 L298.2 143.1 L296.7 145.3 L300 147.7 L302.5 146.3 L304 146.7 L298 153.1 L295.7 157.4 L291.5 158.3 L293 159.2 L292 161.5 L286.2 164.8 L281.7 174 L280.4 174.1 L278.4 179.7 L276.9 178.5 L275.3 179.7 L263.1 179.6 L259 181.3 L253.7 180.4 L245.2 187.2 L241.3 187.5 L239.7 190.1 L237.9 189.7 L237.1 190.8 L233.7 188.7 L233.3 189.6 L231.2 188.7 L231.8 188.1 L230.3 187.1 L229.6 187.9 L227.8 185 L227.4 185.6 L224.6 183.8 L225.1 182.7 L220.6 181.8 L220.3 180.8 L219 182.9 L218.7 181 L217.2 181 L217.5 182.4 L216.1 181.6 L214.4 182.4 L214.1 181.5 L212.5 183.2 L210.3 181.5 L211 182.2 L209.8 183.9 L206.7 181.7 L203.2 184 L203.6 186.3 L198.3 181.9 L193.8 182.1 L192.8 180.5 L191.9 182.2 L193.6 182.9 L190.2 183.2 L189.4 186.1 L185.8 189.4 L186.4 191.1 L183.6 190.2 L181.1 192.3 L179.8 190.9 L178.4 193 L177 190.6 L176.4 192.7 L174.1 190.5 L170.6 190.3 L169.5 192.5 L165 193.3 L160.9 198.6 L163 200.6 L162.3 202.5 Z" />
        </defs>
        <use href="#parana-geographic-outline" className="hero-parana-fill" />
        <use href="#parana-geographic-outline" className="hero-parana-outline" />
        <use href="#parana-geographic-outline" className="hero-parana-accent" />
      </svg>
      <div className="hero-background-layer hero-background-city" />
      <div className="hero-background-layer hero-background-vignette" />
    </div>
  );
}
