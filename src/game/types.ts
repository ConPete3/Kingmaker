/**
 * Axial coordinate system for hex grid positioning.
 * Uses q (column) and r (row) coordinates.
 */
export type Axial = { q: number; r: number };

/**
 * Region types representing the four cardinal progression paths
 * plus the Capital at the center of the kingdom.
 *
 * Each region will eventually contain:
 * - Unique storylines and encounters
 * - Deterministic map layouts
 * - Region-specific characters and factions
 * - Progressive difficulty as players explore further from CALMAFAR
 */
export type Region =
  | 'Capital'
  | 'Greenbelt'      // North path (NW, NE tiles)
  | 'Pitax'          // West path
  | 'Brevoy'         // East path
  | 'Tuskwater Bay'; // South path (SW, SE tiles)

/**
 * Position identifiers for tiles relative to the capital.
 * Used to identify which direction a tile is from the center.
 */
export type TilePosition =
  | 'center'
  | 'north-west'
  | 'north-east'
  | 'west'
  | 'east'
  | 'south-west'
  | 'south-east';

/**
 * Extended tile data structure with regional metadata.
 * This interface supports the regional progression system.
 *
 * Future expansion fields (commented for reference):
 * - encounters?: Encounter[];  // Random or scripted encounters
 * - maps?: MapData[];          // Deterministic tile maps
 * - questline?: Quest[];       // Region-specific story content
 */
export interface TileData {
  /** Unique identifier for the tile */
  id: string;

  /** Display name shown on the map and in headers */
  name: string;

  /** Which region this tile belongs to */
  region: Region;

  /** Position relative to the capital */
  position: TilePosition;

  /** Hex grid coordinates */
  axial: Axial;

  /** Whether this is the capital or wild territory */
  kind: 'capital' | 'wild';

  /** Whether the player has discovered/revealed this tile */
  discovered: boolean;

  // ==============================================
  // FUTURE EXPANSION FIELDS
  // Uncomment when implementing regional content
  // ==============================================
  // encounters?: Encounter[];
  // maps?: MapData[];
  // questline?: Quest[];
}

/**
 * GlobalTile type - alias for TileData for backwards compatibility.
 * The game uses this type throughout the codebase.
 */
export type GlobalTile = TileData;
