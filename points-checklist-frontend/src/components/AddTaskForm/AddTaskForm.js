import React, { useState } from 'react';
import './AddTaskForm.css';

function AddTaskForm({ userId, onTaskAdded }) {
  const [name, setName] = useState('');
  const [weight, setWeight] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !weight) {
      alert('Sab bharo bhai');
      return;
    }

    if (isSubmitting) return; // Prevent duplicate submissions
    setIsSubmitting(true);

    try {
      await onTaskAdded({ name, weight: parseInt(weight) });
      setName('');
      setWeight('');
    } catch (error) {
      console.error('Error adding task:', error);
      alert('Failed to add task');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="add-task-form-container">
      <form className="add-task-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Issue name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="add-task-input"
        />
        <input
          type="number"
          placeholder="Points"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          className="add-task-input"
          min={1} // Minimum value
          max={5} // Maximum value
        />
        <button type="submit" disabled={isSubmitting} className="add-task-button">
          {isSubmitting ? 'Adding...' : 'Add Issue'}
        </button>
      </form>
    </div>
  );
}

export default AddTaskForm;