const pool = require('../config/db');

const MealModel = {
  getMealLogs: async (userId) => {
    const [logs] = await pool.query('SELECT * FROM meal_logs WHERE user_id = ? ORDER BY log_date DESC', [userId]);
    return logs;
  },
};

module.exports = MealModel;