"use client";
import { useEffect } from "react";

export function usePhysicalGutter(
  deviceGutterPx = 160,  // ← 2nd screenshot jaisa exact gap
  minCss = 12,
  maxCss = 160,
  pageWidthPx = 1600
){
  useEffect(() => {
    const apply = () => {
      const dpr = Math.max(1, window.devicePixelRatio || 1);
      let css = Math.round(deviceGutterPx / dpr);
      css = Math.min(maxCss, Math.max(minCss, css));
      const root = document.documentElement;
      root.style.setProperty("--page-width", `${pageWidthPx}px`);
      root.style.setProperty("--page-gutter", `${css}px`);
      root.style.setProperty("--page-max", `min(var(--page-width), calc(100vw - 2*var(--page-gutter)))`);
    };
    apply();
    window.addEventListener("resize", apply);
    return () => window.removeEventListener("resize", apply);
  }, [deviceGutterPx, minCss, maxCss, pageWidthPx]);
}
