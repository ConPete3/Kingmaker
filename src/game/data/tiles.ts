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
 * For pointy-top hexes, the 6 neighbors are:
 *   Direction  | q change | r change | Region
 *   -----------|----------|----------|---------------
 *   E          |    +1    |    0     | Brevoy
 *   NE         |    +1    |   -1     | Greenbelt NE
 *   NW         |     0    |   -1     | Greenbelt NW
 *   W          |    -1    |    0     | Pitax
 *   SW         |    -1    |   +1     | Tuskwater Bay SW
 *   SE         |     0    |   +1     | Tuskwater Bay SE
 *
 * Regional Framework:
 * ===================
 * The kingdom is surrounded by four distinct regions, each with its own
 * progression path, storylines, and challenges:
 *
 * NORTH - Greenbelt Region (NW, NE tiles)
 *   Entry tiles: Greenbelt NW, Greenbelt NE
 *   Future: Dense forests, woodland creatures, ancient groves
 *
 * WEST - Pitax Region (W tile)
 *   Entry tile: Pitax
 *   Future: Rival kingdom territory, political intrigue
 *
 * EAST - Brevoy Region (E tile)
 *   Entry tile: Brevoy
 *   Future: Eastern borderlands, noble houses, trade routes
 *
 * SOUTH - Tuskwater Bay Region (SW, SE tiles)
 *   Entry tiles: Tuskwater Bay SW, Tuskwater Bay SE
 *   Future: Coastal territories, fishing, sea trade, pirates
 */

import type { GlobalTile } from '../types';

/**
 * Default name for the capital city.
 * Players can rename their capital, but this is the canonical starting name.
 */
export const DEFAULT_CAPITAL_NAME = 'CALMAFAR';

/**
 * The initial set of 7 tiles for the game.
 *
 * Layout visualization (pointy-top hexes):
 *
 *          [Greenbelt     [Greenbelt
 *              NW]           NE]
 *              \            /
 *     [Pitax]   \          /   [Brevoy]
 *                [CALMAFAR]
 *               /          \
 *              /            \
 *        [Tuskwater      [Tuskwater
 *          Bay SW]         Bay SE]
 *
 * All tiles are visible from the start (no fog of war).
 * Movement is restricted to within the same region or to/from the Capital.
 */
export const INITIAL_TILES: GlobalTile[] = [
  // ==============================================
  // CENTER TILE - CALMAFAR (The Capital)
  // ==============================================
  {
    id: 'capital',
    name: DEFAULT_CAPITAL_NAME,
    region: 'Capital',
    position: 'center',
    axial: { q: 0, r: 0 },
    kind: 'capital',
    discovered: true,
  },

  // ==============================================
  // GREENBELT REGION - North Path
  // The Greenbelt is a vast expanse of untamed wilderness
  // stretching north from the capital.
  // ==============================================

  // NORTHWEST - Greenbelt NW (q: 0, r: -1)
  // Entry point to the western Greenbelt forest
  // Future: Ancient groves, druid encounters, forest resources
  {
    id: 'greenbelt-nw',
    name: 'Greenbelt NW',
    region: 'Greenbelt',
    position: 'north-west',
    axial: { q: 0, r: -1 },
    kind: 'wild',
    discovered: true,
  },

  // NORTHEAST - Greenbelt NE (q: +1, r: -1)
  // Entry point to the eastern Greenbelt forest
  // Future: Woodland creatures, hidden ruins, lumber camps
  {
    id: 'greenbelt-ne',
    name: 'Greenbelt NE',
    region: 'Greenbelt',
    position: 'north-east',
    axial: { q: 1, r: -1 },
    kind: 'wild',
    discovered: true,
  },

  // ==============================================
  // PITAX REGION - West Path
  // The rival kingdom of Pitax lies to the west,
  // a land of political intrigue and cultural competition.
  // ==============================================

  // WEST - Pitax (q: -1, r: 0)
  // Border territory with the kingdom of Pitax
  // Future: Diplomatic encounters, rival factions, espionage
  {
    id: 'pitax',
    name: 'Pitax',
    region: 'Pitax',
    position: 'west',
    axial: { q: -1, r: 0 },
    kind: 'wild',
    discovered: true,
  },

  // ==============================================
  // BREVOY REGION - East Path
  // The noble houses of Brevoy control the eastern lands,
  // offering trade opportunities and political alliances.
  // ==============================================

  // EAST - Brevoy (q: +1, r: 0)
  // Border territory with the kingdom of Brevoy
  // Future: Noble house politics, trade caravans, tournaments
  {
    id: 'brevoy',
    name: 'Brevoy',
    region: 'Brevoy',
    position: 'east',
    axial: { q: 1, r: 0 },
    kind: 'wild',
    discovered: true,
  },

  // ==============================================
  // TUSKWATER BAY REGION - South Path
  // The coastal waters of Tuskwater Bay stretch south,
  // offering maritime opportunities and dangers.
  // ==============================================

  // SOUTHWEST - Tuskwater Bay SW (q: -1, r: +1)
  // Western shore of Tuskwater Bay
  // Future: Fishing villages, smuggler coves, sea creatures
  {
    id: 'tuskwater-sw',
    name: 'Tuskwater Bay SW',
    region: 'Tuskwater Bay',
    position: 'south-west',
    axial: { q: -1, r: 1 },
    kind: 'wild',
    discovered: true,
  },

  // SOUTHEAST - Tuskwater Bay SE (q: 0, r: +1)
  // Eastern shore of Tuskwater Bay
  // Future: Port towns, naval encounters, underwater mysteries
  {
    id: 'tuskwater-se',
    name: 'Tuskwater Bay SE',
    region: 'Tuskwater Bay',
    position: 'south-east',
    axial: { q: 0, r: 1 },
    kind: 'wild',
    discovered: true,
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

/**
 * Helper function to get all tiles in a specific region.
 *
 * @param tiles - Array of all tiles
 * @param region - The region to filter by
 * @returns Array of tiles in the specified region
 */
export function getTilesByRegion(tiles: GlobalTile[], region: GlobalTile['region']): GlobalTile[] {
  return tiles.filter(tile => tile.region === region);
}

/**
 * Get the display color theme for a region.
 * This will be used for UI theming based on region.
 *
 * @param region - The region to get theme for
 * @returns Object with primary and secondary colors
 */
export function getRegionTheme(region: GlobalTile['region']): { primary: string; secondary: string; name: string } {
  const themes: Record<GlobalTile['region'], { primary: string; secondary: string; name: string }> = {
    'Capital': { primary: '#ffd700', secondary: '#b8860b', name: 'The Capital' },
    'Greenbelt': { primary: '#228b22', secondary: '#006400', name: 'The Greenbelt' },
    'Pitax': { primary: '#8b4513', secondary: '#654321', name: 'Pitax Territory' },
    'Brevoy': { primary: '#4682b4', secondary: '#2f4f4f', name: 'Brevoy Borderlands' },
    'Tuskwater Bay': { primary: '#1e90ff', secondary: '#00008b', name: 'Tuskwater Bay' },
  };
  return themes[region];
}
