export type ObjectLayoutPoint = {
  left: string;
  top: string;
};

/** Percent positions within the play safe area (objects centered on each point). */
const LAYOUTS: Record<number, ObjectLayoutPoint[]> = {
  1: [{ left: "50%", top: "50%" }],
  2: [
    { left: "34%", top: "38%" },
    { left: "66%", top: "62%" },
  ],
  3: [
    { left: "50%", top: "28%" },
    { left: "30%", top: "68%" },
    { left: "70%", top: "68%" },
  ],
  4: [
    { left: "28%", top: "32%" },
    { left: "72%", top: "34%" },
    { left: "34%", top: "72%" },
    { left: "70%", top: "70%" },
  ],
  5: [
    { left: "50%", top: "22%" },
    { left: "24%", top: "46%" },
    { left: "76%", top: "44%" },
    { left: "32%", top: "74%" },
    { left: "68%", top: "76%" },
  ],
  6: [
    { left: "20%", top: "26%" },
    { left: "48%", top: "18%" },
    { left: "76%", top: "28%" },
    { left: "26%", top: "58%" },
    { left: "52%", top: "66%" },
    { left: "74%", top: "56%" },
  ],
  7: [
    { left: "19%", top: "15%" },
    { left: "50%", top: "11%" },
    { left: "81%", top: "17%" },
    { left: "22%", top: "48%" },
    { left: "78%", top: "46%" },
    { left: "35%", top: "76%" },
    { left: "65%", top: "74%" },
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

export function getObjectLayout(count: number): ObjectLayoutPoint[] {
  const layout = LAYOUTS[count];
  if (!layout) {
    throw new Error(`No object layout for count ${count}`);
  }
  return layout;
}
