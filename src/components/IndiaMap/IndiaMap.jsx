import React, { useState } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup
} from "react-simple-maps";
import { scaleQuantile } from 'd3-scale';
import indiaMap from '../../data/maps/india.json';
import './IndiaMap.css';
import BeeTrail from '../BeeTrail';

const stateData = {
  "Andhra Pradesh": { energyDemand: 40000, energyConsumption: 38000, renewableShare: 38, peakLoad: 35000 },
  "Arunachal Pradesh": { energyDemand: 15000, energyConsumption: 14000, renewableShare: 45, peakLoad: 12000 },
  "Assam": { energyDemand: 28000, energyConsumption: 26000, renewableShare: 20, peakLoad: 24000 },
  "Bihar": { energyDemand: 32000, energyConsumption: 30000, renewableShare: 20, peakLoad: 28000 },
  "Chhattisgarh": { energyDemand: 33000, energyConsumption: 31000, renewableShare: 25, peakLoad: 28000 },
  "Delhi": { energyDemand: 30000, energyConsumption: 28000, renewableShare: 15, peakLoad: 26000 },
  "Goa": { energyDemand: 15000, energyConsumption: 14000, renewableShare: 30, peakLoad: 12000 },
  "Gujarat": { energyDemand: 38000, energyConsumption: 36000, renewableShare: 30, peakLoad: 32000 },
  "Haryana": { energyDemand: 35000, energyConsumption: 33000, renewableShare: 28, peakLoad: 30000 },
  "Himachal Pradesh": { energyDemand: 22000, energyConsumption: 20000, renewableShare: 40, peakLoad: 18000 },
  "Jammu and Kashmir": { energyDemand: 25000, energyConsumption: 23000, renewableShare: 35, peakLoad: 21000 },
  "Jharkhand": { energyDemand: 31000, energyConsumption: 29000, renewableShare: 22, peakLoad: 27000 },
  "Karnataka": { energyDemand: 35000, energyConsumption: 33000, renewableShare: 35, peakLoad: 30000 },
  "Kerala": { energyDemand: 30000, energyConsumption: 28000, renewableShare: 32, peakLoad: 26000 },
  "Madhya Pradesh": { energyDemand: 36000, energyConsumption: 34000, renewableShare: 28, peakLoad: 31000 },
  "Maharashtra": { energyDemand: 45000, energyConsumption: 42000, renewableShare: 25, peakLoad: 38000 },
  "Manipur": { energyDemand: 16000, energyConsumption: 15000, renewableShare: 30, peakLoad: 13000 },
  "Meghalaya": { energyDemand: 20000, energyConsumption: 18000, renewableShare: 25, peakLoad: 16000 },
  "Mizoram": { energyDemand: 14000, energyConsumption: 13000, renewableShare: 35, peakLoad: 11000 },
  "Nagaland": { energyDemand: 15000, energyConsumption: 14000, renewableShare: 30, peakLoad: 12000 },
  "Odisha": { energyDemand: 34000, energyConsumption: 32000, renewableShare: 30, peakLoad: 29000 },
  "Punjab": { energyDemand: 33000, energyConsumption: 31000, renewableShare: 25, peakLoad: 28000 },
  "Rajasthan": { energyDemand: 39000, energyConsumption: 37000, renewableShare: 45, peakLoad: 34000 },
  "Sikkim": { energyDemand: 12000, energyConsumption: 11000, renewableShare: 40, peakLoad: 10000 },
  "Tamil Nadu": { energyDemand: 42000, energyConsumption: 40000, renewableShare: 40, peakLoad: 36000 },
  "Telangana": { energyDemand: 37000, energyConsumption: 35000, renewableShare: 35, peakLoad: 32000 },
  "Tripura": { energyDemand: 17000, energyConsumption: 16000, renewableShare: 25, peakLoad: 14000 },
  "Uttar Pradesh": { energyDemand: 48000, energyConsumption: 45000, renewableShare: 22, peakLoad: 42000 },
  "Uttarakhand": { energyDemand: 25000, energyConsumption: 23000, renewableShare: 35, peakLoad: 21000 },
  "West Bengal": { energyDemand: 41000, energyConsumption: 39000, renewableShare: 28, peakLoad: 36000 },
  // Union Territories
  "Andaman and Nicobar Islands": { energyDemand: 8000, energyConsumption: 7000, renewableShare: 20, peakLoad: 6000 },
  "Chandigarh": { energyDemand: 10000, energyConsumption: 9000, renewableShare: 15, peakLoad: 8000 },
  "Dadra and Nagar Haveli": { energyDemand: 9000, energyConsumption: 8000, renewableShare: 18, peakLoad: 7000 },
  "Daman and Diu": { energyDemand: 8500, energyConsumption: 7500, renewableShare: 20, peakLoad: 6500 },
  "Lakshadweep": { energyDemand: 5000, energyConsumption: 4500, renewableShare: 25, peakLoad: 4000 },
  "Puducherry": { energyDemand: 11000, energyConsumption: 10000, renewableShare: 22, peakLoad: 9000 }
};

const IndiaMap = ({ onStateSelect, selectedMetric = 'energyDemand' }) => {
  const [selectedState, setSelectedState] = useState(null);
  const [tooltip, setTooltip] = useState({ show: false, content: '', x: 0, y: 0 });

  const colorScale = scaleQuantile()
    .domain(Object.values(stateData).map(d => d[selectedMetric]))
    .range([
      "#ffedea",
      "#ffcec5",
      "#ffad9f",
      "#ff8a75",
      "#ff5533",
      "#e2492d",
      "#be3d26",
      "#9a311f",
      "#782618"
    ]);

  const handleStateClick = (geo) => {
    const stateName = geo.properties.name;
    setSelectedState(stateName);
    if (onStateSelect && stateData[stateName]) {
      onStateSelect(stateName, stateData[stateName]);
    }
  };

  return (
    <div className="india-map-container">
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 770,
          center: [78.9629, 18.5937]
        }}
        width={500}
        height={500}
      >
        <ZoomableGroup
          minZoom={0.5}
          maxZoom={1}
          zoom={1}
          center={[78.9629, 22.5937]}
        >
          <Geographies geography={indiaMap}>
            {({ geographies }) =>
              geographies.map(geo => {
                const stateName = geo.properties.name;
                const stateInfo = stateData[stateName];
                return (
                  <Geography
                    key={geo.id}
                    geography={geo}
                    fill={
                      stateName === "Uttarakhand" ? "#FF5733" :
                      stateName === "Odisha" ? "#33FF57" :
                      stateInfo ? colorScale(stateInfo[selectedMetric]) : "#EEE"
                    }
                    stroke="#FFFFFF"
                    strokeWidth={0.5}
                    style={{
                      default: {
                        outline: "none"
                      },
                      hover: {
                        fill: stateName === "uttaranchal" || stateName === "Odisha" ? "#FFC300" : "#F53",
                        outline: "none",
                        cursor: "pointer"
                      },
                      pressed: {
                        outline: "none"
                      }
                    }}
                    onMouseEnter={(evt) => {
                      const { x, y } = evt.target.getBoundingClientRect();
                      setTooltip({
                        show: true,
                        content: `${stateName}${stateInfo ? `: ${stateInfo[selectedMetric].toLocaleString()} MW` : ''}`,
                        x: x,
                        y: y
                      });
                    }}
                    onMouseLeave={() => {
                      setTooltip({ show: false, content: '', x: 0, y: 0 });
                    }}
                    onClick={() => handleStateClick(geo)}
                  />
                );
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
      {tooltip.show && (
        <div
          className="tooltip"
          style={{
            left: tooltip.x,
            top: tooltip.y
          }}
        >
          {tooltip.content}
        </div>
      )}
      {selectedState && stateData[selectedState] && (
        <div className="state-info">
          <h3>{selectedState}</h3>
          <div className="state-metrics">
            <div className="metric">
              <label>Energy Demand:</label>
              <span>{stateData[selectedState].energyDemand.toLocaleString()} MW</span>
            </div>
            <div className="metric">
              <label>Energy Consumption:</label>
              <span>{stateData[selectedState].energyConsumption.toLocaleString()} MW</span>
            </div>
            <div className="metric">
              <label>Renewable Share:</label>
              <span>{stateData[selectedState].renewableShare}%</span>
            </div>
            <div className="metric">
              <label>Peak Load:</label>
              <span>{stateData[selectedState].peakLoad.toLocaleString()} MW</span>
            </div>
            <div className="active-node">
              <div className={`node-status ${stateData[selectedState].energyDemand > stateData[selectedState].energyConsumption ? 'node-active' : 'node-inactive'}`}></div>
              <span>Node Status: {stateData[selectedState].energyDemand > stateData[selectedState].energyConsumption ? 'Active' : 'Inactive'}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IndiaMap;
