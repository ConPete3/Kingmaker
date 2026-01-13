/**
 * App.tsx - Main Application Component
 *
 * This is the root component of the Kingmaker game. It manages:
 * - Global game state (tiles, party position, current screen)
 * - Navigation between different views (Global Map, Tile View, Capital)
 * - Core game logic (movement validation, tile discovery)
 *
 * Architecture Overview:
 * =====================
 * The app follows a "lifting state up" pattern where all important state
 * is managed here at the top level, and child components receive data
 * and callbacks as props. This makes the game state easy to understand
 * and debug.
 *
 * State Management:
 * - tiles: Array of all GlobalTile objects, including their discovered status
 * - partyTileId: ID of the tile where the party is currently located
 * - screen: Current view (global map, tile view, or capital view)
 *
 * Screen Flow:
 * - Global Map: Overview of the kingdom, click tiles to move
 * - Tile View: Detailed view of a wild tile (opens when moving to non-capital)
 * - Capital View: City management screen (opened via "Enter Capital" button)
 */

import { useMemo, useState } from 'react';
import { INITIAL_TILES, DEFAULT_CAPITAL_NAME } from './game/data/tiles';
import type { GlobalTile } from './game/types';
import { GlobalMapScreen } from './screens/GlobalMapScreen';
import { TileViewScreen } from './screens/TileViewScreen';
import { CapitalViewScreen } from './screens/CapitalViewScreen';
import { axialNeighbors, axialEquals } from './game/logic/hex';

/**
 * Screen State Type
 *
 * Using a discriminated union type to represent the current screen.
 * This pattern ensures we always know exactly which screen we're on
 * and what data is associated with it.
 *
 * - "global": The Global Map view (no additional data needed)
 * - "tile": A specific tile's detailed view (needs the tile ID)
 * - "capital": The Capital city management view (no additional data)
 */
type Screen =
  | { kind: 'global' }
  | { kind: 'tile'; tileId: string }
  | { kind: 'capital' };

/**
 * App Component - Root of the Application
 *
 * This component:
 * 1. Initializes and manages all game state
 * 2. Provides movement validation and tile discovery logic
 * 3. Routes to the appropriate screen based on current state
 */
export default function App() {
  // ==============================================
  // STATE MANAGEMENT
  // ==============================================

  /**
   * tiles: The current state of all map tiles.
   *
   * We start with INITIAL_TILES and update this as the player
   * discovers new tiles. Each tile has a 'discovered' boolean
   * that starts false and becomes true when visited.
   */
  const [tiles, setTiles] = useState<GlobalTile[]>(INITIAL_TILES);

  /**
   * partyTileId: Where the player's party is currently located.
   *
   * Starts at "capital" - the player begins in their capital city.
   * Updates when the player successfully moves to an adjacent tile.
   */
  const [partyTileId, setPartyTileId] = useState<string>('capital');

  /**
   * screen: Which view is currently being displayed.
   *
   * - Global map is the default view
   * - Tile view is shown when entering a wild tile
   * - Capital view is shown when "Enter Capital" button is clicked
   */
  const [screen, setScreen] = useState<Screen>({ kind: 'global' });

  /**
   * capitalName: The player's custom name for their capital city.
   *
   * Defaults to "CALMAFAR" but can be renamed by the player.
   * This name persists throughout the game session and is displayed
   * on the Global Map and in the Capital View.
   */
  const [capitalName, setCapitalName] = useState<string>(DEFAULT_CAPITAL_NAME);

  // ==============================================
  // DERIVED STATE (computed from primary state)
  // ==============================================

  /**
   * tilesById: A Map for O(1) tile lookup by ID.
   *
   * useMemo ensures this is only recalculated when tiles change.
   * This optimization is important because we look up tiles frequently
   * during movement validation.
   */
  const tilesById = useMemo(
    () => new Map(tiles.map((t) => [t.id, t])),
    [tiles]
  );

  /**
   * tilesWithCapitalName: Tiles array with the capital's name updated
   * to reflect the player's custom name.
   *
   * This ensures the custom capital name is displayed consistently
   * throughout the game without modifying the base tile data structure.
   */
  const tilesWithCapitalName = useMemo(
    () => tiles.map((t) =>
      t.id === 'capital' ? { ...t, name: capitalName } : t
    ),
    [tiles, capitalName]
  );

  // ==============================================
  // GAME LOGIC FUNCTIONS
  // ==============================================

  /**
   * Check if a move between two tiles is valid (they are adjacent).
   *
   * Uses the axial coordinate system to find neighbors.
   * A move is valid only if the destination is one of the 6
   * hexes surrounding the source.
   *
   * @param fromId - ID of the tile moving from
   * @param toId - ID of the tile moving to
   * @returns true if the move is valid
   */
  function isAdjacentMove(fromId: string, toId: string): boolean {
    const from = tilesById.get(fromId);
    const to = tilesById.get(toId);

    // If either tile doesn't exist, the move is invalid
    if (!from || !to) return false;

    // Get all 6 neighboring positions of the source tile
    const neighbors = axialNeighbors(from.axial);

    // Check if any neighbor matches the destination's coordinates
    return neighbors.some((neighbor) => axialEquals(neighbor, to.axial));
  }

  /**
   * Check if movement between two tiles is allowed based on region rules.
   *
   * Movement Rules:
   * - Can always move to/from the Capital (it's a hub)
   * - Can move between tiles in the same region
   * - Cannot move directly between different regions
   *
   * This prevents shortcuts like Pitax -> Tuskwater Bay or Greenbelt -> Brevoy.
   * Players must return to the Capital to switch regions.
   *
   * @param fromId - ID of the tile moving from
   * @param toId - ID of the tile moving to
   * @returns true if movement is allowed between regions
   */
  function isRegionMoveAllowed(fromId: string, toId: string): boolean {
    const from = tilesById.get(fromId);
    const to = tilesById.get(toId);

    // If either tile doesn't exist, movement is not allowed
    if (!from || !to) return false;

    // Capital acts as a hub - can always move to/from Capital
    if (from.region === 'Capital' || to.region === 'Capital') {
      return true;
    }

    // Allow movement within the same region
    return from.region === to.region;
  }

  /**
   * Mark a tile as discovered when the player visits it.
   *
   * This updates the tiles array immutably - we create a new array
   * with the updated tile rather than mutating the existing one.
   * React requires immutable updates to detect changes properly.
   *
   * @param tileId - ID of the tile to mark as discovered
   */
  function markDiscovered(tileId: string): void {
    setTiles((prevTiles) =>
      prevTiles.map((tile) =>
        tile.id === tileId
          ? { ...tile, discovered: true }  // Create new object with discovered: true
          : tile                           // Keep other tiles unchanged
      )
    );
  }

  /**
   * Attempt to move the party to a different tile.
   *
   * This function validates the move and, if valid:
   * 1. Updates the party position
   * 2. Marks the destination as discovered
   * 3. Transitions to the appropriate screen
   *
   * Movement Rules:
   * - Can only move to adjacent tiles (no teleporting!)
   * - Can only move within same region or to/from Capital
   * - Clicking current tile does nothing
   * - Moving to a wild tile opens the Tile View
   * - Moving to the Capital tile stays on Global Map (use button to enter)
   *
   * @param tileId - ID of the tile to move to
   */
  function attemptMoveTo(tileId: string): void {
    // Ignore clicks on the current tile
    if (tileId === partyTileId) return;

    // Validate that the destination is adjacent
    if (!isAdjacentMove(partyTileId, tileId)) {
      // For now, silently ignore non-adjacent moves
      // Future enhancement: show feedback to player
      return;
    }

    // Validate that movement is allowed between regions
    if (!isRegionMoveAllowed(partyTileId, tileId)) {
      // Cannot move between different regions directly
      // Must return to Capital first to switch regions
      return;
    }

    // Move is valid! Update party position
    setPartyTileId(tileId);

    // Mark the destination as discovered (in case it wasn't already)
    markDiscovered(tileId);

    // Navigate to appropriate screen based on destination type
    if (tileId === 'capital') {
      // Returning to capital keeps you on the global map
      // Player must click "Enter Capital" button to enter the city
      setScreen({ kind: 'global' });
    } else {
      // Moving to a wild tile opens the detailed Tile View
      setScreen({ kind: 'tile', tileId });
    }
  }

  /**
   * Return to the Global Map from any other screen.
   *
   * The party position is preserved - you return to wherever
   * you were on the map.
   */
  function backToGlobal(): void {
    setScreen({ kind: 'global' });
  }

  /**
   * Enter the Capital city view.
   *
   * This is only valid when the party is on the capital tile.
   * Opens the detailed Capital management screen.
   */
  function enterCapital(): void {
    if (partyTileId === 'capital') {
      setScreen({ kind: 'capital' });
    }
  }

  /**
   * Update the capital's custom name.
   *
   * Validates the new name and updates state if valid:
   * - Name must not be empty (after trimming whitespace)
   * - Name has a maximum length of 30 characters
   *
   * @param newName - The new name for the capital
   * @returns true if the name was updated, false if validation failed
   */
  function updateCapitalName(newName: string): boolean {
    const trimmedName = newName.trim();

    // Validation: Name must not be empty
    if (trimmedName.length === 0) {
      return false;
    }

    // Validation: Maximum length of 30 characters
    if (trimmedName.length > 30) {
      return false;
    }

    setCapitalName(trimmedName);
    return true;
  }

  // ==============================================
  // SCREEN RENDERING
  // Based on current screen state, render the appropriate view
  // ==============================================

  // Global Map View - the main overworld
  if (screen.kind === 'global') {
    return (
      <GlobalMapScreen
        tiles={tilesWithCapitalName}
        partyTileId={partyTileId}
        capitalName={capitalName}
        onAttemptMoveTo={attemptMoveTo}
        onEnterCapital={enterCapital}
        onUpdateCapitalName={updateCapitalName}
      />
    );
  }

  // Capital View - city management
  if (screen.kind === 'capital') {
    return (
      <CapitalViewScreen
        capitalName={capitalName}
        onUpdateCapitalName={updateCapitalName}
        onBack={backToGlobal}
      />
    );
  }

  // Tile View - detailed view of a wild tile
  // We need to find the tile data to pass to the component
  const tile = tilesById.get(screen.tileId);

  // Safety check - should never happen, but TypeScript likes it
  if (!tile) {
    return (
      <div style={{ padding: 16, color: 'white' }}>
        Error: Tile not found: {screen.tileId}
        <button onClick={backToGlobal} style={{ marginLeft: 16 }}>
          Back to Map
        </button>
      </div>
    );
  }

  return <TileViewScreen tile={tile} onBack={backToGlobal} />;
}
