import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {fetchTaskCompletions, addTaskCompletion, deleteTaskCompletion, fetchTaskDetails } from '../../services/taskService';
import TaskCompletion from '../../components/TaskCompletion/TaskCompletion';
import { useNavigate } from 'react-router-dom';
import './TaskHistory.css';

function TaskHistoryPage() {
  const { userId, taskId } = useParams(); // Get userId and taskId from the URL
  const [completions, setCompletions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [task, setTask] = useState({});
  const navigate = useNavigate();

  // Fetch task completions
  useEffect(() => {
    const loadCompletions = async () => {
      try {
        const curr = await fetchTaskDetails(taskId);
        const data = await fetchTaskCompletions(taskId);
        setTask(curr);
        setCompletions(data);
      } catch (error) {
        console.error('Error fetching task completions:', error);
      }
    };
    loadCompletions();
  }, [taskId]);

  // Add a task completion
  const handleAddCompletion = async ({ completionDate, comment }) => {
    try {
      const newCompletion = await addTaskCompletion(taskId, completionDate, comment);
      setCompletions([...completions, newCompletion]);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error adding task completion:', error);
      alert('Failed to add task completion');
    }
  };

  // Delete a task completion
  const handleDeleteCompletion = async (completionId) => {
    if (window.confirm('Are you sure you want to delete this completion?')) {
      try {
        await deleteTaskCompletion(completionId);
        setCompletions(completions.filter(completion => completion.id !== completionId));
      } catch (error) {
        console.error('Error deleting task completion:', error);
        alert('Failed to delete task completion');
      }
    }
  };

  return (
    <div className="task-completion-history-container">
      <h1 className="task-completion-history-heading">Issue History</h1>
      <h1 className="task-completion-history-heading">{task.name}</h1>
      <div className="task-completion-history-buttons">
        <button className="task-completion-history-add-button" onClick={() => setIsModalOpen(true)}>
          Add Entry
        </button>
        <button className="task-completion-history-go-back-button" onClick={() => navigate(-1)}>
          Go Back
        </button>
      </div>
      {completions.length > 0 ? (
        <table className="task-completion-history-table">
          <thead className="task-completion-history-table-header">
            <tr>
              <th>Date</th>
              <th>Comment</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="task-completion-history-table-body">
            {completions.map((completion) => (
              <tr key={completion.id} className="task-completion-history-row">
                <td>{completion.completion_date.split('T')[0]}</td> {/* Extract yyyy-mm-dd */}
                <td>{completion.comment || 'No comment'}</td>
                <td>
                  <button
                    className="task-completion-history-delete-button"
                    onClick={() => handleDeleteCompletion(completion.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="task-completion-history-empty-message">No completions found for this task.</p>
      )}
      <TaskCompletion
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddCompletion}
      />
    </div>
  );
}

export default TaskHistoryPage;