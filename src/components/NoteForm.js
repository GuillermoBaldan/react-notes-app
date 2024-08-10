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
      <div className="input-field">
        <textarea
          id="note"
          className="materialize-textarea"
          value={note}
          onChange={handleChange}
          required
        />
        <label htmlFor="note" className={note ? "active" : ""}>
          {noteToEdit ? 'Edit Note' : 'New Note'}
        </label>
      </div>
      <button className="btn waves-effect waves-light" type="submit">
        {noteToEdit ? 'Update Note' : 'Add Note'}
        <i className="material-icons right">send</i>
      </button>
    </form>
  );
};

export default NoteForm;
