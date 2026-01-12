import React, { useMemo, useState } from "react";
import { INITIAL_TILES } from "./game/data/tiles";
import type { GlobalTile } from "./game/types";
import { GlobalMapScreen } from "./screens/GlobalMapScreen";
import { TileViewScreen } from "./screens/TileViewScreen";
import { CapitalViewScreen } from "./screens/CapitalViewScreen";
import { axialNeighbors, axialEquals } from "./game/logic/hex";

type Screen =
  | { kind: "global" }
  | { kind: "tile"; tileId: string }
  | { kind: "capital" };

export default function App() {
  const [tiles, setTiles] = useState<GlobalTile[]>(INITIAL_TILES);
  const [partyTileId, setPartyTileId] = useState<string>("capital");
  const [screen, setScreen] = useState<Screen>({ kind: "global" });

  const tilesById = useMemo(() => new Map(tiles.map((t) => [t.id, t])), [tiles]);

  function isAdjacentMove(fromId: string, toId: string): boolean {
    const from = tilesById.get(fromId);
    const to = tilesById.get(toId);
    if (!from || !to) return false;
    const neighbors = axialNeighbors(from.axial);
    return neighbors.some((n) => axialEquals(n, to.axial));
  }

  function markDiscovered(tileId: string) {
    setTiles((prev) =>
      prev.map((t) => (t.id === tileId ? { ...t, discovered: true } : t))
    );
  }

  function attemptMoveTo(tileId: string) {
    if (tileId === partyTileId) return;

    if (!isAdjacentMove(partyTileId, tileId)) {
      // v1: ignore non-adjacent clicks
      return;
    }

    setPartyTileId(tileId);
    markDiscovered(tileId);

    // Upon moving onto the tile, switch to a new screen placeholder:
    if (tileId === "capital") {
      setScreen({ kind: "capital" }); // or keep global and require Enter Capital; your call
    } else {
      setScreen({ kind: "tile", tileId });
    }
  }

  function backToGlobal() {
    setScreen({ kind: "global" });
  }

  function enterCapital() {
    if (partyTileId === "capital") {
      setScreen({ kind: "capital" });
    }
  }

  if (screen.kind === "global") {
    return (
      <GlobalMapScreen
        tiles={tiles}
        partyTileId={partyTileId}
        onAttemptMoveTo={attemptMoveTo}
        onEnterCapital={enterCapital}
      />
    );
  }

  if (screen.kind === "capital") {
    return <CapitalViewScreen onBack={backToGlobal} />;
  }

  const tile = tilesById.get(screen.tileId);
  if (!tile) return <div style={{ padding: 16 }}>Missing tile: {screen.tileId}</div>;

  return <TileViewScreen tile={tile} onBack={backToGlobal} />;
}
