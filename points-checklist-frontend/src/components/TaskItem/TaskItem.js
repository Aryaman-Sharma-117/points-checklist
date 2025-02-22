import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import TaskCompletion from '../TaskCompletion/TaskCompletion';
import { addTaskCompletion, deleteTask, fetchTaskDetails } from '../../services/taskService';
import './TaskItem.css';

function TaskItem({ task, userId, onTaskUpdated }) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(task);
  const [error, setError] = useState(null);

  const handleAddCompletion = async ({ completionDate, comment }) => {
    try {
      await addTaskCompletion(currentTask.id, completionDate, comment);

      // Fetch the updated task details
      const updatedTask = await fetchTaskDetails(currentTask.id);
      setCurrentTask(updatedTask); // Update the local task state

      onTaskUpdated(); // Notify the parent component to refresh the task list
    } catch (error) {
      console.error('Error adding task completion:', error);
      setError('Failed to mark task as done');
    }
  };

  const handleDeleteTask = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await deleteTask(task.id);
        onTaskUpdated(); // Notify the parent component to refresh the task list
      } catch (error) {
        console.error('Error deleting task:', error);
        setError('Failed to delete task');
      }
    }
  };

  return (
    <>
    <tr className="task-history-row">
      {error && (
        <td colSpan="4" className="task-history-error-message">
          {error}
        </td>
      )}
      <td className="task-history-name">{currentTask.name}</td>
      <td className="task-history-quantity">{currentTask.quantity || 0}</td>
      <td className="task-history-points">{currentTask.weight}</td>
      <td className="task-history-actions">
        <button className="task-history-add-button" onClick={() => setIsOpen(true)}>
          Add Occurance
        </button>
        <button className="task-history-delete-button" onClick={handleDeleteTask}>
          Delete Issue
        </button>
        <Link
          to={`/user/${userId}/tasks/${currentTask.id}/completions`}
          className="task-history-view-button"
        >
          View History
        </Link>
      </td>
    </tr>
    {isOpen && (
      <TaskCompletion
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSubmit={handleAddCompletion}
      />
    )
  }

  </>
  );
}

export default TaskItem;