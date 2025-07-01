import React, { useState, useEffect } from 'react';
import ApodViewer from './components/ApodViewer';
import MarsRoverPhotos from './components/MarsRoverPhotos';
import './App.css';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.className = darkMode ? 'dark' : '';
  }, [darkMode]);

  return (
    <div className={`App ${darkMode ? 'dark' : ''}`}>
      <ApodViewer darkMode={darkMode} setDarkMode={setDarkMode} />
      <hr style={{ margin: '2rem 0' }} />
      <MarsRoverPhotos />
    </div>
  );
}

export default App;
