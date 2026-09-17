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
};

export function getObjectLayout(count: number): ObjectLayoutPoint[] {
  const layout = LAYOUTS[count];
  if (!layout) {
    throw new Error(`No object layout for count ${count}`);
  }
  return layout;
}
