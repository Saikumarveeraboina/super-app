import React from 'react';
import useStore from '../../store/useStore';
import LetterAvatar from '../../components/LetterAvatar/LetterAvatar';
import './ProfileCard.css';

const ProfileCard = () => {
  const user = useStore((state) => state.user);
  const categories = useStore((state) => state.categories);

  if (!user) return null;

  return (
    <div className="profile-card" id="profile-card">
      <div className="profile-content">
        <LetterAvatar name={user.name} size={90} />
        <div className="profile-info">
          <h3 className="profile-name">{user.name}</h3>
          <p className="profile-email">{user.email}</p>
          <p className="profile-username">{user.username}</p>
          <div className="profile-categories">
            {categories.map((cat) => (
              <span key={cat} className="profile-pill">
                {cat}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
