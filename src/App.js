import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import NoteList from './components/NoteList';
import NoteForm from './components/NoteForm';
import Login from './components/Login';
import Register from './components/Register';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [notes, setNotes] = useState([]);  // Asegúrate de que notes está inicializado como un array vacío

  const handleRegister = (username, password) => {
    console.log('Registering', username, password);
    setIsAuthenticated(true); // Actualiza el estado de autenticación
  };

  return (
    <Router basename="/react-notes-app">
      <Routes>
        <Route path="/" element={isAuthenticated ? (
          <NoteManager notes={notes} />
        ) : (
          <Navigate to="/login" />
        )} />
        <Route path="/login" element={<Login onLogin={() => setIsAuthenticated(true)} />} />
        <Route path="/register" element={<Register onRegister={handleRegister} />} />
      </Routes>
    </Router>
  );
};

const NoteManager = ({ notes }) => (
  <>
    <h1>Note Manager</h1>
    <NoteForm />
    <NoteList notes={notes} />  {/* Pasa notes al componente NoteList */}
  </>
);

export default App;
