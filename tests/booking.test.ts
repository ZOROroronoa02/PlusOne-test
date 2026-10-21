import { describe, expect, it } from "vitest";
import {
  EMPTY_DRAFT,
  estimateTotal,
  formatBookingDate,
  isPromoValid,
} from "../lib/booking";
import { COMPANIONS } from "../content/companions";

describe("booking", () => {
  it("validates promo code", () => {
    expect(isPromoValid("FIRST100")).toBe(true);
    expect(isPromoValid("nope")).toBe(false);
  });

  it("estimates virtual total", () => {
    const draft = { ...EMPTY_DRAFT, format: "virtual" as const, virtualMode: "Voice" as const, hours: 2, promo: "FIRST100" };
    const result = estimateTotal(draft, undefined);
    expect(result.perHour).toBe(199);
    expect(result.total).toBe(199 * 2 - 100);
  });

  it("enforces in-person minimum", () => {
    const companion = COMPANIONS[0];
    const draft = { ...EMPTY_DRAFT, format: "in-person" as const, hours: 1, companionId: companion.id };
    const result = estimateTotal(draft, companion);
    expect(result.total).toBe(companion.ratePerHour * 2);
  });

  it("formats booking date", () => {
    expect(formatBookingDate("2026-10-21")).toContain("2026");
  });
});
