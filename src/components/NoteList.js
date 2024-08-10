// src/components/NoteList.js
import React from 'react';

const NoteList = ({ notes, onDelete, onEdit }) => {
  return (
    <div>
      <h2>Your Notes</h2>
      <ul className="collection">
        {notes.map(note => (
          <li key={note.id} className="collection-item">
            <p>{note.content}</p>
            <button
              className="btn-small waves-effect waves-light"
              onClick={() => onEdit(note.id)}
              style={{ marginRight: '10px' }}
            >
              <i className="material-icons">edit</i>
            </button>
            <button
              className="btn-small red waves-effect waves-light"
              onClick={() => onDelete(note.id)}
            >
              <i className="material-icons">delete</i>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NoteList;
