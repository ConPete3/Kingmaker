/**
 * TileViewScreen Component
 *
 * This is a placeholder component for the detailed view of individual tiles.
 * When players move to a non-capital tile, they'll see this view which will
 * eventually contain a detailed grid map of that location.
 *
 * Future Features (not implemented yet):
 * - Grid-based tactical map of the tile
 * - Resource nodes and points of interest
 * - Enemy encounters and events
 * - Building placement opportunities
 *
 * Current Implementation:
 * - Shows the tile name and basic info
 * - Provides a "Back to Global Map" button
 * - Serves as a structural placeholder for future development
 *
 * Architecture Note:
 * The TileViewScreen receives the full tile data object, allowing it to
 * display tile-specific information and eventually load tile-specific
 * content (encounters, resources, etc.).
 */

import React from 'react';
import type { GlobalTile } from '../game/types';
import './TileViewScreen.css';

/**
 * Props for the TileViewScreen component.
 */
interface TileViewScreenProps {
  /** The tile data for the location being viewed */
  tile: GlobalTile;

  /**
   * Callback to return to the Global Map.
   * The party position is preserved - you'll return to the same tile.
   */
  onBack: () => void;
}

/**
 * Get a thematic description for a tile based on its name and region.
 * This is placeholder content that will eventually come from tile data.
 *
 * @param tileName - The name of the tile
 * @param region - The region the tile belongs to
 * @returns A descriptive string for the tile
 */
function getTileDescription(tileName: string, region: string): string {
  // Map of tile names to atmospheric descriptions
  const descriptions: Record<string, string> = {
    // Greenbelt Region (North)
    'Greenbelt NW':
      'A dense forest stretches before you, ancient oaks and towering pines blocking ' +
      'much of the sky. The western Greenbelt is home to druid circles and sacred groves. ' +
      'Mossy stones hint at forgotten shrines, and wildlife watches from the shadows.',

    'Greenbelt NE':
      'The eastern edge of the Greenbelt is wild and untamed. Fallen logs and thick ' +
      'underbrush make travel difficult. Old ruins peek through the canopy - remnants ' +
      'of failed settlements. Rich lumber resources await those who can tame this land.',

    // Pitax Region (West)
    'Pitax':
      'The border territories of Pitax stretch before you. King Irovetti\'s realm is ' +
      'known for its cultural pretensions and political scheming. Colorful banners ' +
      'mark the boundary, and distant music carries on the wind. Approach with caution.',

    // Brevoy Region (East)
    'Brevoy':
      'The borderlands with Brevoy are marked by watchtowers and trading posts. ' +
      'Noble houses compete for influence here, and merchant caravans travel well-worn ' +
      'roads. The Swordlords of Restov have long supported ventures into the Stolen Lands.',

    // Tuskwater Bay Region (South)
    'Tuskwater Bay SW':
      'The western shore of Tuskwater Bay is dotted with fishing villages and rocky coves. ' +
      'The smell of salt and seaweed fills the air. Local fishermen speak of the great ' +
      'tusked creatures that give the bay its name, and of smugglers who use the hidden inlets.',

    'Tuskwater Bay SE':
      'The eastern shores of Tuskwater Bay offer calmer waters and natural harbors. ' +
      'This would be an ideal location for a port town. Trade ships from distant lands ' +
      'occasionally anchor here, and the fishing is plentiful.',
  };

  return descriptions[tileName] ??
    `This ${region} territory awaits exploration. What mysteries will you uncover?`;
}

/**
 * Get an icon/emoji representation for a tile based on its name and region.
 * (Using simple text representations since we're not using emoji by default)
 */
function getTileIcon(tileName: string, region: string): string {
  const icons: Record<string, string> = {
    // Greenbelt tiles
    'Greenbelt NW': '[Forest]',
    'Greenbelt NE': '[Forest]',
    // Pitax
    'Pitax': '[Castle]',
    // Brevoy
    'Brevoy': '[Tower]',
    // Tuskwater Bay tiles
    'Tuskwater Bay SW': '[Bay]',
    'Tuskwater Bay SE': '[Harbor]',
  };

  // Fallback icons by region
  const regionIcons: Record<string, string> = {
    'Greenbelt': '[Forest]',
    'Pitax': '[Castle]',
    'Brevoy': '[Tower]',
    'Tuskwater Bay': '[Bay]',
  };

  return icons[tileName] ?? regionIcons[region] ?? '[Territory]';
}

/**
 * TileViewScreen - Detailed view of a single tile
 *
 * Currently a placeholder that will eventually show a grid-based
 * tactical map of the tile location.
 */
export function TileViewScreen({
  tile,
  onBack,
}: TileViewScreenProps): React.ReactElement {

  const description = getTileDescription(tile.name, tile.region);
  const icon = getTileIcon(tile.name, tile.region);

  return (
    <div className="tile-view-screen">
      {/* ==============================================
          HEADER WITH NAVIGATION
          ============================================== */}
      <header className="tile-view-header">
        <button
          className="btn btn-secondary back-button"
          onClick={onBack}
          aria-label="Return to the Global Map"
        >
          Back to Global Map
        </button>

        {/* Region indicator in header */}
        <div className="region-indicator">
          <span className="region-label">Region:</span>
          <span className={`region-name region-${tile.region.toLowerCase().replace(' ', '-')}`}>
            {tile.region}
          </span>
        </div>
      </header>

      {/* ==============================================
          TILE INFORMATION
          ============================================== */}
      <main className="tile-view-content">
        <div className="tile-info-card">
          {/* Tile Icon/Visual */}
          <div className="tile-icon">{icon}</div>

          {/* Tile Name */}
          <h1 className="tile-name">{tile.name}</h1>

          {/* Region Badge */}
          <span className={`tile-region-badge region-${tile.region.toLowerCase().replace(' ', '-')}`}>
            {tile.region} Region
          </span>

          {/* Tile Type Badge */}
          <span className="tile-type-badge">Wild Territory</span>

          {/* Tile Description */}
          <p className="tile-description">{description}</p>

          {/* Tile Coordinates (useful for debugging and gameplay) */}
          <div className="tile-coords">
            <span className="coords-label">Coordinates:</span>
            <span className="coords-value">
              ({tile.axial.q}, {tile.axial.r})
            </span>
          </div>
        </div>

        {/* ==============================================
            PLACEHOLDER FOR FUTURE CONTENT
            This section will eventually contain:
            - Grid-based tactical map
            - Resource indicators
            - Event/encounter panels
            - Building placement UI
            ============================================== */}
        <div className="tile-map-placeholder">
          <div className="placeholder-content">
            <h2 className="placeholder-title">Tile Map</h2>
            <p className="placeholder-text">
              The detailed grid map for this location will be implemented here.
            </p>
            <p className="placeholder-text">
              Future features will include:
            </p>
            <ul className="placeholder-list">
              <li>Grid-based tactical movement</li>
              <li>Resource discovery and collection</li>
              <li>Random encounters and events</li>
              <li>Points of interest to explore</li>
              <li>Building and settlement placement</li>
            </ul>
          </div>
        </div>

        {/* ==============================================
            ACTIONS PANEL
            Future home for tile-specific actions
            ============================================== */}
        <div className="tile-actions">
          <h3 className="actions-title">Available Actions</h3>
          <div className="actions-list">
            <button className="btn btn-secondary action-btn" disabled>
              Survey Area (Coming Soon)
            </button>
            <button className="btn btn-secondary action-btn" disabled>
              Make Camp (Coming Soon)
            </button>
            <button className="btn btn-secondary action-btn" disabled>
              Search for Resources (Coming Soon)
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
