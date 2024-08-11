import React, { useState, useEffect } from 'react';

const NoteForm = ({ onSave, noteToEdit }) => {
  const [content, setContent] = useState('');

  useEffect(() => {
    if (noteToEdit) {
      setContent(noteToEdit.content);
    }
  }, [noteToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(content);
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your note here"
        required
      />
      <button type="submit">
        {noteToEdit ? 'Update Note' : 'Add Note'}
      </button>
    </form>
  );
};

export default NoteForm;
