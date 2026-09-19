import type { ObjectLayoutPoint } from "@/lib/counting/object-layouts";

/** Two objects in a simple horizontal row. */
export const COUNT_CHOOSE_ROW_2: ObjectLayoutPoint[] = [
  { left: "32%", top: "48%" },
  { left: "68%", top: "48%" },
];

/** Three objects in a simple horizontal row. */
export const COUNT_CHOOSE_ROW_3: ObjectLayoutPoint[] = [
  { left: "26%", top: "50%" },
  { left: "50%", top: "50%" },
  { left: "74%", top: "50%" },
];

/** Four stars — loose scatter, not a perfect row. */
export const COUNT_CHOOSE_SCATTER_4: ObjectLayoutPoint[] = [
  { left: "28%", top: "32%" },
  { left: "72%", top: "34%" },
  { left: "34%", top: "72%" },
  { left: "70%", top: "70%" },
];

/** Five balloons — corners + center, full playmat width for separate taps. */
export const COUNT_CHOOSE_SCATTER_5_BALLOONS: ObjectLayoutPoint[] = [
  { left: "16%", top: "18%" },
  { left: "84%", top: "20%" },
  { left: "50%", top: "42%" },
  { left: "18%", top: "76%" },
  { left: "82%", top: "74%" },
];

/** Five flowers — wide scatter across the playmat. */
export const COUNT_CHOOSE_CLUSTER_5_FLOWERS: ObjectLayoutPoint[] = [
  { left: "14%", top: "16%" },
  { left: "86%", top: "18%" },
  { left: "50%", top: "42%" },
  { left: "16%", top: "78%" },
  { left: "84%", top: "76%" },
];

/** Six butterflies — spaced for individual taps. */
export const COUNT_CHOOSE_SCATTER_6: ObjectLayoutPoint[] = [
  { left: "20%", top: "26%" },
  { left: "48%", top: "18%" },
  { left: "76%", top: "28%" },
  { left: "26%", top: "58%" },
  { left: "52%", top: "66%" },
  { left: "74%", top: "56%" },
];

/** Seven strawberries — spread for clear, separate tap targets (3 / 2 / 2 bands). */
export const COUNT_CHOOSE_CLUSTER_7: ObjectLayoutPoint[] = [
  { left: "19%", top: "15%" },
  { left: "50%", top: "11%" },
  { left: "81%", top: "17%" },
  { left: "22%", top: "48%" },
  { left: "78%", top: "46%" },
  { left: "35%", top: "76%" },
  { left: "65%", top: "74%" },
];

/** Eight fish — two wide rows, spaced for separate tap targets. */
export const COUNT_CHOOSE_SCATTER_8: ObjectLayoutPoint[] = [
  { left: "17%", top: "16%" },
  { left: "39%", top: "20%" },
  { left: "61%", top: "16%" },
  { left: "83%", top: "20%" },
  { left: "19%", top: "74%" },
  { left: "41%", top: "78%" },
  { left: "63%", top: "74%" },
  { left: "85%", top: "78%" },
];

/** Nine cars — 3×3 grid with tap spacing across the full playmat. */
export const COUNT_CHOOSE_SCATTER_9: ObjectLayoutPoint[] = [
  { left: "12%", top: "14%" },
  { left: "50%", top: "12%" },
  { left: "88%", top: "15%" },
  { left: "13%", top: "48%" },
  { left: "50%", top: "50%" },
  { left: "87%", top: "47%" },
  { left: "12%", top: "82%" },
  { left: "50%", top: "84%" },
  { left: "88%", top: "80%" },
];

/** Ten cakes (cupcakes) — three bands (4 / 3 / 3) with clear tap spacing. */
export const COUNT_CHOOSE_SCATTER_10: ObjectLayoutPoint[] = [
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
];
