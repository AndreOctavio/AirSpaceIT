import React from 'react';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { Map } from './pages/Map';

function App() {

  return (
    <div className="App">
      <Router> 
        <Routes>
          <Route path="/" element={<Map />}/>
          <Route path="*" element={<h1> Error - Page not Found </h1>}/>
        </Routes>
      </Router>
    </div> 
  );
}

export default App;
