/** Formats an INR amount as "₹4,999" using Indian digit grouping. */
export function formatINR(amount: number): string {
  return `₹${amount.toLocaleString("en-IN")}`;
}

/** "₹399–499" when a range exists, otherwise "₹399". */
export function formatINRRange(
  min: number,
  max?: number,
  withRupeeOnMax = false,
): string {
  if (max === undefined || max === min) return formatINR(min);
  return `${formatINR(min)}–${withRupeeOnMax ? "₹" : ""}${max.toLocaleString(
    "en-IN",
  )}`;
}
