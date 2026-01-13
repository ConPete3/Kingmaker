/**
 * CapitalViewScreen Component
 *
 * This is the detailed view of the player's capital city - the heart of
 * their kingdom. This is where players will manage buildings, resources,
 * and kingdom affairs.
 *
 * Why Capital is Special:
 * Unlike wild tiles which are primarily for exploration and combat,
 * the capital is a persistent base where players:
 * - Construct and upgrade buildings
 * - Manage resources and treasury
 * - Recruit units and adventurers
 * - Make kingdom-wide decisions
 *
 * Features:
 * - Editable capital name (defaults to "CALMAFAR")
 * - Category panels for future features
 * - "Back to Global Map" navigation
 *
 * Future Features (not implemented yet):
 * - Building grid showing constructed structures
 * - Resource management panel
 * - Construction queue
 * - Population and happiness indicators
 * - Kingdom events and decisions
 */

import React, { useState } from 'react';
import './CapitalViewScreen.css';

/**
 * Props for the CapitalViewScreen component.
 */
interface CapitalViewScreenProps {
  /**
   * The current name of the capital city.
   * Defaults to "CALMAFAR" but can be customized by the player.
   */
  capitalName: string;

  /**
   * Callback to update the capital name.
   * Returns true if the name was valid and updated, false otherwise.
   */
  onUpdateCapitalName: (newName: string) => boolean;

  /**
   * Callback to return to the Global Map.
   * The party stays on the capital tile when returning.
   */
  onBack: () => void;
}

/**
 * CapitalViewScreen - The kingdom management hub
 *
 * This is where players manage their kingdom. Features include
 * the ability to rename the capital city.
 */
export function CapitalViewScreen({
  capitalName,
  onUpdateCapitalName,
  onBack,
}: CapitalViewScreenProps): React.ReactElement {
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
  // NAME EDITING HANDLERS
  // ==============================================

  /**
   * Start editing the capital name.
   * Opens the edit modal with the current name pre-filled.
   */
  function startEditing(): void {
    setEditedName(capitalName);
    setNameError(null);
    setIsEditingName(true);
  }

  /**
   * Cancel editing and close the modal.
   */
  function cancelEditing(): void {
    setIsEditingName(false);
    setNameError(null);
  }

  /**
   * Save the edited name.
   * Validates the name and updates state if valid.
   */
  function saveEditedName(): void {
    const trimmed = editedName.trim();

    // Validation: Name must not be empty
    if (trimmed.length === 0) {
      setNameError('Name cannot be empty');
      return;
    }

    // Validation: Maximum length
    if (trimmed.length > 30) {
      setNameError('Name must be 30 characters or less');
      return;
    }

    // Attempt to update the name via callback
    const success = onUpdateCapitalName(trimmed);
    if (success) {
      setIsEditingName(false);
      setNameError(null);
    } else {
      setNameError('Invalid name');
    }
  }

  /**
   * Handle keyboard events in the edit input.
   * Enter saves, Escape cancels.
   */
  function handleKeyDown(e: React.KeyboardEvent): void {
    if (e.key === 'Enter') {
      saveEditedName();
    } else if (e.key === 'Escape') {
      cancelEditing();
    }
  }

  return (
    <div className="capital-view-screen">
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
          HEADER WITH NAVIGATION
          ============================================== */}
      <header className="capital-header">
        <button
          className="btn btn-secondary back-button"
          onClick={onBack}
          aria-label="Return to the Global Map"
        >
          Back to Global Map
        </button>

        <div className="capital-title-area">
          <div className="capital-name-row">
            <h1 className="capital-title">{capitalName}</h1>
            <button
              className="btn-edit-name"
              onClick={startEditing}
              aria-label="Edit capital name"
              title="Edit capital name"
            >
              [Edit]
            </button>
          </div>
          <p className="capital-subtitle">Heart of Your Kingdom</p>
        </div>

        {/* Placeholder for future resource display */}
        <div className="resource-summary">
          <span className="resource-placeholder">Resources: Coming Soon</span>
        </div>
      </header>

      {/* ==============================================
          MAIN CONTENT AREA
          ============================================== */}
      <main className="capital-content">
        {/* ==============================================
            CITY OVERVIEW PANEL
            ============================================== */}
        <section className="capital-section city-overview">
          <h2 className="section-title">City Overview</h2>
          <div className="overview-grid">
            <div className="overview-stat">
              <span className="stat-label">Population</span>
              <span className="stat-value">--</span>
            </div>
            <div className="overview-stat">
              <span className="stat-label">Happiness</span>
              <span className="stat-value">--</span>
            </div>
            <div className="overview-stat">
              <span className="stat-label">Defense</span>
              <span className="stat-value">--</span>
            </div>
            <div className="overview-stat">
              <span className="stat-label">Income</span>
              <span className="stat-value">--</span>
            </div>
          </div>
        </section>

        {/* ==============================================
            BUILDINGS PANEL (Placeholder)
            ============================================== */}
        <section className="capital-section buildings-panel">
          <h2 className="section-title">Buildings</h2>
          <div className="placeholder-grid">
            <div className="building-slot empty">
              <span className="slot-label">Empty Slot</span>
              <span className="slot-hint">Click to build</span>
            </div>
            <div className="building-slot empty">
              <span className="slot-label">Empty Slot</span>
              <span className="slot-hint">Click to build</span>
            </div>
            <div className="building-slot empty">
              <span className="slot-label">Empty Slot</span>
              <span className="slot-hint">Click to build</span>
            </div>
            <div className="building-slot empty">
              <span className="slot-label">Empty Slot</span>
              <span className="slot-hint">Click to build</span>
            </div>
          </div>
          <p className="coming-soon-text">
            Building system coming in a future update
          </p>
        </section>

        {/* ==============================================
            ACTIONS PANEL
            ============================================== */}
        <section className="capital-section actions-panel">
          <h2 className="section-title">Capital Actions</h2>
          <div className="action-grid">
            <button className="btn btn-secondary capital-action" disabled>
              Construct Building
            </button>
            <button className="btn btn-secondary capital-action" disabled>
              Recruit Units
            </button>
            <button className="btn btn-secondary capital-action" disabled>
              Manage Treasury
            </button>
            <button className="btn btn-secondary capital-action" disabled>
              Kingdom Edicts
            </button>
          </div>
        </section>

        {/* ==============================================
            EVENTS/NEWS PANEL (Placeholder)
            ============================================== */}
        <section className="capital-section events-panel">
          <h2 className="section-title">Recent Events</h2>
          <div className="events-list">
            <div className="event-item">
              <span className="event-icon">[i]</span>
              <span className="event-text">
                Welcome to your new capital! This is where you'll manage your
                growing kingdom.
              </span>
            </div>
            <div className="event-item">
              <span className="event-icon">[*]</span>
              <span className="event-text">
                Explore the surrounding territories to expand your domain and
                discover resources.
              </span>
            </div>
          </div>
        </section>
      </main>

      {/* ==============================================
          FOOTER
          ============================================== */}
      <footer className="capital-footer">
        <p className="footer-text">
          Capital management features are under development.
          Check back for updates!
        </p>
      </footer>
    </div>
  );
}
