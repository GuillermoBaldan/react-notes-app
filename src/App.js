// src/App.js
import React, { useState } from 'react';
import NoteList from './components/NoteList';
import NoteForm from './components/NoteForm';
import { v4 as uuidv4 } from 'uuid';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [noteToEdit, setNoteToEdit] = useState(null);

  const handleSaveNote = (content) => {
    if (noteToEdit) {
      setNotes(notes.map(note =>
        note.id === noteToEdit.id ? { ...note, content } : note
      ));
      setNoteToEdit(null);
    } else {
      const newNote = {
        id: uuidv4(),
        content
      };
      setNotes([...notes, newNote]);
    }
  };

  const handleDeleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const handleEditNote = (id) => {
    const note = notes.find(note => note.id === id);
    setNoteToEdit(note);
  };

  return (
    <div className="container">
      <h1 className="center-align">Note Manager</h1>
      <NoteForm onSave={handleSaveNote} noteToEdit={noteToEdit} />
      <NoteList notes={notes} onDelete={handleDeleteNote} onEdit={handleEditNote} />
    </div>
  );
};

export default App;
