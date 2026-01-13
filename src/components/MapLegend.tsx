/**
 * MapLegend Component
 *
 * Displays the legend explaining the visual elements on the map.
 * Shows colors and symbols used for different tile types.
 */

import React from 'react';
import './MapLegend.css';

/**
 * MapLegend - Explains the visual elements on the map
 */
export function MapLegend(): React.ReactElement {
  return (
    <div className="map-legend">
      <h4 className="legend-title">Map Legend</h4>
      <div className="legend-items">
        <div className="legend-item">
          <span className="legend-color legend-capital"></span>
          <span>Capital</span>
        </div>
        <div className="legend-item">
          <span className="legend-color legend-greenbelt"></span>
          <span>Greenbelt</span>
        </div>
        <div className="legend-item">
          <span className="legend-color legend-pitax"></span>
          <span>Pitax</span>
        </div>
        <div className="legend-item">
          <span className="legend-color legend-brevoy"></span>
          <span>Brevoy</span>
        </div>
        <div className="legend-item">
          <span className="legend-color legend-tuskwater"></span>
          <span>Tuskwater Bay</span>
        </div>
        <div className="legend-item">
          <span className="legend-color legend-party"></span>
          <span>Your Party</span>
        </div>
      </div>
    </div>
  );
}
