import Switch from 'react-switch';

export const TopBar = (props) => {
    
    return (
        <div className="map-top_bar">
          <div className="app-name">AirSpace IT</div>
          <img src="Flag_of_Italy.svg" alt="Italian Flag" className="header-flag"/>
          <div className="header-switch">
            <Switch 
              onChange={() => {props.setDarkMode(!props.darkMode)}} 
              checked={props.darkMode} 
              checkedIcon={<span style={{ fontSize: 18 }}>🌙</span>}
              uncheckedIcon={<span style={{ fontSize: 19 }}>🔆</span>}
              onColor="#303030"
              offColor='#DCDCDC'
            />
          </div>
        </div>
    );
}; 