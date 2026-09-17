import type { ObjectLayoutPoint } from "@/lib/counting/object-layouts";

/** Scattered positions for object pools (more objects than a single row). */
const POOL_LAYOUTS: Record<number, ObjectLayoutPoint[]> = {
  3: [
    { left: "28%", top: "32%" },
    { left: "50%", top: "58%" },
    { left: "72%", top: "36%" },
  ],
  5: [
    { left: "22%", top: "28%" },
    { left: "50%", top: "22%" },
    { left: "78%", top: "30%" },
    { left: "32%", top: "62%" },
    { left: "68%", top: "68%" },
  ],
  6: [
    { left: "20%", top: "26%" },
    { left: "48%", top: "18%" },
    { left: "76%", top: "28%" },
    { left: "26%", top: "58%" },
    { left: "52%", top: "66%" },
    { left: "74%", top: "56%" },
  ],
};

export function getPoolObjectLayout(count: number): ObjectLayoutPoint[] {
  const layout = POOL_LAYOUTS[count];
  if (!layout) {
    throw new Error(`No pool layout for ${count} objects`);
  }
  return layout;
}
