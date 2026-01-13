/**
 * GlobalMapScreen Component
 *
 * This is the main overworld view where players see their kingdom from above.
 * It displays a hexagonal grid representing different territories, with the
 * player's party token showing their current location.
 *
 * Key Features:
 * - Renders the HexMap component showing all tiles
 * - Shows "Enter Capital" button when party is on the capital tile
 * - Handles tile click events for navigation
 * - Displays helpful instructions for the player
 *
 * Architecture Note:
 * This screen is a "view" component - it receives data and callbacks from App.tsx
 * and presents them to the user. It doesn't manage game state itself, which keeps
 * our state management centralized and easier to debug.
 */

import React, { useState } from 'react';
import type { GlobalTile } from '../game/types';
import { HexMap } from '../components/HexMap';
import './GlobalMapScreen.css';

/**
 * Props for the GlobalMapScreen component.
 *
 * TypeScript interfaces define the "contract" for what data a component needs.
 * This makes it clear what the parent component must provide and helps catch
 * errors at compile time rather than runtime.
 */
interface GlobalMapScreenProps {
  /** Array of all tiles in the game world */
  tiles: GlobalTile[];

  /** ID of the tile where the party is currently located */
  partyTileId: string;

  /** The current custom name of the capital city */
  capitalName: string;

  /**
   * Callback fired when player clicks a tile to attempt movement.
   * The App.tsx component handles validation (checking if adjacent, etc.)
   */
  onAttemptMoveTo: (tileId: string) => void;

  /**
   * Callback fired when player clicks "Enter Capital" button.
   * This transitions to the Capital View screen.
   */
  onEnterCapital: () => void;

  /**
   * Callback to update the capital name.
   * Returns true if the name was valid and updated, false otherwise.
   */
  onUpdateCapitalName: (newName: string) => boolean;
}

/**
 * GlobalMapScreen - The main overworld map view
 *
 * This component renders the hex-based kingdom map and provides
 * navigation controls for the player.
 */
export function GlobalMapScreen({
  tiles,
  partyTileId,
  capitalName,
  onAttemptMoveTo,
  onEnterCapital,
  onUpdateCapitalName,
}: GlobalMapScreenProps): React.ReactElement {
  // ==============================================
  // STATE FOR NAME EDITING
  // ==============================================

  /** Whether the name edit modal is currently shown */
  const [isEditingName, setIsEditingName] = useState(false);

  /** The current value in the edit input field */
  const [editedName, setEditedName] = useState(capitalName);

  /** Error message to show if validation fails */
  const [nameError, setNameError] = useState<string | null>(null);

  // ==============================================
  // DERIVED STATE
  // ==============================================

  // Check if the party is currently on the capital tile
  // We use this to conditionally show the "Enter Capital" button
  const isOnCapital = partyTileId === 'capital';

  // Find the current tile to display its name
  const currentTile = tiles.find(t => t.id === partyTileId);
  const currentTileName = currentTile?.name ?? 'Unknown Location';
  const currentRegion = currentTile?.region;

  // ==============================================
  // NAME EDITING HANDLERS
  // ==============================================

  function startEditing(): void {
    setEditedName(capitalName);
    setNameError(null);
    setIsEditingName(true);
  }

  function cancelEditing(): void {
    setIsEditingName(false);
    setNameError(null);
  }

  function saveEditedName(): void {
    const trimmed = editedName.trim();
    if (trimmed.length === 0) {
      setNameError('Name cannot be empty');
      return;
    }
    if (trimmed.length > 30) {
      setNameError('Name must be 30 characters or less');
      return;
    }
    const success = onUpdateCapitalName(trimmed);
    if (success) {
      setIsEditingName(false);
      setNameError(null);
    } else {
      setNameError('Invalid name');
    }
  }

  function handleKeyDown(e: React.KeyboardEvent): void {
    if (e.key === 'Enter') {
      saveEditedName();
    } else if (e.key === 'Escape') {
      cancelEditing();
    }
  }

  return (
    <div className="global-map-screen">
      {/* ==============================================
          NAME EDIT MODAL
          ============================================== */}
      {isEditingName && (
        <div className="modal-overlay" onClick={cancelEditing}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2 className="modal-title">Rename Your Capital</h2>

            <div className="modal-input-group">
              <label htmlFor="capital-name-input" className="modal-label">
                Capital Name
              </label>
              <input
                id="capital-name-input"
                type="text"
                className={`modal-input ${nameError ? 'input-error' : ''}`}
                value={editedName}
                onChange={(e) => {
                  setEditedName(e.target.value);
                  setNameError(null);
                }}
                onKeyDown={handleKeyDown}
                maxLength={30}
                autoFocus
                placeholder="Enter capital name..."
              />
              {nameError && (
                <span className="error-message">{nameError}</span>
              )}
              <span className="char-count">
                {editedName.length}/30 characters
              </span>
            </div>

            <div className="modal-buttons">
              <button
                className="btn btn-secondary"
                onClick={cancelEditing}
              >
                Cancel
              </button>
              <button
                className="btn btn-primary"
                onClick={saveEditedName}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==============================================
          HEADER SECTION
          Shows the game title and current location
          ============================================== */}
      <header className="global-map-header">
        <h1 className="global-map-title">Kingmaker</h1>
        <p className="global-map-subtitle">Kingdom Management</p>
      </header>

      {/* ==============================================
          CURRENT LOCATION DISPLAY
          Shows where the party currently is
          ============================================== */}
      <div className="current-location">
        <span className="location-label">Current Location:</span>
        <div className="location-info">
          <span className="location-name">{currentTileName}</span>
          {isOnCapital && (
            <button
              className="btn-edit-name-small"
              onClick={startEditing}
              aria-label="Edit capital name"
              title="Edit capital name"
            >
              [Edit]
            </button>
          )}
          {currentRegion && currentRegion !== 'Capital' && (
            <span className="location-region">({currentRegion} Region)</span>
          )}
        </div>
      </div>

      {/* ==============================================
          HEX MAP
          The main interactive map showing all tiles
          ============================================== */}
      <div className="hex-map-container">
        <HexMap
          tiles={tiles}
          partyTileId={partyTileId}
          onTileClick={onAttemptMoveTo}
        />
      </div>

      {/* ==============================================
          ACTION BUTTONS
          Context-sensitive actions based on party location
          ============================================== */}
      <div className="action-buttons">
        {/*
          Enter Capital Button
          Only shown when the party is on the capital tile.
          This is separate from movement - clicking the capital tile
          when you're already there won't do anything special.
          The button provides an explicit action to enter the capital view.
        */}
        {isOnCapital && (
          <button
            className="btn btn-capital enter-capital-btn"
            onClick={onEnterCapital}
            aria-label="Enter the Capital city"
          >
            Enter Capital
          </button>
        )}
      </div>

      {/* ==============================================
          INSTRUCTIONS PANEL
          Helps new players understand the controls
          ============================================== */}
      <div className="instructions-panel">
        <h3 className="instructions-title">How to Play</h3>
        <ul className="instructions-list">
          <li>
            <strong>Move:</strong> Click an adjacent tile to move your party there
          </li>
          <li>
            <strong>Explore:</strong> Moving to a new tile reveals it and opens the Tile View
          </li>
          {isOnCapital && (
            <li>
              <strong>Capital:</strong> Click "Enter Capital" to manage your city
            </li>
          )}
          <li>
            <strong>Fog of War:</strong> Undiscovered tiles appear darker until explored
          </li>
        </ul>
      </div>

      {/* ==============================================
          LEGEND
          Explains the visual elements on the map
          ============================================== */}
      <div className="map-legend">
        <h4 className="legend-title">Map Legend</h4>
        <div className="legend-items">
          <div className="legend-item">
            <span className="legend-color legend-capital"></span>
            <span>Capital (Gold)</span>
          </div>
          <div className="legend-item">
            <span className="legend-color legend-discovered"></span>
            <span>Explored Territory</span>
          </div>
          <div className="legend-item">
            <span className="legend-color legend-undiscovered"></span>
            <span>Undiscovered (Fog of War)</span>
          </div>
          <div className="legend-item">
            <span className="legend-color legend-party"></span>
            <span>Your Party</span>
          </div>
        </div>
      </div>
    </div>
  );
}
