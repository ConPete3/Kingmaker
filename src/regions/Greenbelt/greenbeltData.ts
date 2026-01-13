/**
 * Greenbelt Region Data
 *
 * The Greenbelt is the northern path from CALMAFAR, representing
 * a vast expanse of untamed wilderness. This region is the traditional
 * starting area for expansion in the Kingmaker campaign.
 *
 * Entry Tiles: Greenbelt NW, Greenbelt NE
 *
 * Region Characteristics:
 * - Dense ancient forests
 * - Woodland creatures (both friendly and hostile)
 * - Druidic circles and nature spirits
 * - Abandoned settlements from previous colonization attempts
 * - Rich in lumber and hunting resources
 *
 * ==============================================
 * FUTURE CONTENT AREAS
 * ==============================================
 *
 * This file will eventually contain:
 * 1. Encounter tables for random events
 * 2. Deterministic map layouts for specific locations
 * 3. Quest definitions for the Greenbelt storyline
 * 4. NPC definitions (druids, bandits, settlers)
 * 5. Resource node definitions
 * 6. Building placement opportunities
 */

import type { Region } from '../../game/types';

/**
 * Region identifier for the Greenbelt.
 */
export const GREENBELT_REGION: Region = 'Greenbelt';

/**
 * Theme colors for Greenbelt UI elements.
 */
export const GREENBELT_THEME = {
  primary: '#228b22',    // Forest green
  secondary: '#006400',  // Dark green
  accent: '#90ee90',     // Light green
  text: '#e8e8e8',       // Light text for contrast
};

/**
 * Tile IDs that belong to the Greenbelt region.
 */
export const GREENBELT_TILE_IDS = [
  'greenbelt-nw',
  'greenbelt-ne',
] as const;

/**
 * Display information for the Greenbelt region.
 */
export const GREENBELT_INFO = {
  name: 'The Greenbelt',
  shortDescription: 'Dense forests and untamed wilderness',
  fullDescription: `The Greenbelt stretches north from your capital, a vast expanse of
ancient forest that has resisted civilization for centuries. Tales speak of druid
circles hidden deep within the woods, and of creatures both wondrous and terrible
that call these forests home. Previous attempts to settle these lands have failed,
leaving behind crumbling ruins and cautionary tales.`,
  dangerLevel: 'Moderate',
  primaryResources: ['Lumber', 'Herbs', 'Game'],
  factions: [
    { name: 'Forest Druids', disposition: 'Neutral' },
    { name: 'Stag Lord Bandits', disposition: 'Hostile' },
    // Future: Add more factions as storyline develops
  ],
};

// ==============================================
// PLACEHOLDER: ENCOUNTER DEFINITIONS
// ==============================================
// Future: Define encounter tables here
// Example structure:
// export interface GreenbeltEncounter {
//   id: string;
//   name: string;
//   type: 'combat' | 'exploration' | 'social';
//   difficulty: number;
//   rewards: Reward[];
// }
// export const GREENBELT_ENCOUNTERS: GreenbeltEncounter[] = [];

// ==============================================
// PLACEHOLDER: MAP DEFINITIONS
// ==============================================
// Future: Define deterministic map layouts here
// Example structure:
// export interface GreenbeltLocation {
//   id: string;
//   name: string;
//   gridSize: { width: number; height: number };
//   terrain: TileType[][];
//   pointsOfInterest: PointOfInterest[];
// }
// export const GREENBELT_LOCATIONS: GreenbeltLocation[] = [];

// ==============================================
// PLACEHOLDER: QUEST DEFINITIONS
// ==============================================
// Future: Define Greenbelt-specific quests here
// Example structure:
// export interface GreenbeltQuest {
//   id: string;
//   name: string;
//   description: string;
//   objectives: Objective[];
//   rewards: Reward[];
//   prerequisites?: string[];
// }
// export const GREENBELT_QUESTS: GreenbeltQuest[] = [];
