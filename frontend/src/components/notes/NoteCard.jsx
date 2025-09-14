import React from 'react';
import Button from '../ui/Button';

const NoteCard = ({ note, onEdit, onDelete }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const truncateContent = (content, maxLength = 150) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  return (
    <div className="note-card">
      <h3 className="note-title">{note.title}</h3>
      <p className="note-content">{truncateContent(note.content)}</p>
      <div className="note-meta">
        Created: {formatDate(note.createdAt)}
        {note.updatedAt !== note.createdAt && (
          <span> • Updated: {formatDate(note.updatedAt)}</span>
        )}
      </div>
      <div className="note-actions">
        <Button
          onClick={() => onEdit(note)}
          variant="primary"
          size="sm"
        >
          Edit
        </Button>
        <Button
          onClick={() => onDelete(note._id)}
          variant="danger"
          size="sm"
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default NoteCard;