/**
 * HexMap Component
 *
 * This component renders the hexagonal grid for the Global Map view.
 * It's responsible for:
 * - Drawing all hex tiles with proper geometry and region-based colors
 * - Showing the party token at the current location
 * - Handling click events for tile selection
 *
 * Technical Details:
 * - Uses SVG for crisp, scalable graphics
 * - "Pointy-top" hex orientation (vertices at top and bottom)
 * - Axial coordinate system for hex math
 * - CSS classes for theming consistency
 * - All tiles are fully visible with their names displayed
 *
 * Hex Geometry Explanation:
 * We use pointy-top hexes where:
 * - Each hex has a vertex at the top (not a flat edge)
 * - The hex radius (size) is the distance from center to any vertex
 * - The six vertices are at angles: -30°, 30°, 90°, 150°, 210°, 270°
 *
 * See hex.ts for the coordinate system math.
 */

import React from 'react';
import type { GlobalTile } from '../game/types';
import { axialToPixel, hexPolygonPoints } from '../game/logic/hex';
import './HexMap.css';

/**
 * Props for the HexMap component.
 */
interface HexMapProps {
  /** Array of all tiles to render */
  tiles: GlobalTile[];

  /** ID of the tile where the party is currently located */
  partyTileId: string;

  /**
   * Callback fired when a tile is clicked.
   * The parent component decides what to do (validate movement, etc.)
   */
  onTileClick: (tileId: string) => void;
}

/**
 * Get the fill color for a tile based on its region.
 *
 * Color scheme:
 * - Capital: Gold color to show importance
 * - Greenbelt: Forest green
 * - Pitax: Brown (earthy, rival kingdom)
 * - Brevoy: Steel blue (nobility)
 * - Tuskwater Bay: Ocean blue (maritime)
 *
 * @param tile - The tile to get the color for
 * @returns CSS color value
 */
function getTileFillColor(tile: GlobalTile): string {
  if (tile.kind === 'capital') {
    // Capital is gold/yellow - the crown jewel
    return '#ffd700';
  }

  // Region-specific colors for all tiles
  const regionColors: Record<string, string> = {
    'Greenbelt': '#4a6741',      // Forest green
    'Pitax': '#6b4423',          // Brown (earthy)
    'Brevoy': '#3a5a7c',         // Steel blue
    'Tuskwater Bay': '#2a5a7a',  // Ocean blue
  };

  return regionColors[tile.region] ?? '#4a6741';
}

/**
 * Get the stroke (border) color for a tile.
 * Darker stroke helps tiles stand out from each other.
 */
function getTileStrokeColor(_tile: GlobalTile): string {
  return '#2c2c2c';    // Dark gray for all tiles
}

/**
 * Split a tile name into multiple lines for display.
 * Long names like "Tuskwater Bay SW" are split to fit in the hex.
 *
 * @param name - The tile name to split
 * @returns Array of lines to display
 */
function splitTileName(name: string): string[] {
  // Special handling for specific tile names
  if (name.includes('Tuskwater Bay')) {
    const parts = name.split('Tuskwater Bay');
    const suffix = parts[1]?.trim() || '';
    return suffix ? ['Tuskwater', 'Bay ' + suffix] : ['Tuskwater', 'Bay'];
  }

  if (name.includes('Greenbelt')) {
    const parts = name.split('Greenbelt');
    const suffix = parts[1]?.trim() || '';
    return suffix ? ['Greenbelt', suffix] : ['Greenbelt'];
  }

  // For shorter names or capital, return as single line
  if (name.length <= 12) {
    return [name];
  }

  // Try to split at space for other long names
  const words = name.split(' ');
  if (words.length >= 2) {
    const mid = Math.ceil(words.length / 2);
    return [
      words.slice(0, mid).join(' '),
      words.slice(mid).join(' '),
    ];
  }

  return [name];
}

/**
 * HexMap - Renders the hexagonal tile grid
 *
 * This component creates an SVG containing:
 * 1. A group for each tile (hexagon polygon + label)
 * 2. The party token (circle with text) on top
 *
 * The viewBox is calculated dynamically to fit all tiles with padding.
 */
export function HexMap({
  tiles,
  partyTileId,
  onTileClick,
}: HexMapProps): React.ReactElement {

  // Hex size (radius from center to vertex)
  // Larger size = bigger hexes, adjust as needed for your layout
  const size = 60;

  // Padding around the entire map
  const padding = 30;

  // Convert each tile's axial coordinates to pixel coordinates
  // This gives us the center point for each hex in screen space
  const tilesWithPixels = tiles.map((tile) => {
    const pixel = axialToPixel(tile.axial, size);
    return {
      ...tile,
      cx: pixel.x,   // Center X in pixels
      cy: pixel.y,   // Center Y in pixels
    };
  });

  // Calculate the bounding box to set up the SVG viewBox
  // This ensures all hexes are visible with proper padding
  const allX = tilesWithPixels.map((t) => t.cx);
  const allY = tilesWithPixels.map((t) => t.cy);

  const minX = Math.min(...allX) - size - padding;
  const maxX = Math.max(...allX) + size + padding;
  const minY = Math.min(...allY) - size - padding;
  const maxY = Math.max(...allY) + size + padding;

  const viewBoxWidth = maxX - minX;
  const viewBoxHeight = maxY - minY;

  // Find the party's current tile for rendering the token
  const partyTile = tilesWithPixels.find((t) => t.id === partyTileId);

  return (
    <svg
      className="hex-map"
      viewBox={`${minX} ${minY} ${viewBoxWidth} ${viewBoxHeight}`}
      role="img"
      aria-label="Kingdom map showing hexagonal territories"
      preserveAspectRatio="xMidYMid meet"
    >
      {/* ==============================================
          TILE RENDERING
          Each tile is a group containing the hex polygon and label
          ============================================== */}
      {tilesWithPixels.map((tile) => {
        const fillColor = getTileFillColor(tile);
        const strokeColor = getTileStrokeColor(tile);

        // Determine text color based on background
        // Light text on dark backgrounds, dark text on light backgrounds
        const textColor = tile.kind === 'capital' ? '#1a1a1a' : '#e8e8e8';

        return (
          <g
            key={tile.id}
            className="hex-tile"
            onClick={() => onTileClick(tile.id)}
            style={{ cursor: 'pointer' }}
            role="button"
            aria-label={`${tile.name}. Click to ${tile.id === partyTileId ? 'interact' : 'move here'}`}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                onTileClick(tile.id);
              }
            }}
          >
            {/* The hexagon polygon */}
            <polygon
              points={hexPolygonPoints({ x: tile.cx, y: tile.cy }, size)}
              fill={fillColor}
              stroke={strokeColor}
              strokeWidth={2}
              className="hex-polygon"
            />

            {/* Tile label - shows the tile name */}
            {splitTileName(tile.name).map((line, index, arr) => (
              <text
                key={index}
                x={tile.cx}
                y={tile.cy + (index - (arr.length - 1) / 2) * 12}
                textAnchor="middle"
                dominantBaseline="middle"
                className="hex-label"
                fill={textColor}
                fontSize="10"
                fontWeight={tile.kind === 'capital' ? 'bold' : 'normal'}
              >
                {line}
              </text>
            ))}

            {/* Visual indicator for capital tile */}
            {tile.kind === 'capital' && (
              <text
                x={tile.cx}
                y={tile.cy - 20}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#1a1a1a"
                fontSize="14"
                fontWeight="bold"
              >
                [Crown]
              </text>
            )}
          </g>
        );
      })}

      {/* ==============================================
          PARTY TOKEN
          Rendered on top of tiles so it's always visible
          ============================================== */}
      {partyTile && (
        <g className="party-token">
          {/* Outer glow effect for visibility */}
          <circle
            cx={partyTile.cx}
            cy={partyTile.cy + 22}
            r={16}
            fill="rgba(52, 152, 219, 0.3)"
            className="party-glow"
          />

          {/* Main party circle */}
          <circle
            cx={partyTile.cx}
            cy={partyTile.cy + 22}
            r={14}
            fill="#3498db"
            stroke="#2c3e50"
            strokeWidth={2}
            className="party-circle"
          />

          {/* Party label */}
          <text
            x={partyTile.cx}
            y={partyTile.cy + 22}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="#ffffff"
            fontSize="8"
            fontWeight="bold"
            className="party-label"
          >
            PARTY
          </text>
        </g>
      )}
    </svg>
  );
}
