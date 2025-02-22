const pool = require('../config/db');
const TaskModel = require('../models/taskModel');

const TaskController = {
  getTasks: async (req, res) => {
    try {
      const tasks = await TaskModel.getTasksByUserId(req.params.userId);
      res.json(tasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  addTask: async (req, res) => {
    const { name, weight } = req.body;
    if (!name || !weight) {
      return res.status(400).json({ error: 'Name and weight are required' });
    }

    try {
      const taskId = await TaskModel.addTask(req.params.userId, name, weight);
      await TaskModel.recalculateTotalPoints(req.params.userId);
      res.status(201).json({ id: taskId, user_id: req.params.userId, name, weight, quantity: 0 });
    } catch (error) {
      console.error('Error adding task:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  incrementTaskQuantity: async (req, res) => {
    const { completionDate, comment } = req.body;
    const { taskId } = req.params;

    if (!completionDate) {
      return res.status(400).json({ error: 'Completion date is required' });
    }

    try {
      const [task] = await pool.query('SELECT user_id FROM tasks WHERE id = ?', [taskId]);
      const userId = task[0].user_id;

      await TaskModel.incrementTaskQuantity(taskId, completionDate, comment, userId);
      await TaskModel.recalculateTotalPoints(userId); // Recalculate points
      res.json({ message: 'Task completion added successfully' });
    } catch (error) {
      console.error('Error incrementing task quantity:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  deleteTask: async (req, res) => {
    try {
      const [task] = await pool.query('SELECT user_id FROM tasks WHERE id = ?', [req.params.taskId]);
      await TaskModel.deleteTask(req.params.taskId);
      await TaskModel.recalculateTotalPoints(task[0].user_id);
      res.json({ message: 'Task deleted successfully' });
    } catch (error) {
      console.error('Error deleting task:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  getTaskDetails: async (req, res) => {
    try {
      const task = await TaskModel.getTaskById(req.params.taskId);
      if (!task) {
        return res.status(404).json({ error: 'Task not found' });
      }
      res.json(task);
    } catch (error) {
      console.error('Error fetching task details:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  getTaskCompletions: async (req, res) => {
    try {
      const taskId = req.params.taskId;
      const completions = await TaskModel.getTaskCompletions(taskId);
      res.json(completions);
    } catch (error) {
      console.error('Error fetching task completions:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  addTaskCompletion: async (req, res) => {
    const { completionDate, comment } = req.body;
    const { taskId } = req.params;

    if (!completionDate) {
      return res.status(400).json({ error: 'Completion date is required' });
    }

    try {
      const [task] = await pool.query('SELECT user_id FROM tasks WHERE id = ?', [taskId]);
      const userId = task[0].user_id;

      // Increment the task quantity
      await pool.query('UPDATE tasks SET quantity = quantity + 1 WHERE id = ?', [taskId]);

      // Add the task completion
      const completionId = await TaskModel.addTaskCompletion(taskId, completionDate, comment, userId);

      // Recalculate total points for the user
      await TaskModel.recalculateTotalPoints(userId);

      res.json({ id: completionId, task_id: taskId, completion_date: completionDate, comment });
    } catch (error) {
      console.error('Error adding task completion:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  // Delete a task completion
  deleteTaskCompletion: async (req, res) => {
    const { completionId } = req.params;

    try {
      // Fetch the task ID and user ID associated with the completion
      const [completion] = await pool.query('SELECT task_id, user_id FROM task_completions WHERE id = ?', [completionId]);
      const taskId = completion[0].task_id;
      const userId = completion[0].user_id;

      // Delete the task completion
      await TaskModel.deleteTaskCompletion(completionId);

      // Decrement the task quantity
      await pool.query('UPDATE tasks SET quantity = quantity - 1 WHERE id = ?', [taskId]);

      // Recalculate total points for the user
      await TaskModel.recalculateTotalPoints(userId);

      res.json({ message: 'Task completion deleted successfully' });
    } catch (error) {
      console.error('Error deleting task completion:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

};

module.exports = TaskController;