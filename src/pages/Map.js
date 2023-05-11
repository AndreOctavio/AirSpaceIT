import 'mapbox-gl/dist/mapbox-gl.css';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import React, { useState } from 'react';
import { TopBar } from '../components/TopBar';

const data = [
  { id: 1, latitude: 41.9028, longitude: 12.4964}, // Rome
  { id: 2, latitude: 45.4408, longitude: 12.3155}, // Venice
  { id: 3, latitude: 43.7711, longitude: 11.2486}, // Florence
  { id: 4, latitude: 45.4642, longitude: 9.1900},  // Milan
  { id: 5, latitude: 40.8518, longitude: 14.2681}, // Naples
];

export const Map = () => {

  const [darkMode, setDarkMode] = useState(true);

  /*Coordenates of the center of italy*/
  const [viewport, setViewport] = useState({
      latitude: 42.5098,
      longitude: 12.5148,
      zoom: 8
  });

  const [selectedPlane, setSelectedPlane] = useState(null);
  const [popupOpen, setPopupOpen] = useState(false);

  return (
    <div>
      <TopBar darkMode={darkMode} setDarkMode={setDarkMode}/>
      
      <div className='map-wrapper'>
        <ReactMapGL
          {...viewport}
          mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
          onMove={evt => setViewport(evt.viewport)}
          mapStyle={darkMode ? 'mapbox://styles/mapbox/dark-v11' : 'mapbox://styles/mapbox/light-v10'}
          minZoom={5.5}
          maxZoom={10}
          maxBounds={[
            [5.116667, 34.95625287919582], // southwest coordinates
            [20.016667, 47.883333]         // northeast coordinates
          ]}                               // These have a little more than the limit of the italian airspace
        >
          {data.map((airplane) => (
            <Marker
              key={airplane.id}
              latitude={airplane.latitude}
              longitude={airplane.longitude}
            >
              <button 
                className="marker-btn"
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedPlane(airplane);
                  setPopupOpen(true);
                  e.stopPropagation();
                }}
              >
                <img 
                  src={selectedPlane === airplane && popupOpen ? 'blue_plane.png' : 'yellow_plane.png'}  
                  alt='Airplane Icon' 
                />
              </button>
            </Marker>
          ))}

          {selectedPlane ? (
            <Popup 
              latitude={selectedPlane.latitude}
              longitude={selectedPlane.longitude}
              onClose={() => {
                setSelectedPlane(null)
                setPopupOpen(false);
              }}
            >
              <div>
                Airplane
              </div>
            </Popup>
          ) : null}

        </ReactMapGL>
      </div>
    </div>
  );
};