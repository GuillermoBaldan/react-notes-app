import React from 'react';

const NoteList = ({ notes }) => {
  if (!notes || notes.length === 0) {
    return <p>No notes available</p>;
  }

  return (
    <ul>
      {notes.map(note => (
        <li key={note.id}>
          {note.content}
        </li>
      ))}
    </ul>
  );
};

export default NoteList;
