// src/App.js
import React, { useState, useEffect } from 'react';
import NoteList from './components/NoteList';
import NoteForm from './components/NoteForm';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [noteToEdit, setNoteToEdit] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      fetch('http://localhost:4000/notes', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(res => res.json())
        .then(data => setNotes(data));
    }
  }, [isAuthenticated, token]);

  const handleSaveNote = (content) => {
    if (noteToEdit) {
      // Editar nota existente
      fetch(`http://localhost:4000/notes/${noteToEdit.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content }),
      })
        .then(res => res.json())
        .then(updatedNote => {
          setNotes(notes.map(note =>
            note.id === noteToEdit.id ? updatedNote : note
          ));
          setNoteToEdit(null);
        });
    } else {
      // Agregar nueva nota
      fetch('http://localhost:4000/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content }),
      })
        .then(res => res.json())
        .then(newNote => setNotes([...notes, newNote]));
    }
  };

  const handleDeleteNote = (id) => {
    fetch(`http://localhost:4000/notes/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(() => {
      setNotes(notes.filter(note => note.id !== id));
    });
  };

  const handleEditNote = (id) => {
    const note = notes.find(note => note.id === id);
    setNoteToEdit(note);
  };

  const handleLogin = (username, password) => {
    fetch('http://localhost:4000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
      .then(res => res.json())
      .then(data => {
        setToken(data.token);
        setIsAuthenticated(true);
      })
      .catch(() => alert('Login failed'));
  };

  const handleRegister = (username, password) => {
    fetch('http://localhost:4000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
      .then(() => handleLogin(username, password))
      .catch(() => alert('Registration failed'));
  };

  return (
    <div className="App">
      {isAuthenticated ? (
        <>
          <h1>Note Manager</h1>
          <NoteForm onSave={handleSaveNote} noteToEdit={noteToEdit} />
          <NoteList notes={notes} onDelete={handleDeleteNote} onEdit={handleEditNote} />
        </>
      ) : (
        <Login onLogin={handleLogin} onRegister={handleRegister} />
      )}
    </div>
  );
};

const Login = ({ onLogin, onRegister }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(username, password);
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
        <button type="button" onClick={() => onRegister(username, password)}>
          Register
        </button>
      </form>
    </div>
  );
};

export default App;
