import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  fetchNotes, 
  createNote, 
  updateNote, 
  deleteNote,
  clearError,
  clearSuccess 
} from '../../store/notesSlice';
import NoteCard from './NoteCard';
import NoteModal from './NoteModal';
import Button from '../ui/Button';
import Loading from '../ui/Loading';

const NotesList = () => {
  const dispatch = useDispatch();
  const { notes, isLoading, error, successMessage, totalNotes } = useSelector((state) => state.notes);
  const { user } = useSelector((state) => state.auth);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  useEffect(() => {
    dispatch(fetchNotes());
  }, [dispatch]);

  useEffect(() => {
    if (successMessage) {
      setIsModalOpen(false);
      setEditingNote(null);
      setTimeout(() => {
        dispatch(clearSuccess());
      }, 3000);
    }
  }, [successMessage, dispatch]);

  const handleCreateNote = () => {
    setEditingNote(null);
    setIsModalOpen(true);
  };

  const handleEditNote = (note) => {
    setEditingNote(note);
    setIsModalOpen(true);
  };

  const handleSubmitNote = (formData) => {
    if (editingNote) {
      dispatch(updateNote({ id: editingNote._id, data: formData }));
    } else {
      dispatch(createNote(formData));
    }
  };

  const handleDeleteNote = (noteId) => {
    setDeleteConfirm(noteId);
  };

  const confirmDelete = () => {
    if (deleteConfirm) {
      dispatch(deleteNote(deleteConfirm));
      setDeleteConfirm(null);
    }
  };

  const cancelDelete = () => {
    setDeleteConfirm(null);
  };

  const canCreateNote = () => {
    if (user?.tenant?.subscription === 'pro') return true;
    return totalNotes < (user?.tenant?.maxNotes || 3);
  };

  const isAtLimit = user?.tenant?.subscription === 'free' && totalNotes >= (user?.tenant?.maxNotes || 3);

  if (isLoading && notes.length === 0) {
    return <Loading message="Loading your notes..." />;
  }

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="card-title">My Notes</h2>
              <p className="text-sm" style={{ color: '#6b7280', marginTop: '4px' }}>
                {totalNotes} of {user?.tenant?.subscription === 'pro' ? '∞' : user?.tenant?.maxNotes} notes
              </p>
            </div>
            <div>
              {!canCreateNote() && (
                <div className="alert alert-warning" style={{ marginBottom: '16px', marginRight: '16px' }}>
                  You've reached the note limit. 
                  {user?.role === 'admin' ? (
                    <span> Click "Upgrade to Pro" to create unlimited notes.</span>
                  ) : (
                    <span> Ask your admin to upgrade to Pro for unlimited notes.</span>
                  )}
                </div>
              )}
              <Button
                onClick={handleCreateNote}
                variant="primary"
                disabled={!canCreateNote()}
              >
                Create Note
              </Button>
            </div>
          </div>
        </div>

        {error && (
          <div className="alert alert-error">
            {error}
            <button 
              onClick={() => dispatch(clearError())} 
              style={{ float: 'right', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              ×
            </button>
          </div>
        )}

        {successMessage && (
          <div className="alert alert-success">
            {successMessage}
          </div>
        )}

        {notes.length === 0 ? (
          <div className="text-center" style={{ padding: '40px' }}>
            <p style={{ color: '#6b7280', marginBottom: '16px' }}>
              No notes yet. Create your first note to get started!
            </p>
            <Button
              onClick={handleCreateNote}
              variant="primary"
              disabled={!canCreateNote()}
            >
              Create Your First Note
            </Button>
          </div>
        ) : (
          <div className="notes-grid">
            {notes.map((note) => (
              <NoteCard
                key={note._id}
                note={note}
                onEdit={handleEditNote}
                onDelete={handleDeleteNote}
              />
            ))}
          </div>
        )}
      </div>

      <NoteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        note={editingNote}
        onSubmit={handleSubmitNote}
        isLoading={isLoading}
      />

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3 className="modal-title">Delete Note</h3>
            </div>
            <div>
              <p style={{ marginBottom: '20px' }}>
                Are you sure you want to delete this note? This action cannot be undone.
              </p>
              <div className="flex gap-2 justify-end">
                <Button onClick={cancelDelete} variant="outline">
                  Cancel
                </Button>
                <Button onClick={confirmDelete} variant="danger">
                  Delete
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotesList;