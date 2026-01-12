/**
 * Initial Tile Data for Kingmaker's Global Map
 *
 * This file defines the starting state of all tiles in the game.
 * We use the "axial coordinate system" for hexagonal grids, which is
 * a standard approach that makes hex math much simpler than offset coordinates.
 *
 * Axial Coordinates Explained:
 * - Each hex has two coordinates: q (column) and r (row)
 * - The center hex is at (0, 0)
 * - Moving in different directions changes q and r in specific ways
 *
 * For a 7-hex layout with center + 6 neighbors:
 *
 *       (-1,-1)  (0,-1)
 *            \    /
 *     (-1,0) - CENTER - (1,0)
 *            /    \
 *       (0,1)    (1,1)
 *
 * Wait, let me draw this properly for pointy-top hexes:
 *
 *        NW        NE
 *    (0,-1)    (1,-1)
 *         \    /
 *    W     CENTER     E
 *  (-1,0)   (0,0)   (1,0)
 *         /    \
 *    (0,1)    (1,1)
 *       SW        SE
 *
 * But actually for pointy-top hexes, the 6 neighbors are:
 *   Direction  | q change | r change
 *   -----------|----------|----------
 *   E          |    +1    |    0
 *   NE         |    +1    |   -1
 *   NW         |     0    |   -1
 *   W          |    -1    |    0
 *   SW         |    -1    |   +1
 *   SE         |     0    |   +1
 *
 * Each tile has:
 *   - id: Unique identifier for the tile
 *   - name: Display name shown on the map
 *   - axial: Hex coordinates { q, r }
 *   - kind: "capital" (special home base) or "wild" (explorable territory)
 *   - discovered: Whether the tile has been revealed (starts false for wild tiles)
 */

import type { GlobalTile } from '../types';

/**
 * The initial set of 7 tiles for the game.
 *
 * Layout visualization (pointy-top hexes):
 *
 *          [Northern     [Northeastern
 *           Forest]       Hills]
 *              \           /
 *     [Western  \         /  [Eastern
 *      Plains] - [CAPITAL] -  Mountains]
 *              /         \
 *             /           \
 *        [Southern      [Southeastern
 *         Marsh]          River]
 *
 * The Capital starts as discovered (it's where you begin).
 * All surrounding wild tiles start undiscovered (fog of war).
 */
export const INITIAL_TILES: GlobalTile[] = [
  // ==============================================
  // CENTER TILE - The Capital (player's starting location)
  // ==============================================
  {
    id: 'capital',
    name: 'The Capital',
    axial: { q: 0, r: 0 },
    kind: 'capital',
    discovered: true,  // Always visible - this is where you start!
  },

  // ==============================================
  // SURROUNDING TILES - The Wild Territories
  // These form a ring around the capital
  // ==============================================

  // EAST - Eastern Mountains (q: +1, r: 0)
  // Rugged mountain terrain with potential mineral resources
  {
    id: 'eastern-mountains',
    name: 'Eastern Mountains',
    axial: { q: 1, r: 0 },
    kind: 'wild',
    discovered: false,
  },

  // NORTHEAST - Northeastern Hills (q: +1, r: -1)
  // Rolling hills with scattered ruins from an ancient civilization
  {
    id: 'northeastern-hills',
    name: 'Northeastern Hills',
    axial: { q: 1, r: -1 },
    kind: 'wild',
    discovered: false,
  },

  // NORTHWEST - Northern Forest (q: 0, r: -1)
  // Dense ancient forest, home to various woodland creatures
  {
    id: 'northern-forest',
    name: 'Northern Forest',
    axial: { q: 0, r: -1 },
    kind: 'wild',
    discovered: false,
  },

  // WEST - Western Plains (q: -1, r: 0)
  // Open grasslands perfect for farming and settlement expansion
  {
    id: 'western-plains',
    name: 'Western Plains',
    axial: { q: -1, r: 0 },
    kind: 'wild',
    discovered: false,
  },

  // SOUTHWEST - Southern Marsh (q: -1, r: +1)
  // Treacherous swampland with hidden dangers and rare herbs
  {
    id: 'southern-marsh',
    name: 'Southern Marsh',
    axial: { q: -1, r: 1 },
    kind: 'wild',
    discovered: false,
  },

  // SOUTHEAST - Southeastern River (q: 0, r: +1)
  // Fertile river valley with fishing opportunities and trade routes
  {
    id: 'southeastern-river',
    name: 'Southeastern River',
    axial: { q: 0, r: 1 },
    kind: 'wild',
    discovered: false,
  },
];

/**
 * Helper function to find a tile by its ID.
 * Returns undefined if the tile doesn't exist.
 *
 * @param tiles - Array of all tiles
 * @param id - The tile ID to search for
 * @returns The matching tile or undefined
 */
export function findTileById(tiles: GlobalTile[], id: string): GlobalTile | undefined {
  return tiles.find(tile => tile.id === id);
}

/**
 * Helper function to get the capital tile.
 * The capital always has kind: 'capital'.
 *
 * @param tiles - Array of all tiles
 * @returns The capital tile (throws if not found, which should never happen)
 */
export function getCapitalTile(tiles: GlobalTile[]): GlobalTile {
  const capital = tiles.find(tile => tile.kind === 'capital');
  if (!capital) {
    throw new Error('No capital tile found! This should never happen.');
  }
  return capital;
}
