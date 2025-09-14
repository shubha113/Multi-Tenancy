import React from 'react';
import Modal from '../ui/Modal';
import NoteForm from './NoteForm';

const NoteModal = ({ 
  isOpen, 
  onClose, 
  note, 
  onSubmit, 
  isLoading 
}) => {
  const title = note ? 'Edit Note' : 'Create New Note';

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <NoteForm
        note={note}
        onSubmit={onSubmit}
        onCancel={onClose}
        isLoading={isLoading}
      />
    </Modal>
  );
};

export default NoteModal;