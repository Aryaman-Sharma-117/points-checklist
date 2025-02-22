const API_URL = 'http://localhost:5100/api';

// Fetch tasks for a specific user
export const fetchTasks = async (userId) => {
  try {
    const response = await fetch(`${API_URL}/users/${userId}/tasks`);
    if (!response.ok) throw new Error('Failed to fetch tasks');
    return await response.json();
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
};

// Add a new task for a specific user
export const addTask = async (userId, task) => {
  try {
    const response = await fetch(`${API_URL}/users/${userId}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task),
    });
    if (!response.ok) throw new Error('Failed to add task');
    return await response.json();
  } catch (error) {
    console.error('Error adding task:', error);
    throw error;
  }
};

// Fetch completions for a specific task
export const fetchTaskCompletions = async (taskId) => {
  try {
    const response = await fetch(`${API_URL}/tasks/${taskId}/completions`);
    if (!response.ok) throw new Error('Failed to fetch task completions');
    return await response.json();
  } catch (error) {
    console.error('Error fetching task completions:', error);
    throw error;
  }
};

// Add a completion for a specific task
export const addTaskCompletion = async (taskId, completionDate, comment) => {
  try {
    const response = await fetch(`${API_URL}/tasks/${taskId}/completions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completionDate, comment }),
    });
    if (!response.ok) throw new Error('Failed to add task completion');
    return await response.json();
  } catch (error) {
    console.error('Error adding task completion:', error);
    throw error;
  }
};

// Delete a task completion
export const deleteTaskCompletion = async (completionId) => {
  try {
    const response = await fetch(`${API_URL}/task-completions/${completionId}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete task completion');
    return await response.json();
  } catch (error) {
    console.error('Error deleting task completion:', error);
    throw error;
  }
};

// Delete a task
export const deleteTask = async (taskId) => {
  try {
    const response = await fetch(`${API_URL}/tasks/${taskId}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete task');
    return await response.json();
  } catch (error) {
    console.error('Error deleting task:', error);
    throw error;
  }
};

// Fetch details for a specific task
export const fetchTaskDetails = async (taskId) => {
  try {
    const response = await fetch(`${API_URL}/tasks/${taskId}`);
    if (!response.ok) throw new Error('Failed to fetch task details');
    return await response.json();
  } catch (error) {
    console.error('Error fetching task details:', error);
    throw error;
  }
};

