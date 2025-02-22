import React from 'react';
import'./MealLogs.css';


function MealLogs({ mealLogs }) {
  return (
    <div className="meal-logs-container">
      <h2 className="meal-logs-heading">Previous Meals Redeemed</h2>
      {mealLogs.length > 0 ? (
        <table className="meal-logs-table">
          <thead className="meal-logs-table-header">
            <tr>
              <th>Date</th>
              <th>Comment</th>
            </tr>
          </thead>
          <tbody className="meal-logs-table-body">
            {mealLogs.map((log) => (
              <tr key={log.id} className="meal-log-row">
                <td>{log.log_date.split('T')[0]}</td> {/* Extract yyyy-mm-dd */}
                <td>{log.comment || 'No comment'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="meal-logs-empty-message">No previous meals found.</p>
      )}
    </div>
  );
}

export default MealLogs;