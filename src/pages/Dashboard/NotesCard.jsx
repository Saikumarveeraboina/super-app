import React, { useRef, useEffect } from 'react';
import useStore from '../../store/useStore';
import './NotesCard.css';

const NotesCard = () => {
  const notes = useStore((state) => state.notes);
  const setNotes = useStore((state) => state.setNotes);
  const textareaRef = useRef(null);

  const handleChange = (e) => {
    setNotes(e.target.value);
  };

  return (
    <div className="notes-card" id="notes-card">
      <h3 className="notes-title">All notes</h3>
      <textarea
        ref={textareaRef}
        className="notes-textarea"
        value={notes}
        onChange={handleChange}
        placeholder="Start typing your notes here..."
        id="notes-textarea"
      />
    </div>
  );
};

export default NotesCard;
