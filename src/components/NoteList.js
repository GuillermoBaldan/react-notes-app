// src/components/NoteList.js
import React from 'react';

const NoteList = ({ notes, onDelete, onEdit }) => {
  return (
    <div>
      <h2>Your Notes</h2>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {notes.map(note => (
          <li key={note.id} style={{ margin: '20px 0', border: '1px solid #ccc', padding: '10px' }}>
            <p>{note.content}</p>
            <button onClick={() => onEdit(note.id)}>Edit</button>
            <button onClick={() => onDelete(note.id)} style={{ marginLeft: '10px' }}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NoteList;
