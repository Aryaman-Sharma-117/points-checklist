const pool = require('../config/db');

const UserModel = {
  getUserDetails: async (userId) => {
    const [user] = await pool.query('SELECT * FROM users WHERE id = ?', [userId]);
    return user[0];
  },

  incrementMeals: async (userId, logDate, comment) => {
    await pool.query('UPDATE users SET meals = meals + 1 WHERE id = ?', [userId]);
    const [result] = await pool.query(
      'INSERT INTO meal_logs (user_id, log_date, comment) VALUES (?, ?, ?)',
      [userId, logDate, comment]
    );
    return result.insertId;
  },

  getMealLogs: async (userId) => {
    const [logs] = await pool.query('SELECT * FROM meal_logs WHERE user_id = ? ORDER BY log_date DESC', [userId]);
    return logs;
  },
};

module.exports = UserModel;