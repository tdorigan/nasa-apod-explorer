import React, { useEffect, useState } from 'react';

function MarsRoverPhotos() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const today = new Date().toISOString().split('T')[0];
  const storedDate = localStorage.getItem('mars_date') || today;
  const [date, setDate] = useState(storedDate);
  const [currentPage, setCurrentPage] = useState(1);
  const photosPerPage = 12;

  useEffect(() => {
    const fetchPhotos = async () => {
      setLoading(true);
      setError(null);
      setCurrentPage(1); // reset to first page on date change

      try {
        const apiBase = process.env.REACT_APP_API_URL;
        const res = await fetch(`${apiBase}/api/mars/photos?earth_date=${date}`);
        const data = await res.json();
        setPhotos(data.photos);
      } catch (err) {
        setError('Failed to load Mars Rover photos.');
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, [date]);

  const indexOfLast = currentPage * photosPerPage;
  const indexOfFirst = indexOfLast - photosPerPage;
  const currentPhotos = photos.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(photos.length / photosPerPage);

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goToPrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h1 style={{ marginBottom: '0.5rem' }}>📸 Mars Rover Image Viewer</h1>

      <p style={{ maxWidth: '700px', margin: '0 auto 1rem', fontSize: '1rem', color: '#555' }}>
        Explore raw images captured on the surface of Mars by NASA's Curiosity rover. Choose a date to see what the rover saw that day!
      </p>

      <h2>🚜 Mars Rover Photos – {date}</h2>

      <input
        type="date"
        value={date}
        onChange={(e) => {
          const newDate = e.target.value;
          setDate(newDate);
          localStorage.setItem('mars_date', newDate);
        }}
        style={{ marginBottom: '1rem' }}
      />

      {loading && <p>Loading photos...</p>}
      {error && <p>{error}</p>}

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
        {currentPhotos.map((photo) => (
          <div key={photo.id} style={{ flex: '1 0 200px' }}>
            <img
              src={photo.img_src}
              alt={photo.camera.full_name}
              style={{ width: '100%', borderRadius: '8px', cursor: 'zoom-in' }}
              onClick={() => setSelectedPhoto(photo)}
            />
            <p style={{ fontSize: '0.85rem' }}>{photo.camera.full_name}</p>
          </div>
        ))}
      </div>

      {!loading && photos.length === 0 && (
        <p style={{ marginTop: '1rem', color: 'gray' }}>
          🪐 No photos found for this date.
        </p>
      )}

      {/* Pagination Controls */}
      {photos.length > photosPerPage && (
        <div style={{ marginTop: '1rem', textAlign: 'center' }}>
          <button onClick={goToPrevPage} disabled={currentPage === 1}>
            ⬅️ Prev
          </button>
          <span style={{ margin: '0 1rem' }}>
            Page {currentPage} of {totalPages}
          </span>
          <button onClick={goToNextPage} disabled={currentPage === totalPages}>
            Next ➡️
          </button>
        </div>
      )}

      {selectedPhoto && (
        <div
          onClick={() => setSelectedPhoto(null)}
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
            src={selectedPhoto.img_src}
            alt="Mars Rover"
            style={{
              maxWidth: '90%',
              maxHeight: '90%',
              borderRadius: '10px',
              boxShadow: '0 0 20px rgba(255, 255, 255, 0.2)'
            }}
          />
        </div>
      )}
      
    </div>

  );
}

export default MarsRoverPhotos;
