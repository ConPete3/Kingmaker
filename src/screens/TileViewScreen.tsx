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
 * Get a thematic description for a tile based on its name.
 * This is placeholder content that will eventually come from tile data.
 *
 * @param tileName - The name of the tile
 * @returns A descriptive string for the tile
 */
function getTileDescription(tileName: string): string {
  // Map of tile names to atmospheric descriptions
  const descriptions: Record<string, string> = {
    'Eastern Mountains':
      'Jagged peaks rise before you, their snow-capped summits piercing the clouds. ' +
      'The air grows thin and cold. Ancient paths wind through the rocky terrain, ' +
      'promising both danger and the glint of precious minerals.',

    'Northeastern Hills':
      'Rolling hills stretch toward the horizon, dotted with crumbling stone structures. ' +
      'An ancient civilization once thrived here. Now, only ruins remain, ' +
      'whispering secrets to those brave enough to explore.',

    'Northern Forest':
      'A vast canopy of ancient trees blocks out the sun, casting the forest floor ' +
      'in perpetual twilight. Strange sounds echo through the undergrowth. ' +
      'The forest holds many secrets for those who dare enter.',

    'Western Plains':
      'Endless grasslands sway in the wind, golden waves stretching to the horizon. ' +
      'This fertile land promises bountiful harvests for any who settle here. ' +
      'But the open terrain offers little protection from threats.',

    'Southern Marsh':
      'Murky waters and twisted trees create a labyrinthine swamp. ' +
      'The air is thick with mist and the buzz of insects. ' +
      'Rare herbs grow here, but so do deadly creatures.',

    'Southeastern River':
      'A mighty river carves through the landscape, its waters teeming with fish. ' +
      'The fertile floodplains could support prosperous settlements. ' +
      'Trade boats from distant lands sometimes pass through here.',
  };

  return descriptions[tileName] ??
    'An unexplored territory awaits. What mysteries will you uncover?';
}

/**
 * Get an icon/emoji representation for a tile based on its name.
 * (Using simple text representations since we're not using emoji by default)
 */
function getTileIcon(tileName: string): string {
  const icons: Record<string, string> = {
    'Eastern Mountains': '[Mountain]',
    'Northeastern Hills': '[Hills]',
    'Northern Forest': '[Forest]',
    'Western Plains': '[Plains]',
    'Southern Marsh': '[Marsh]',
    'Southeastern River': '[River]',
  };
  return icons[tileName] ?? '[Territory]';
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

  const description = getTileDescription(tile.name);
  const icon = getTileIcon(tile.name);

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
