import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import UserPage from './pages/UserPage/UserPage';
import TaskHistoryPage from './pages/TaskHistory/TaskHistoryPage';
import Login from './pages/LoginPage/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/login" element={<Login onLogin={setIsAuthenticated} />} />
          <Route
            path="/user/:userId"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <UserPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/:userId/tasks/:taskId/completions"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <TaskHistoryPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;