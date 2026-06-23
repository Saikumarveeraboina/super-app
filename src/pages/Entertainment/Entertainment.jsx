import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../../store/useStore';
import { searchMovies, getMovieDetails } from '../../services/movieApi';
import MovieModal from '../../components/MovieModal/MovieModal';
import LetterAvatar from '../../components/LetterAvatar/LetterAvatar';
import './Entertainment.css';

const Entertainment = () => {
  const navigate = useNavigate();
  const user = useStore((state) => state.user);
  const categories = useStore((state) => state.categories);
  const [moviesByCategory, setMoviesByCategory] = useState({});
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }
    if (!categories || categories.length < 3) {
      navigate('/categories');
      return;
    }
  }, [user, categories, navigate]);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      const results = {};
      for (const category of categories) {
        const movies = await searchMovies(category);
        results[category] = movies.slice(0, 6);
      }
      setMoviesByCategory(results);
      setLoading(false);
    };

    if (categories.length > 0) {
      fetchMovies();
    }
  }, [categories]);

  const handleMovieClick = async (imdbID) => {
    const details = await getMovieDetails(imdbID);
    if (details) {
      setSelectedMovie(details);
    }
  };

  const closeModal = () => {
    setSelectedMovie(null);
  };

  return (
    <div className="entertainment-page">
      <div className="entertainment-container">
        <div className="entertainment-header">
          <h2 className="green-logo">Super app</h2>
          <LetterAvatar name={user?.name || ''} size={42} className="entertainment-avatar" />
        </div>

        <h3 className="entertainment-subtitle">
          Entertainment according to your choice
        </h3>

        {loading ? (
          <div className="entertainment-loading">
            <div className="loading-spinner"></div>
            <p>Loading movies...</p>
          </div>
        ) : (
          <div className="entertainment-sections">
            {categories.map((category) => (
              <div key={category} className="movie-section">
                <h4 className="section-title">{category}</h4>
                <div className="movie-row">
                  {moviesByCategory[category]?.map((movie) => (
                    <div
                      key={movie.imdbID}
                      className="movie-card"
                      onClick={() => handleMovieClick(movie.imdbID)}
                      id={`movie-${movie.imdbID}`}
                    >
                      <img
                        src={movie.Poster}
                        alt={movie.Title}
                        className="movie-poster"
                        onError={(e) => {
                          e.target.src = '/images/registration-bg.png';
                        }}
                      />
                      <div className="movie-card-overlay">
                        <span className="movie-card-title">{movie.Title}</span>
                      </div>
                    </div>
                  ))}
                  {(!moviesByCategory[category] ||
                    moviesByCategory[category].length === 0) && (
                    <p className="no-movies">No movies found for {category}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={closeModal} />
      )}
    </div>
  );
};

export default Entertainment;
