"use client";
import { usePhysicalGutter } from "@/hooks/usePhysicalGutter";

export default function GutterBoot() {
  usePhysicalGutter(100, 12, 160, 1600); // tune here if needed globally
  return null;
}










