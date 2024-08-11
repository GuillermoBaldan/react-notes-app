import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import NoteList from './components/NoteList';
import NoteForm from './components/NoteForm';
import Login from './components/Login';
import Register from './components/Register';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [noteToEdit, setNoteToEdit] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState('');

  const handleEditNote = (noteId) => {
    const note = notes.find(n => n.id === noteId);
    setNoteToEdit(note);
  };

  const handleSaveNote = (content) => {
    if (noteToEdit) {
      // Lógica para actualizar una nota existente
      setNotes(notes.map(note =>
        note.id === noteToEdit.id ? { ...note, content } : note
      ));
      setNoteToEdit(null);  // Resetear después de la edición
    } else {
      // Lógica para agregar una nueva nota
      const newNote = { id: Date.now(), content };
      setNotes([...notes, newNote]);
    }
  };

  return (
    <Router basename="/react-notes-app">  {/* Añadir el basename aquí */}
      <Routes>
        <Route path="/" element={isAuthenticated ? (
          <NoteManager
            notes={notes}
            onSaveNote={handleSaveNote}
            onEditNote={handleEditNote}
            noteToEdit={noteToEdit}
          />
        ) : (
          <Navigate to="/login" />
        )} />
        <Route path="/login" element={<Login onLogin={() => setIsAuthenticated(true)} />} />
        <Route path="/register" element={<Register onRegister={() => setIsAuthenticated(true)} />} />
      </Routes>
    </Router>
  );
};

const NoteManager = ({ notes, onSaveNote, onEditNote, noteToEdit }) => (
  <>
    <h1>Note Manager</h1>
    <NoteForm onSave={onSaveNote} noteToEdit={noteToEdit} />
    <NoteList notes={notes} onEdit={onEditNote} />
  </>
);

export default App;
