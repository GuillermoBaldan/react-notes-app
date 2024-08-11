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

  // Agrega funciones de manejo de notas aquí...

  return (
    <Router>
      <Routes>
        <Route path="/" element={isAuthenticated ? <NoteManager /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register onRegister={handleRegister} />} />
      </Routes>
    </Router>
  );
};

const NoteManager = ({ notes, onSaveNote, onDeleteNote, onEditNote }) => (
  <>
    <h1>Note Manager</h1>
    <NoteForm onSave={onSaveNote} noteToEdit={noteToEdit} />
    <NoteList notes={notes} onDelete={onDeleteNote} onEdit={onEditNote} />
  </>
);

export default App;
