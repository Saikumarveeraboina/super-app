import React, { useState, useEffect, useRef } from 'react';
import { getTopHeadlines } from '../../services/newsApi';
import './NewsCard.css';

const NewsCard = () => {
  const [articles, setArticles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    const fetchNews = async () => {
      const data = await getTopHeadlines();
      if (data && data.length > 0) {
        setArticles(data);
      }
    };
    fetchNews();
  }, []);

  useEffect(() => {
    if (articles.length > 1) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % articles.length);
      }, 2000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [articles]);

  if (articles.length === 0) {
    return (
      <div className="news-card" id="news-card">
        <div className="news-loading">Loading news...</div>
      </div>
    );
  }

  const article = articles[currentIndex];
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    return `${month}-${day}-${year} · ${formattedHours.toString().padStart(2, '0')}:${minutes} ${ampm}`;
  };

  return (
    <div className="news-card" id="news-card">
      <div className="news-image-wrapper">
        <img
          src={article.urlToImage}
          alt={article.title}
          className="news-image"
          onError={(e) => {
            e.target.src = '/images/registration-bg.png';
          }}
        />
        <div className="news-image-overlay">
          <h3 className="news-title">{article.title}</h3>
          <span className="news-date">{formatDate(article.publishedAt)}</span>
        </div>
      </div>
      <div className="news-body">
        <p className="news-description">{article.description}</p>
      </div>
      <div className="news-dots">
        {articles.map((_, idx) => (
          <span
            key={idx}
            className={`news-dot ${idx === currentIndex ? 'active' : ''}`}
          />
        ))}
      </div>
    </div>
  );
};

export default NewsCard;
