import React from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../../store/useStore';
import './Categories.css';

const CATEGORIES = [
  { name: 'Action', color: '#FF5209', image: '/images/action.png' },
  { name: 'Drama', color: '#D7A944', image: '/images/drama.png' },
  { name: 'Romance', color: '#148A08', image: '/images/romance.png' },
  { name: 'Thriller', color: '#84468D', image: '/images/thriller.png' },
  { name: 'Western', color: '#A04935', image: '/images/western.png' },
  { name: 'Horror', color: '#6B7AA1', image: '/images/horror.png' },
  { name: 'Fantasy', color: '#FF5209', image: '/images/fantasy.png' },
  { name: 'Music', color: '#E76E65', image: '/images/music.png' },
  { name: 'Fiction', color: '#6B7AA1', image: '/images/fiction.png' },
];

const Categories = () => {
  const navigate = useNavigate();
  const categories = useStore((state) => state.categories);
  const toggleCategory = useStore((state) => state.toggleCategory);
  const removeCategory = useStore((state) => state.removeCategory);
  const user = useStore((state) => state.user);

  React.useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleNext = () => {
    if (categories.length >= 3) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="categories-page">
      <div className="categories-left">
        <h2 className="green-logo">Super app</h2>
        <h1 className="categories-heading">
          Choose your
          <br />
          entertainment
          <br />
          category
        </h1>

        {categories.length > 0 && (
          <div className="selected-chips">
            {categories.map((cat) => (
              <span key={cat} className="chip">
                {cat}
                <button
                  className="chip-remove"
                  onClick={() => removeCategory(cat)}
                  aria-label={`Remove ${cat}`}
                >
                  ✕
                </button>
              </span>
            ))}
          </div>
        )}

        {categories.length < 3 && (
          <p className="validation-msg">
            <span className="warning-icon">⚠</span> Minimum 3 category required
          </p>
        )}
      </div>

      <div className="categories-right">
        <div className="categories-grid">
          {CATEGORIES.map((cat) => {
            const isSelected = categories.includes(cat.name);
            return (
              <div
                key={cat.name}
                className={`category-card ${isSelected ? 'selected' : ''}`}
                style={{ backgroundColor: cat.color }}
                onClick={() => toggleCategory(cat.name)}
                id={`cat-${cat.name.toLowerCase()}`}
              >
                <span className="category-name">{cat.name}</span>
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="category-image"
                />
              </div>
            );
          })}
        </div>

        <div className="categories-actions">
          <button
            className={`btn-next ${categories.length >= 3 ? '' : 'disabled'}`}
            onClick={handleNext}
            disabled={categories.length < 3}
            id="btn-next-page"
          >
            Next Page
          </button>
        </div>
      </div>
    </div>
  );
};

export default Categories;
