import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [apod, setApod] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState('');

  const fetchData = (date = '') => {
    setLoading(true);
    let url = 'https://nasa-apod-explorer-o7hp.onrender.com/api/apod';
    if (date) {
      url += `?date=${date}`;
    }

    console.log('Fetching:', url); // DEBUG LINE

    fetch(url)
      .then(res => res.json())
      .then(data => {
        setApod(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching APOD:', error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDateChange = (e) => {
    const date = e.target.value;
    setSelectedDate(date);
    fetchData(date);
  };

	if (loading || !apod) {
	  return (
		<div className="App">
		  <p>🚀 Fetching NASA’s space magic...</p>
		  <p style={{ color: 'gray', fontSize: '0.9rem' }}>
			If this is your first visit, the API may take up to a minute to wake up. Please be patient.
		  </p>
		</div>
	  );
	}

  return (
    <div className="App">
      <h1>{apod.title}</h1>
      
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '1rem' }}>
		  <label htmlFor="date">Select a date:</label>
		  <input
			id="date"
			type="date"
			value={selectedDate}
			onChange={handleDateChange}
			max={new Date().toISOString().split("T")[0]}
			style={{ marginTop: '0.3rem' }}
		  />
		</div>

      {apod.media_type === 'image' ? (
		  <img src={apod.url} alt={apod.title} />
		) : apod.media_type === 'video' ? (
		  <div style={{ marginTop: '1rem' }}>
			<iframe
			  title={apod.title}
			  src={apod.url}
			  frameBorder="0"
			  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
			  allowFullScreen
			  style={{ width: '100%', minHeight: '400px', borderRadius: '8px' }}
			/>
		  </div>
		) : (
		  <div style={{ marginTop: '1rem' }}>
			<p>🚫 This APOD does not contain a valid image or video.</p>
			<p>Try selecting a more recent date (after 1995).</p>
		  </div>
		)}


      <p>{apod.explanation}</p>
    </div>
  );
}

export default App;
