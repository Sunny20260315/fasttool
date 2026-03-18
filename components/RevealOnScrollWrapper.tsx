"use client";

import { ReactNode } from "react";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

type Props = {
  children: ReactNode;
  delayMs?: number;
};

export default function RevealOnScrollWrapper({ children, delayMs }: Props) {
  return (
    <RevealOnScroll delayMs={delayMs}>
      {children}
    </RevealOnScroll>
  );
}
