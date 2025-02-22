import React, { useState } from 'react';
import './TaskCompletion.css';

function TaskCompletion({ isOpen, onClose, onSubmit }) {
  const [completionDate, setCompletionDate] = useState('');
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!completionDate) {
      alert('Please select a date');
      return;
    }
    onSubmit({ completionDate, comment });
    onClose();
  };

  if (!isOpen) return null; // Don't render if the modal is closed

  return (
    <div className="task-completion-modal-overlay">
      <div className="task-completion-modal">
        <h2 className="task-completion-modal-heading">Mark Issue as repeated</h2>
        <form className="task-completion-form" onSubmit={handleSubmit}>
          <label className="task-completion-form-label">
            Date:
            <input
              type="date"
              value={completionDate}
              onChange={(e) => setCompletionDate(e.target.value)}
              required
              className="task-completion-input"
            />
          </label>
          <label className="task-completion-form-label">
            Comment:
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="task-completion-textarea"
            />
          </label>
          <div className="task-completion-modal-buttons">
            <button type="submit" className="task-completion-submit-button">
              Submit
            </button>
            <button type="button" onClick={onClose} className="task-completion-cancel-button">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TaskCompletion;