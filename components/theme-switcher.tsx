"use client";

import { Check } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { THEMES, THEME_ORDER } from "@/lib/themes";

export function ThemeSwitcher({ className = "" }: { className?: string }) {
  const { theme, setTheme } = useTheme();

  return (
    <div
      role="radiogroup"
      aria-label="Site colour palette"
      className={`flex items-center gap-2 ${className}`}
    >
      {THEME_ORDER.map((name) => {
        const def = THEMES[name];
        const active = theme === name;
        return (
          <button
            key={name}
            type="button"
            role="radio"
            aria-checked={active}
            aria-label={`${def.label} palette`}
            title={def.label}
            onClick={() => setTheme(name)}
            className="grid h-7 w-7 place-items-center rounded-full border-2 border-ink transition-transform duration-150 hover:scale-110"
            style={{ backgroundColor: def.swatch }}
          >
            {active ? (
              <Check
                size={14}
                strokeWidth={3.5}
                className="text-panel mix-blend-difference"
                aria-hidden
              />
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
