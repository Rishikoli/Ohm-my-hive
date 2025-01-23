import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import './USAMap.css';

const USAMap = ({ onStateSelect }) => {
  const mapRef = useRef();

  useEffect(() => {
    const width = window.innerWidth;
    const height = 600;

    const svg = d3.select(mapRef.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    const projection = d3.geoAlbersUsa()
      .scale(width)
      .translate([width / 2, height / 2]);

    const path = d3.geoPath().projection(projection);

    // Load US map data
    fetch('https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json')
      .then(response => response.json())
      .then(us => {
        svg.append('g')
          .selectAll('path')
          .data(topojson.feature(us, us.objects.states).features)
          .join('path')
          .attr('class', 'state')
          .attr('d', path)
          .on('click', (event, d) => {
            // Remove previous selection
            svg.selectAll('.state').classed('selected', false);
            // Add selected class to clicked state
            d3.select(event.target).classed('selected', true);
            // Call the callback with state data
            if (onStateSelect) {
              onStateSelect(d);
            }
          });

        svg.append('path')
          .datum(topojson.mesh(us, us.objects.states, (a, b) => a !== b))
          .attr('fill', 'none')
          .attr('stroke', 'white')
          .attr('stroke-width', '1')
          .attr('d', path);
      });

    // Cleanup
    return () => {
      d3.select(mapRef.current).selectAll('*').remove();
    };
  }, [onStateSelect]);

  return <div ref={mapRef} className="usa-map-container" />;
};

export default USAMap;
