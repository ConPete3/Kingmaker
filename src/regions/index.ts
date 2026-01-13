/**
 * Regional Data Index
 *
 * This file exports all regional data for easy importing throughout the application.
 * Each region represents a distinct progression path from the capital CALMAFAR.
 *
 * Regional Framework:
 * ===================
 * - Greenbelt (North): Dense forests, druid circles, wilderness exploration
 * - Pitax (West): Rival kingdom, political intrigue, cultural competition
 * - Brevoy (East): Noble houses, trade routes, diplomatic opportunities
 * - Tuskwater Bay (South): Coastal territories, maritime activities, naval gameplay
 *
 * Future Development:
 * Each region will eventually contain:
 * - Unique storylines and questlines
 * - Deterministic map layouts (not randomly generated)
 * - Region-specific NPCs and factions
 * - Progressive difficulty as players explore further from CALMAFAR
 */

// ==============================================
// GREENBELT REGION (North Path)
// ==============================================
export {
  GREENBELT_REGION,
  GREENBELT_THEME,
  GREENBELT_TILE_IDS,
  GREENBELT_INFO,
} from './Greenbelt/greenbeltData';

// ==============================================
// PITAX REGION (West Path)
// ==============================================
export {
  PITAX_REGION,
  PITAX_THEME,
  PITAX_TILE_IDS,
  PITAX_INFO,
} from './Pitax/pitaxData';

// ==============================================
// BREVOY REGION (East Path)
// ==============================================
export {
  BREVOY_REGION,
  BREVOY_THEME,
  BREVOY_TILE_IDS,
  BREVOY_INFO,
  BREVOY_NOBLE_HOUSES,
} from './Brevoy/brevoyData';

// ==============================================
// TUSKWATER BAY REGION (South Path)
// ==============================================
export {
  TUSKWATER_REGION,
  TUSKWATER_THEME,
  TUSKWATER_TILE_IDS,
  TUSKWATER_INFO,
  TUSKWATER_LOCATIONS,
} from './TuskwaterBay/tuskwaterData';

/**
 * Get region info by region name.
 * Useful for looking up region data dynamically.
 */
import type { Region } from '../game/types';
import { GREENBELT_INFO } from './Greenbelt/greenbeltData';
import { PITAX_INFO } from './Pitax/pitaxData';
import { BREVOY_INFO } from './Brevoy/brevoyData';
import { TUSKWATER_INFO } from './TuskwaterBay/tuskwaterData';

export function getRegionInfo(region: Region) {
  const regionInfoMap = {
    'Capital': {
      name: 'The Capital',
      shortDescription: 'Heart of your kingdom',
      fullDescription: 'Your seat of power, from which you rule the Stolen Lands.',
      dangerLevel: 'Safe',
      primaryResources: ['All'],
      factions: [],
    },
    'Greenbelt': GREENBELT_INFO,
    'Pitax': PITAX_INFO,
    'Brevoy': BREVOY_INFO,
    'Tuskwater Bay': TUSKWATER_INFO,
  };
  return regionInfoMap[region];
}

/**
 * Get theme colors for a region.
 * Used for consistent UI theming based on current location.
 */
import { GREENBELT_THEME } from './Greenbelt/greenbeltData';
import { PITAX_THEME } from './Pitax/pitaxData';
import { BREVOY_THEME } from './Brevoy/brevoyData';
import { TUSKWATER_THEME } from './TuskwaterBay/tuskwaterData';

export function getRegionTheme(region: Region) {
  const themeMap = {
    'Capital': {
      primary: '#ffd700',
      secondary: '#b8860b',
      accent: '#ffec8b',
      text: '#1a1a1a',
    },
    'Greenbelt': GREENBELT_THEME,
    'Pitax': PITAX_THEME,
    'Brevoy': BREVOY_THEME,
    'Tuskwater Bay': TUSKWATER_THEME,
  };
  return themeMap[region];
}
