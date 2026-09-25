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
  8: [
    { left: "17%", top: "16%" },
    { left: "39%", top: "20%" },
    { left: "61%", top: "16%" },
    { left: "83%", top: "20%" },
    { left: "19%", top: "74%" },
    { left: "41%", top: "78%" },
    { left: "63%", top: "74%" },
    { left: "85%", top: "78%" },
  ],
  9: [
    { left: "19%", top: "17%" },
    { left: "51%", top: "13%" },
    { left: "81%", top: "21%" },
    { left: "17%", top: "44%" },
    { left: "48%", top: "51%" },
    { left: "83%", top: "47%" },
    { left: "27%", top: "73%" },
    { left: "56%", top: "79%" },
    { left: "77%", top: "71%" },
  ],
  10: [
    { left: "15%", top: "14%" },
    { left: "38%", top: "18%" },
    { left: "62%", top: "14%" },
    { left: "85%", top: "18%" },
    { left: "20%", top: "46%" },
    { left: "50%", top: "50%" },
    { left: "80%", top: "46%" },
    { left: "24%", top: "76%" },
    { left: "50%", top: "80%" },
    { left: "76%", top: "76%" },
  ],
};

export function getPoolObjectLayout(count: number): ObjectLayoutPoint[] {
  const layout = POOL_LAYOUTS[count];
  if (!layout) {
    throw new Error(`No pool layout for ${count} objects`);
  }
  return layout;
}
