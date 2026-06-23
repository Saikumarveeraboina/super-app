import React from 'react';
import './MovieModal.css';

const MovieModal = ({ movie, onClose }) => {
  if (!movie) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        <div className="modal-body">
          <div className="modal-poster">
            <img
              src={movie.Poster !== 'N/A' ? movie.Poster : '/images/avatar.png'}
              alt={movie.Title}
            />
          </div>
          <div className="modal-info">
            <h2 className="modal-title">{movie.Title}</h2>
            <div className="modal-meta">
              <span className="modal-year">{movie.Year}</span>
              <span className="modal-rating">⭐ {movie.imdbRating || 'N/A'}</span>
            </div>
            <div className="modal-detail">
              <span className="modal-label">Genre:</span>
              <span>{movie.Genre || 'N/A'}</span>
            </div>
            <div className="modal-detail">
              <span className="modal-label">Actors:</span>
              <span>{movie.Actors || 'N/A'}</span>
            </div>
            <div className="modal-detail">
              <span className="modal-label">Director:</span>
              <span>{movie.Director || 'N/A'}</span>
            </div>
            <div className="modal-plot">
              <span className="modal-label">Plot:</span>
              <p>{movie.Plot || 'No plot available.'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;
