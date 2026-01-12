export type Axial = { q: number; r: number };

export type GlobalTile = {
  id: string;
  name: string;
  axial: Axial;
  kind: "capital" | "wild";
  discovered: boolean;
};
