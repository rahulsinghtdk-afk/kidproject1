export function pointInExpandedRect(
  clientX: number,
  clientY: number,
  rect: DOMRect,
  paddingPx = 0
): boolean {
  return (
    clientX >= rect.left - paddingPx &&
    clientX <= rect.right + paddingPx &&
    clientY >= rect.top - paddingPx &&
    clientY <= rect.bottom + paddingPx
  );
}
