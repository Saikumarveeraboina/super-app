import React from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../../store/useStore';
import ProfileCard from './ProfileCard';
import WeatherCard from './WeatherCard';
import NewsCard from './NewsCard';
import NotesCard from './NotesCard';
import TimerCard from './TimerCard';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const user = useStore((state) => state.user);
  const categories = useStore((state) => state.categories);

  React.useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleBrowse = () => {
    if (categories.length >= 3) {
      navigate('/movies');
    } else {
      navigate('/categories');
    }
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-grid">
        {/* Row 1: Profile + News */}
        <div className="dashboard-col-left">
          <ProfileCard />
        </div>
        <div className="dashboard-col-right row1-news">
          <NewsCard />
        </div>

        {/* Row 2: Weather + Notes */}
        <div className="dashboard-col-left">
          <WeatherCard />
        </div>
        <div className="dashboard-col-right row2-notes">
          <NotesCard />
        </div>

        {/* Row 3: Timer + Browse */}
        <div className="dashboard-col-left">
          <TimerCard />
        </div>
        <div className="dashboard-col-right row3-browse">
          <div className="browse-wrapper">
            <button
              className="btn-browse"
              onClick={handleBrowse}
              id="btn-browse"
            >
              Browse
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
