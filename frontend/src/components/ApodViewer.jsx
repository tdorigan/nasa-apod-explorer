import React, { useEffect, useState } from 'react';

function ApodViewer({ darkMode, setDarkMode }) {
  const [apod, setApod] = useState(null);
  const [loading, setLoading] = useState(true);
  const today = new Date().toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = useState(today);
  const [showModal, setShowModal] = useState(false);

  const fetchData = (date = '') => {
    setLoading(true);
    let url = `${process.env.REACT_APP_API_URL}/api/apod`;
    if (date) url += `?date=${date}`;

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
    fetchData(selectedDate);
  }, []);

  const handleDateChange = (e) => {
    const date = e.target.value;
    setSelectedDate(date);
    fetchData(date);
  };

  if (loading || !apod) {
    return (
      <>
        <p>🚀 Fetching NASA’s space magic...</p>
        <p style={{ color: 'gray', fontSize: '0.9rem' }}>
          If this is your first visit, the API may take up to a minute to wake up. Please be patient.
        </p>
      </>
    );
  }

  return (
    <>
      <button
        onClick={() => setDarkMode(!darkMode)}
        style={{
          position: 'absolute',
          top: '1rem',
          right: '1rem',
          padding: '0.5rem 1rem',
          fontSize: '0.9rem',
          borderRadius: '5px',
          border: 'none',
          cursor: 'pointer',
          backgroundColor: darkMode ? '#444' : '#ddd',
          color: darkMode ? '#fff' : '#000'
        }}
      >
        {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
      </button>

      <h1 style={{ marginBottom: '0.5rem' }}>🌌 Astronomy Picture of the Day</h1>

      <p style={{ maxWidth: '700px', margin: '0 auto 1rem', fontSize: '1rem', color: '#555' }}>
        Discover the universe! Each day NASA shares a stunning image or video of space, along with a brief explanation written by a professional astronomer.
      </p>

      <h2>{apod.title}</h2>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '1rem' }}>
        <label htmlFor="date">Select a date:</label>
        <input
          id="date"
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
          min="1995-06-16"
          max={new Date().toISOString().split("T")[0]}
          style={{ marginTop: '0.3rem' }}
        />
      </div>

      {apod.media_type === 'image' ? (
        <img
          src={apod.url}
          alt={apod.title}
          onClick={() => setShowModal(true)}
          style={{ cursor: 'pointer' }}
        />
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
        <p>🚫 This APOD does not contain a valid image or video.</p>
      )}

      {apod.copyright && (
        <p style={{ fontStyle: 'italic', fontSize: '0.9rem', color: '#666', marginTop: '0.5rem' }}>
          © {apod.copyright}
        </p>
      )}

      <p>{apod.explanation}</p>

      {showModal && apod.hdurl && (
        <div
          onClick={() => setShowModal(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999,
            cursor: 'zoom-out'
          }}
        >
          <img
            src={apod.hdurl}
            alt="HD APOD"
            style={{
              maxWidth: '90%',
              maxHeight: '90%',
              borderRadius: '10px',
              boxShadow: '0 0 20px rgba(255, 255, 255, 0.2)'
            }}
          />
        </div>
      )}
    </>
  );
}

export default ApodViewer;
