/**
 * Tuskwater Bay Region Data
 *
 * Tuskwater Bay is the southern path from CALMAFAR, representing
 * the coastal and maritime territories. This region focuses on
 * naval activities, fishing, trade, and underwater mysteries.
 *
 * Entry Tiles: Tuskwater Bay SW, Tuskwater Bay SE
 *
 * Region Characteristics:
 * - Coastal and maritime territories
 * - Fishing villages and port towns
 * - Naval encounters and sea trade
 * - Pirate threats and smuggler coves
 * - Underwater mysteries and aquatic creatures
 *
 * ==============================================
 * FUTURE CONTENT AREAS
 * ==============================================
 *
 * This file will eventually contain:
 * 1. Naval encounter definitions
 * 2. Fishing and maritime resource systems
 * 3. Port town development mechanics
 * 4. Pirate faction interactions
 * 5. NPC definitions (sailors, merchants, sea creatures)
 * 6. Ship building and naval combat systems
 */

import type { Region } from '../../game/types';

/**
 * Region identifier for Tuskwater Bay.
 */
export const TUSKWATER_REGION: Region = 'Tuskwater Bay';

/**
 * Theme colors for Tuskwater Bay UI elements.
 */
export const TUSKWATER_THEME = {
  primary: '#1e90ff',    // Dodger blue (water)
  secondary: '#00008b',  // Dark blue (deep water)
  accent: '#87ceeb',     // Sky blue (coastal)
  text: '#e8e8e8',       // Light text for contrast
};

/**
 * Tile IDs that belong to the Tuskwater Bay region.
 */
export const TUSKWATER_TILE_IDS = [
  'tuskwater-sw',
  'tuskwater-se',
] as const;

/**
 * Display information for the Tuskwater Bay region.
 */
export const TUSKWATER_INFO = {
  name: 'Tuskwater Bay',
  shortDescription: 'Coastal waters and maritime territories',
  fullDescription: `The southern reaches of your domain open onto Tuskwater Bay, a vast
body of water that connects to trade routes stretching far beyond the Stolen Lands.
The bay is named for the great tusked creatures that are said to dwell in its depths.
Fishing villages dot the coastline, and rumors speak of pirate hideouts hidden in
the rocky coves. Those who master the bay's waters will control valuable trade routes.`,
  dangerLevel: 'Moderate-High',
  primaryResources: ['Fish', 'Pearls', 'Trade Goods', 'Salt'],
  factions: [
    { name: 'Fishermen Guild', disposition: 'Friendly' },
    { name: 'Bay Pirates', disposition: 'Hostile' },
    { name: 'Merchant Mariners', disposition: 'Neutral' },
    // Future: Add more factions as storyline develops
  ],
};

/**
 * Points of interest in Tuskwater Bay.
 * Future: Expand with discoverable locations.
 */
export const TUSKWATER_LOCATIONS = [
  {
    id: 'tatzlford',
    name: 'Tatzlford',
    type: 'settlement',
    description: 'A small fishing village on the western shore.',
    discovered: false,
  },
  {
    id: 'candlemere',
    name: 'Candlemere Island',
    type: 'mystery',
    description: 'A mysterious island where strange lights are seen at night.',
    discovered: false,
  },
  {
    id: 'smugglers-cove',
    name: 'Smuggler\'s Cove',
    type: 'hidden',
    description: 'A hidden inlet used by those who wish to avoid prying eyes.',
    discovered: false,
  },
];

// ==============================================
// PLACEHOLDER: NAVAL ENCOUNTER DEFINITIONS
// ==============================================
// Future: Define sea-based encounters here
// Example structure:
// export interface NavalEncounter {
//   id: string;
//   name: string;
//   type: 'combat' | 'trade' | 'exploration' | 'weather';
//   difficulty: number;
//   shipRequirements?: ShipRequirement[];
//   rewards: Reward[];
// }
// export const TUSKWATER_NAVAL_ENCOUNTERS: NavalEncounter[] = [];

// ==============================================
// PLACEHOLDER: FISHING RESOURCE DEFINITIONS
// ==============================================
// Future: Define fishing mechanics here
// Example structure:
// export interface FishingSpot {
//   id: string;
//   name: string;
//   location: Coordinates;
//   fishTypes: FishType[];
//   seasonalModifiers: SeasonalModifier[];
//   dangerLevel: number;
// }
// export const TUSKWATER_FISHING_SPOTS: FishingSpot[] = [];

// ==============================================
// PLACEHOLDER: SHIP DEFINITIONS
// ==============================================
// Future: Define ship types and naval assets here
// Example structure:
// export interface ShipType {
//   id: string;
//   name: string;
//   class: 'small' | 'medium' | 'large';
//   cargoCapacity: number;
//   speed: number;
//   combatStats: CombatStats;
//   cost: Cost;
// }
// export const TUSKWATER_SHIP_TYPES: ShipType[] = [];

// ==============================================
// PLACEHOLDER: UNDERWATER MYSTERY DEFINITIONS
// ==============================================
// Future: Define underwater exploration content
// Example structure:
// export interface UnderwaterMystery {
//   id: string;
//   name: string;
//   depth: 'shallow' | 'deep' | 'abyss';
//   requirements: Requirement[];
//   discoveries: Discovery[];
// }
// export const TUSKWATER_MYSTERIES: UnderwaterMystery[] = [];
