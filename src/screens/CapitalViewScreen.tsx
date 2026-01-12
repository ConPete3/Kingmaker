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
 * Future Features (not implemented yet):
 * - Building grid showing constructed structures
 * - Resource management panel
 * - Construction queue
 * - Population and happiness indicators
 * - Kingdom events and decisions
 *
 * Current Implementation:
 * - Placeholder UI showing the concept
 * - "Back to Global Map" navigation
 * - Category panels for future features
 */

import React from 'react';
import './CapitalViewScreen.css';

/**
 * Props for the CapitalViewScreen component.
 */
interface CapitalViewScreenProps {
  /**
   * Callback to return to the Global Map.
   * The party stays on the capital tile when returning.
   */
  onBack: () => void;
}

/**
 * CapitalViewScreen - The kingdom management hub
 *
 * This is where players manage their kingdom. Currently a placeholder
 * that establishes the UI structure for future features.
 */
export function CapitalViewScreen({
  onBack,
}: CapitalViewScreenProps): React.ReactElement {
  return (
    <div className="capital-view-screen">
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
          <h1 className="capital-title">The Capital</h1>
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
