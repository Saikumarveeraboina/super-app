import React from 'react';
import './LetterAvatar.css';

const COLORS = [
  '#E74C3C', '#8E44AD', '#2980B9', '#16A085',
  '#F39C12', '#D35400', '#1ABC9C', '#C0392B',
  '#7D3C98', '#2E86C1', '#17A589', '#E67E22',
];

const LetterAvatar = ({ name = '', size = 90, className = '' }) => {
  const letter = name.charAt(0).toUpperCase() || '?';
  const colorIndex = name.length % COLORS.length;
  const bgColor = COLORS[colorIndex];

  return (
    <div
      className={`letter-avatar ${className}`}
      style={{
        width: size,
        height: size,
        backgroundColor: bgColor,
        fontSize: size * 0.44,
      }}
    >
      {letter}
    </div>
  );
};

export default LetterAvatar;
