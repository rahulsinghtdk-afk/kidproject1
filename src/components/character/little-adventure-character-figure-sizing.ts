/** Sizing applied to the figure (SVG or production image), not the motion shell. */
const FIGURE_SIZE_CLASS = {
  home: "h-[min(28vw,9rem)] w-auto drop-shadow-[var(--adventure-shadow-md)] sm:h-[10rem] landscape:h-[8.5rem]",
  play: "h-[min(22vw,7.5rem)] w-auto drop-shadow-[var(--adventure-shadow-md)] sm:h-[8rem] landscape:h-[7rem]",
} as const;

export { FIGURE_SIZE_CLASS };
