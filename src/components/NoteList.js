import React from 'react';

const NoteList = ({ notes, onEdit }) => {
  return (
    <ul>
      {notes.map(note => (
        <li key={note.id}>
          <p>{note.content}</p>
          <button onClick={() => onEdit(note.id)}>Edit</button>
        </li>
      ))}
    </ul>
  );
};

export default NoteList;
