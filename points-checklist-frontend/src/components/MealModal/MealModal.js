import React, { useState } from 'react';
import './MealModal.css';

function MealModal({ isOpen, onClose, onSubmit }) {
  const [logDate, setLogDate] = useState('');
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!logDate) {
      alert('Please select a date');
      return;
    }
    onSubmit({ logDate, comment });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="add-meal-modal-overlay">
      <div className="add-meal-modal">
        <h2 className="add-meal-modal-heading">Redeem Meal</h2>
        <form className="add-meal-form" onSubmit={handleSubmit}>
          <label className="add-meal-form-label">
            Date:
            <input
              type="date"
              value={logDate}
              onChange={(e) => setLogDate(e.target.value)}
              required
              className="add-meal-input"
            />
          </label>
          <label className="add-meal-form-label">
            Comment:
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="add-meal-textarea"
            />
          </label>
          <div className="add-meal-modal-buttons">
            <button type="submit" className="add-meal-submit-button">
              Submit
            </button>
            <button type="button" onClick={onClose} className="add-meal-cancel-button">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default MealModal;