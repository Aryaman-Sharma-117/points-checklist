const UserModel = require('../models/userModel');

const UserController = {
  getUserDetails: async (req, res) => {
    try {
      const user = await UserModel.getUserDetails(req.params.userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      console.error('Error fetching user details:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  incrementMeals: async (req, res) => {
    const { logDate, comment } = req.body;
    if (!logDate) {
      return res.status(400).json({ error: 'Log date is required' });
    }

    try {
      await UserModel.incrementMeals(req.params.userId, logDate, comment);
      const user = await UserModel.getUserDetails(req.params.userId);
      res.status(201).json(user);
    } catch (error) {
      console.error('Error incrementing meals:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  getMealLogs: async (req, res) => {
    try {
      const logs = await UserModel.getMealLogs(req.params.userId);
      res.json(logs);
    } catch (error) {
      console.error('Error fetching meal logs:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};

module.exports = UserController;