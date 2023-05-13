import 'mapbox-gl/dist/mapbox-gl.css';
import ReactMapGL, { FullscreenControl, Marker, NavigationControl, Popup } from 'react-map-gl';
import React, { useState } from 'react';
import { TopBar } from '../components/TopBar';
import { FetchData } from '../components/FetchData';

export const Map = () => {

  const [data, setData] = useState(null);

  const [darkMode, setDarkMode] = useState(true);

  /*Coordenates of the center of italy*/
  const [viewport, setViewport] = useState({
      latitude: 42.5098,
      longitude: 12.5148,
      zoom: 8
  });

  const [selectedPlane, setSelectedPlane] = useState(null);
  const [popupOpen, setPopupOpen] = useState(false);

  //const [angle, setAngle] = useState(null); --- Need more Info

  return (
    <div>
      <FetchData setData={setData} />
      console.log(data);
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
          {data?.map((airplane) => (
            <Marker
              key={airplane.icao24}
              latitude={airplane.latitude}
              longitude={airplane.longitude}
              /*rotation={setAngle(bearing({latitude: airplane.latitude, longitude: airplane.longitude}, destination))} --- Need more Info*/
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
              anchor="top"
            >
              <div className="popup-title">- Airplane Info -</div>
              <div className="popup-content">
                <p>
                  <strong>Flight Number:</strong> {selectedPlane.callsign}
                </p>
                <p>
                  <strong>Altitude:</strong> {selectedPlane.baroAltitude} ft
                </p>
                <p>
                  <strong>Longitude:</strong> {selectedPlane.longitude}
                </p>
                <p>
                  <strong>Latitude:</strong> {selectedPlane.latitude}
                </p>
              </div>
            </Popup>
          ) : null}

          <NavigationControl />
          <FullscreenControl />

        </ReactMapGL>
      </div>
    </div>
  );
};