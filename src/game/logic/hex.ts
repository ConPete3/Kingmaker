import type { Axial } from "../types";

const NEIGHBOR_DIRS: Axial[] = [
  { q: 1, r: 0 },
  { q: 1, r: -1 },
  { q: 0, r: -1 },
  { q: -1, r: 0 },
  { q: -1, r: 1 },
  { q: 0, r: 1 },
];

export function axialAdd(a: Axial, b: Axial): Axial {
  return { q: a.q + b.q, r: a.r + b.r };
}

export function axialNeighbors(a: Axial): Axial[] {
  return NEIGHBOR_DIRS.map((d) => axialAdd(a, d));
}

export function axialEquals(a: Axial, b: Axial): boolean {
  return a.q === b.q && a.r === b.r;
}

// Pointy-top hex axial -> pixel
export function axialToPixel(axial: Axial, size: number): { x: number; y: number } {
  const x = size * Math.sqrt(3) * (axial.q + axial.r / 2);
  const y = size * (3 / 2) * axial.r;
  return { x, y };
}

export function hexPolygonPoints(center: { x: number; y: number }, size: number): string {
  const pts: string[] = [];
  for (let i = 0; i < 6; i++) {
    // pointy-top: angle starts at 30 degrees
    const angle = (Math.PI / 180) * (60 * i - 30);
    const px = center.x + size * Math.cos(angle);
    const py = center.y + size * Math.sin(angle);
    pts.push(`${px},${py}`);
  }
  return pts.join(" ");
}
