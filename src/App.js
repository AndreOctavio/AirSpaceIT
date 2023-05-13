import React from 'react';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { Map } from './pages/Map';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function App() {

  const client = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <div className="App">
      <QueryClientProvider client={client}>
        <Router> 
          <Routes>
            <Route path="/" element={<Map />}/>
            <Route path="*" element={<h1> Error - Page not Found </h1>}/>
          </Routes>
        </Router>
      </QueryClientProvider>
    </div> 
  );
}

export default App;
