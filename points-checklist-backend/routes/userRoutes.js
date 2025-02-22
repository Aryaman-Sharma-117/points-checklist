const express = require('express');
const UserController = require('../controllers/userController');

const router = express.Router();

router.get('/users/:userId/details', UserController.getUserDetails);
router.post('/users/:userId/meals', UserController.incrementMeals);
router.get('/users/:userId/meal-logs', UserController.getMealLogs);

module.exports = router;