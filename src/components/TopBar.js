import Switch from 'react-switch';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const TopBar = (props) => {

  const handleInputChange = (event) => {
    props.setInputValue(event.target.value);
  }

  const handleSearch = () => {
    props.setSearch(true);
  }
    
  return (
      <div className="map-top_bar">
        <div className="app-name">AirSpace IT</div>
        <img src="Flag_of_Italy.svg" alt="Italian Flag" className="header-flag"/>
        <input 
          type="text" 
          placeholder="Search Airplane" 
          className="search-input" 
          style={{ 
            backgroundColor: props.darkMode ? "#303030" : "#DCDCDC", 
            color: props.darkMode ? "white" : "black" 
          }} 
          onChange={handleInputChange}
        />
        <button className="search-button" onClick={handleSearch} disabled={!props.inputValue}>
          <FontAwesomeIcon icon={faSearch} className="fa-search" />
        </button>
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