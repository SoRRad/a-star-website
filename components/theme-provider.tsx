"use client";

import type { ReactNode } from "react";

// Site is dark-only — no theme switching needed.
export function ThemeProvider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
