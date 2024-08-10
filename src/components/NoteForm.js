// src/components/NoteForm.js
import React, { useState, useEffect } from 'react';

const NoteForm = ({ onSave, noteToEdit }) => {
  const [note, setNote] = useState(noteToEdit ? noteToEdit.content : '');

  useEffect(() => {
    if (noteToEdit) {
      setNote(noteToEdit.content);
    }
  }, [noteToEdit]);

  const handleChange = (e) => {
    setNote(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(note);  // Envía la nota al componente padre
    setNote('');  // Limpia el formulario después de guardar
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea value={note} onChange={handleChange} required />
      <button type="submit">{noteToEdit ? 'Update Note' : 'Add Note'}</button>
    </form>
  );
};

export default NoteForm;
