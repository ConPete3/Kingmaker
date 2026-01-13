/**
 * HowToPlay Component
 *
 * Displays instructions for how to play the game.
 * Can be collapsed/expanded to save screen space.
 */

import React, { useState } from 'react';
import './HowToPlay.css';

interface HowToPlayProps {
  /** Whether the party is currently on the capital tile */
  isOnCapital: boolean;
}

/**
 * HowToPlay - Game instructions panel
 */
export function HowToPlay({ isOnCapital }: HowToPlayProps): React.ReactElement {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="how-to-play">
      <button
        className="how-to-play-toggle"
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
      >
        <span className="how-to-play-title">How to Play</span>
        <span className="toggle-icon">{isExpanded ? '−' : '+'}</span>
      </button>

      {isExpanded && (
        <ul className="instructions-list">
          <li>
            <strong>Move:</strong> Click an adjacent tile to move your party
          </li>
          <li>
            <strong>Regions:</strong> Movement is restricted within the same region. Use the capital to travel between regions.
          </li>
          {isOnCapital && (
            <li>
              <strong>Capital:</strong> Click "Enter Capital" to manage your city
            </li>
          )}
          <li>
            <strong>Explore:</strong> Moving to a new tile reveals the Tile View
          </li>
        </ul>
      )}
    </div>
  );
}
