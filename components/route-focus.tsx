"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function RouteFocus() {
  const pathname = usePathname();
  useEffect(() => {
    const main = document.getElementById("main");
    if (main) {
      main.setAttribute("tabindex", "-1");
      main.focus({ preventScroll: true });
    }
  }, [pathname]);
  return null;
}
