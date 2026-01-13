/**
 * GlobalMapScreen Component
 *
 * This is the main overworld view where players see their kingdom from above.
 * The layout prioritizes the map, which takes up the majority of the screen,
 * with UI controls in a compact sidebar.
 *
 * Key Features:
 * - Large, central hex map display
 * - Compact sidebar with legend, how to play, and action buttons
 * - Modal for capital name editing
 */

import React, { useState } from 'react';
import type { GlobalTile } from '../game/types';
import { HexMap } from '../components/HexMap';
import { MapLegend } from '../components/MapLegend';
import { HowToPlay } from '../components/HowToPlay';
import './GlobalMapScreen.css';

/**
 * Props for the GlobalMapScreen component.
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

  const [isEditingName, setIsEditingName] = useState(false);
  const [editedName, setEditedName] = useState(capitalName);
  const [nameError, setNameError] = useState<string | null>(null);

  // ==============================================
  // DERIVED STATE
  // ==============================================

  const isOnCapital = partyTileId === 'capital';
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
          HEADER - Compact title bar
          ============================================== */}
      <header className="global-map-header">
        <h1 className="global-map-title">Kingmaker</h1>
        <div className="current-location">
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
            <span className="location-region">({currentRegion})</span>
          )}
        </div>
      </header>

      {/* ==============================================
          MAIN CONTENT - Map and Sidebar
          ============================================== */}
      <div className="main-content">
        {/* Large Map Container */}
        <div className="hex-map-container">
          <HexMap
            tiles={tiles}
            partyTileId={partyTileId}
            onTileClick={onAttemptMoveTo}
          />
        </div>

        {/* Sidebar with controls */}
        <aside className="map-sidebar">
          {/* Action Buttons */}
          {isOnCapital && (
            <button
              className="btn btn-capital enter-capital-btn"
              onClick={onEnterCapital}
              aria-label="Enter the Capital city"
            >
              Enter Capital
            </button>
          )}

          {/* Legend */}
          <MapLegend />

          {/* How to Play */}
          <HowToPlay isOnCapital={isOnCapital} />
        </aside>
      </div>
    </div>
  );
}
