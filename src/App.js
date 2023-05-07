import React, { useState } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import './App.css';
import 'mapbox-gl/dist/mapbox-gl.css';

const data = [
  { id: 1, latitude: 41.9028, longitude: 12.4964 }, // Rome
  { id: 2, latitude: 45.4408, longitude: 12.3155 }, // Venice
  { id: 3, latitude: 43.7711, longitude: 11.2486 }, // Florence
  { id: 4, latitude: 45.4642, longitude: 9.1900 },  // Milan
  { id: 5, latitude: 40.8518, longitude: 14.2681 }, // Naples
];

function App() {
  const [viewport, setViewport] = useState({
    latitude: 42.5098,
    longitude: 12.5148,
    zoom: 6
  });
  const [selectedPlane, setSelectedPlane] = useState(null);

  return (
    <div>
      <div className='map-wrapper'>
        <ReactMapGL
          {...viewport}
          mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
          onMove={evt => setViewport(evt.viewport)}
          mapStyle='mapbox://styles/mapbox/dark-v11'
        >
          {data.map((airplane) => (
            <Marker
              key={airplane.id}
              latitude={airplane.latitude}
              longitude={airplane.longitude}
            >
              <button className="marker-btn">
                <img src='yellow_plane.png' alt='Airplane Icon' />
              </button>
            </Marker>
          ))}
        </ReactMapGL>
      </div>
    </div>
  );
}

export default App;
