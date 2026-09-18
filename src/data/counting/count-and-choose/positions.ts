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

/** Five balloons — mixed vertical / horizontal scatter. */
export const COUNT_CHOOSE_SCATTER_5_BALLOONS: ObjectLayoutPoint[] = [
  { left: "50%", top: "22%" },
  { left: "24%", top: "46%" },
  { left: "76%", top: "44%" },
  { left: "32%", top: "74%" },
  { left: "68%", top: "76%" },
];

/** Five flowers — asymmetric loose cluster. */
export const COUNT_CHOOSE_CLUSTER_5_FLOWERS: ObjectLayoutPoint[] = [
  { left: "38%", top: "35%" },
  { left: "62%", top: "42%" },
  { left: "28%", top: "55%" },
  { left: "55%", top: "68%" },
  { left: "72%", top: "52%" },
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

/** Nine cars — wide scatter with room to tap each object (no overlapping targets). */
export const COUNT_CHOOSE_SCATTER_9: ObjectLayoutPoint[] = [
  { left: "19%", top: "17%" },
  { left: "51%", top: "13%" },
  { left: "81%", top: "21%" },
  { left: "17%", top: "44%" },
  { left: "48%", top: "51%" },
  { left: "83%", top: "47%" },
  { left: "27%", top: "73%" },
  { left: "56%", top: "79%" },
  { left: "77%", top: "71%" },
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
