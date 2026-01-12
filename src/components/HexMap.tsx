import React from "react";
import type { GlobalTile } from "../game/types";
import { axialToPixel, hexPolygonPoints } from "../game/logic/hex";

type Props = {
  tiles: GlobalTile[];
  partyTileId: string;
  onTileClick: (tileId: string) => void;
};

export function HexMap({ tiles, partyTileId, onTileClick }: Props) {
  const size = 52;            // hex radius
  const padding = 24;

  // Convert to pixel centers and compute bounds for viewBox
  const centers = tiles.map((t) => {
    const p = axialToPixel(t.axial, size);
    return { ...t, cx: p.x, cy: p.y };
  });

  const minX = Math.min(...centers.map((c) => c.cx)) - size - padding;
  const maxX = Math.max(...centers.map((c) => c.cx)) + size + padding;
  const minY = Math.min(...centers.map((c) => c.cy)) - size - padding;
  const maxY = Math.max(...centers.map((c) => c.cy)) + size + padding;

  const width = maxX - minX;
  const height = maxY - minY;

  const party = centers.find((c) => c.id === partyTileId);

  return (
    <svg
      width="100%"
      height="420"
      viewBox={`${minX} ${minY} ${width} ${height}`}
      role="img"
      aria-label="Global hex map"
      style={{ display: "block", background: "#f7f7f7", borderRadius: 12 }}
    >
      {centers.map((t) => {
        const isCapital = t.kind === "capital";
        const fill = t.discovered ? (isCapital ? "#ffffff" : "#eaeaea") : "#bdbdbd";

        return (
          <g key={t.id} onClick={() => onTileClick(t.id)} style={{ cursor: "pointer" }}>
            <polygon
              points={hexPolygonPoints({ x: t.cx, y: t.cy }, size)}
              fill={fill}
              stroke="#000"
              strokeWidth={1}  // thin black line
            />
            {/* label */}
            {t.discovered ? (
              <text
                x={t.cx}
                y={t.cy}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="12"
              >
                {t.name}
              </text>
            ) : (
              <text
                x={t.cx}
                y={t.cy}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="12"
              >
                ???
              </text>
            )}
          </g>
        );
      })}

      {/* Party token */}
      {party ? (
        <g>
          <circle cx={party.cx} cy={party.cy} r={12} fill="#2b6cb0" stroke="#000" strokeWidth={1} />
          <text
            x={party.cx}
            y={party.cy}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="10"
            fill="#fff"
          >
            Party
          </text>
        </g>
      ) : null}
    </svg>
  );
}
