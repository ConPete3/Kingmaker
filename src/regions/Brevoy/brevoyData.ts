/**
 * Brevoy Region Data
 *
 * Brevoy is the eastern path from CALMAFAR, representing the borderlands
 * with the noble houses of Brevoy. This region focuses on political
 * alliances, trade routes, and noble house dynamics.
 *
 * Entry Tile: Brevoy
 *
 * Region Characteristics:
 * - Noble house politics and succession disputes
 * - Trade caravans and merchant opportunities
 * - Knightly tournaments and martial traditions
 * - Potential marriage alliances
 * - Access to eastern trade routes
 *
 * ==============================================
 * FUTURE CONTENT AREAS
 * ==============================================
 *
 * This file will eventually contain:
 * 1. Noble house relationship definitions
 * 2. Trade route mechanics
 * 3. Tournament and martial event systems
 * 4. Marriage/alliance proposal systems
 * 5. NPC definitions (noble families, merchants, knights)
 * 6. House reputation tracking
 */

import type { Region } from '../../game/types';

/**
 * Region identifier for Brevoy.
 */
export const BREVOY_REGION: Region = 'Brevoy';

/**
 * Theme colors for Brevoy UI elements.
 */
export const BREVOY_THEME = {
  primary: '#4682b4',    // Steel blue (nobility)
  secondary: '#2f4f4f',  // Dark slate gray
  accent: '#c0c0c0',     // Silver (heraldry)
  text: '#e8e8e8',       // Light text for contrast
};

/**
 * Tile IDs that belong to the Brevoy region.
 */
export const BREVOY_TILE_IDS = [
  'brevoy',
] as const;

/**
 * Display information for the Brevoy region.
 */
export const BREVOY_INFO = {
  name: 'Brevoy Borderlands',
  shortDescription: 'Eastern lands of noble houses',
  fullDescription: `The eastern borderlands connect to the kingdom of Brevoy, a realm
divided between the noble houses of Issia in the north and Rostland in the south.
The disappearance of House Rogarvia has left a power vacuum, and the noble families
scheme for advantage. For a young kingdom, Brevoy offers both opportunity and peril -
powerful allies can be found, but so can dangerous enemies.`,
  dangerLevel: 'Low-Moderate (Political)',
  primaryResources: ['Trade Goods', 'Horses', 'Weapons'],
  factions: [
    { name: 'House Surtova', disposition: 'Calculating' },
    { name: 'House Lebeda', disposition: 'Friendly' },
    { name: 'House Orlovsky', disposition: 'Neutral' },
    { name: 'Swordlords of Restov', disposition: 'Supportive' },
    // Future: Add more noble houses as storyline develops
  ],
};

/**
 * Noble houses of Brevoy for political gameplay.
 * Future: Expand with full relationship and reputation systems.
 */
export const BREVOY_NOBLE_HOUSES = [
  {
    id: 'surtova',
    name: 'House Surtova',
    seat: 'Port Ice',
    description: 'The current ruling house, known for cunning and ambition.',
    traits: ['Ambitious', 'Cunning', 'Wealthy'],
  },
  {
    id: 'lebeda',
    name: 'House Lebeda',
    seat: 'Silverhall',
    description: 'Merchants and diplomats, known for fair dealings.',
    traits: ['Diplomatic', 'Mercantile', 'Cultured'],
  },
  {
    id: 'orlovsky',
    name: 'House Orlovsky',
    seat: 'Eagle\'s Watch',
    description: 'Proud warriors who guard the northern borders.',
    traits: ['Martial', 'Proud', 'Honorable'],
  },
  {
    id: 'medvyed',
    name: 'House Medvyed',
    seat: 'Stoneclimb',
    description: 'Rangers and woodsmen, close to the Greenbelt.',
    traits: ['Rustic', 'Hardy', 'Nature-Bound'],
  },
];

// ==============================================
// PLACEHOLDER: POLITICAL EVENT DEFINITIONS
// ==============================================
// Future: Define noble house interactions here
// Example structure:
// export interface PoliticalEvent {
//   id: string;
//   name: string;
//   involvedHouses: string[];
//   options: PoliticalOption[];
//   consequencesForRelations: RelationEffect[];
// }
// export const BREVOY_POLITICAL_EVENTS: PoliticalEvent[] = [];

// ==============================================
// PLACEHOLDER: TRADE ROUTE DEFINITIONS
// ==============================================
// Future: Define trade mechanics here
// Example structure:
// export interface TradeRoute {
//   id: string;
//   name: string;
//   startingPoint: string;
//   destination: string;
//   goods: TradableGood[];
//   risks: Risk[];
//   profits: ProfitRange;
// }
// export const BREVOY_TRADE_ROUTES: TradeRoute[] = [];

// ==============================================
// PLACEHOLDER: TOURNAMENT DEFINITIONS
// ==============================================
// Future: Define martial competitions here
// Example structure:
// export interface Tournament {
//   id: string;
//   name: string;
//   events: TournamentEvent[];
//   prizes: Prize[];
//   reputationRewards: ReputationReward[];
// }
// export const BREVOY_TOURNAMENTS: Tournament[] = [];
