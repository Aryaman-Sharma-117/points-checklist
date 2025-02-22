import React, { useEffect, useState } from 'react';
import TaskItem from '../TaskItem/TaskItem';
import { fetchTasks } from '../../services/taskService';
import './TaskList.css';

export default function TaskList({ userId, onTaskUpdated }) {
  const [tasks, setTasks] = useState([]);

  const loadTasks = async () => {
    try {
      const data = await fetchTasks(userId);
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    loadTasks();
  }, [userId]);

  // Refresh the task list when a task is updated or deleted
  useEffect(() => {
    if (onTaskUpdated) {
      loadTasks();
    }
  }, [onTaskUpdated]);

  return (
    <div className="task-list-container">
    <table className="task-list-table">
      <thead>
        <tr>
          <th>Issue</th>
          <th>Occurances</th>
          <th>Points</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              userId={userId}
              onTaskUpdated={onTaskUpdated} // Pass onTaskUpdated to TaskItem
            />
          ))
        ) : (
          <tr>
            <td colSpan="4" className="task-list-empty-message">
              No tasks found
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
  );
} 