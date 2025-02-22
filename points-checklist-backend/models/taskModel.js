const pool = require('../config/db');

const TaskModel = {
  getTasksByUserId: async (userId) => {
    const [tasks] = await pool.query('SELECT * FROM tasks WHERE user_id = ?', [userId]);
    return tasks;
  },

  addTask: async (userId, name, weight) => {
    const [result] = await pool.query(
      'INSERT INTO tasks (user_id, name, weight, quantity) VALUES (?, ?, ?, 0)',
      [userId, name, weight]
    );
    return result.insertId;
  },

  incrementTaskQuantity: async (taskId, completionDate, comment, userId) => {
    await pool.query('UPDATE tasks SET quantity = quantity + 1 WHERE id = ?', [taskId]);
    const [result] = await pool.query(
      'INSERT INTO task_completions (task_id, completion_date, comment, user_id) VALUES (?, ?, ?, ?)',
      [taskId, completionDate, comment, userId]
    );
    return result.insertId;
  },

  deleteTask: async (taskId) => {
    await pool.query('DELETE FROM task_completions WHERE task_id = ?', [taskId]);
    await pool.query('DELETE FROM tasks WHERE id = ?', [taskId]);
  },

  recalculateTotalPoints: async (userId) => {
    await pool.query(
      'UPDATE users SET total_points = (SELECT COALESCE(SUM(weight * quantity), 0) FROM tasks WHERE user_id = ?) WHERE id = ?',
      [userId, userId]
    );
  },

  getTaskById: async (taskId) => {
    const [task] = await pool.query('SELECT * FROM tasks WHERE id = ?', [taskId]);
    return task[0];
  },

  getTaskCompletions: async (taskId) => {
    const [completions] = await pool.query('SELECT * FROM task_completions WHERE task_id = ?', [taskId]);
    return completions;
  },

  addTaskCompletion: async (taskId, completionDate, comment, userId) => {
    const [result] = await pool.query(
      'INSERT INTO task_completions (task_id, completion_date, comment, user_id) VALUES (?, ?, ?, ?)',
      [taskId, completionDate, comment, userId]
    );
    return result.insertId;
  },

  // Delete a task completion
  deleteTaskCompletion: async (completionId) => {
    await pool.query('DELETE FROM task_completions WHERE id = ?', [completionId]);
  },
};

module.exports = TaskModel;