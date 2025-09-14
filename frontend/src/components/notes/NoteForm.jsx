import React, { useState, useEffect } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';

const NoteForm = ({ note, onSubmit, onCancel, isLoading }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: ''
  });
  
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    if (note) {
      setFormData({
        title: note.title || '',
        content: note.content || ''
      });
    }
  }, [note]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear validation error when user starts typing
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.title.trim()) {
      errors.title = 'Title is required';
    } else if (formData.title.trim().length > 100) {
      errors.title = 'Title cannot exceed 100 characters';
    }
    
    if (!formData.content.trim()) {
      errors.content = 'Content is required';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        label="Title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        error={validationErrors.title}
        placeholder="Enter note title"
        maxLength={100}
      />
      
      <div className="form-group">
        <label className="form-label">Content</label>
        <textarea
          name="content"
          value={formData.content}
          onChange={handleChange}
          className="form-textarea"
          placeholder="Enter note content"
          rows={6}
        />
        {validationErrors.content && (
          <div className="form-error">
            {validationErrors.content}
          </div>
        )}
      </div>
      
      <div className="flex gap-2 justify-end">
        <Button
          type="button"
          onClick={onCancel}
          variant="outline"
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="primary"
          disabled={isLoading}
        >
          {isLoading ? 'Saving...' : (note ? 'Update' : 'Create')} Note
        </Button>
      </div>
    </form>
  );
};

export default NoteForm;