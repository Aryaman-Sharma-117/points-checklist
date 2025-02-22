const express = require('express');
const TaskController = require('../controllers/taskController');

const router = express.Router();

router.get('/users/:userId/tasks', TaskController.getTasks);
router.post('/users/:userId/tasks', TaskController.addTask);
router.post('/tasks/:taskId/completions', TaskController.addTaskCompletion); // Add this line
router.delete('/task-completions/:completionId', TaskController.deleteTaskCompletion); // Add this line
router.get('/tasks/:taskId/completions', TaskController.getTaskCompletions);
router.delete('/tasks/:taskId', TaskController.deleteTask);
router.get('/tasks/:taskId', TaskController.getTaskDetails);

module.exports = router;