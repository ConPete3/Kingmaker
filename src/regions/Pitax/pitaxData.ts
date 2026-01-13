/**
 * Pitax Region Data
 *
 * Pitax is the western path from CALMAFAR, representing the border
 * territories with the rival Kingdom of Pitax. This region is focused
 * on political intrigue, cultural competition, and diplomatic challenges.
 *
 * Entry Tile: Pitax
 *
 * Region Characteristics:
 * - Border territory with a rival kingdom
 * - Political intrigue and espionage
 * - Cultural events and competitions
 * - Trade opportunities and economic warfare
 * - Potential for both alliance and conflict
 *
 * ==============================================
 * FUTURE CONTENT AREAS
 * ==============================================
 *
 * This file will eventually contain:
 * 1. Diplomatic encounter definitions
 * 2. Espionage mission structures
 * 3. Cultural event systems (festivals, tournaments)
 * 4. Trade route mechanics
 * 5. NPC definitions (King Irovetti, nobles, spies)
 * 6. Faction reputation system
 */

import type { Region } from '../../game/types';

/**
 * Region identifier for Pitax.
 */
export const PITAX_REGION: Region = 'Pitax';

/**
 * Theme colors for Pitax UI elements.
 */
export const PITAX_THEME = {
  primary: '#8b4513',    // Saddle brown (regal)
  secondary: '#654321',  // Dark brown
  accent: '#daa520',     // Golden rod (wealth)
  text: '#e8e8e8',       // Light text for contrast
};

/**
 * Tile IDs that belong to the Pitax region.
 */
export const PITAX_TILE_IDS = [
  'pitax',
] as const;

/**
 * Display information for the Pitax region.
 */
export const PITAX_INFO = {
  name: 'Pitax Territory',
  shortDescription: 'Border territories of a rival kingdom',
  fullDescription: `The western lands border the Kingdom of Pitax, ruled by the
eccentric King Irovetti. Pitax fancies itself a cultural capital, hosting grand
festivals and artistic competitions. Beneath the veneer of civilization, however,
lies a web of political intrigue, espionage, and ruthless ambition. Relations with
Pitax will shape the future of your kingdom.`,
  dangerLevel: 'Variable (Political)',
  primaryResources: ['Trade Goods', 'Cultural Items', 'Information'],
  factions: [
    { name: 'House Irovetti', disposition: 'Rival' },
    { name: 'Pitax Merchants', disposition: 'Neutral' },
    { name: 'Academy of Grand Arts', disposition: 'Neutral' },
    // Future: Add more factions as storyline develops
  ],
};

// ==============================================
// PLACEHOLDER: DIPLOMATIC EVENT DEFINITIONS
// ==============================================
// Future: Define diplomatic scenarios here
// Example structure:
// export interface DiplomaticEvent {
//   id: string;
//   name: string;
//   type: 'negotiation' | 'festival' | 'trade' | 'intrigue';
//   options: DiplomaticOption[];
//   consequences: Consequence[];
// }
// export const PITAX_DIPLOMATIC_EVENTS: DiplomaticEvent[] = [];

// ==============================================
// PLACEHOLDER: ESPIONAGE MISSION DEFINITIONS
// ==============================================
// Future: Define spy missions here
// Example structure:
// export interface EspionageMission {
//   id: string;
//   name: string;
//   difficulty: number;
//   requirements: Requirement[];
//   rewards: Reward[];
//   risks: Risk[];
// }
// export const PITAX_ESPIONAGE_MISSIONS: EspionageMission[] = [];

// ==============================================
// PLACEHOLDER: CULTURAL EVENT DEFINITIONS
// ==============================================
// Future: Define festivals and competitions here
// Example structure:
// export interface CulturalEvent {
//   id: string;
//   name: string;
//   category: 'art' | 'music' | 'poetry' | 'athletics';
//   entryRequirements: Requirement[];
//   reputationEffects: ReputationEffect[];
// }
// export const PITAX_CULTURAL_EVENTS: CulturalEvent[] = [];
