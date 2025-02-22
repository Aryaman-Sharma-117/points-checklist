import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import TaskList from '../../components/TaskList/TaskList';
import AddTaskForm from '../../components/AddTaskForm/AddTaskForm';
import MealLogs from '../../components/MealLogs/MealLogs';
import MealModal from '../../components/MealModal/MealModal';
import { fetchTasks, addTask } from '../../services/taskService';
import { fetchUserDetails, incrementMeals, fetchMealLogs } from '../../services/userService';
import { FaStar, FaUtensils } from 'react-icons/fa';
import { PiCowBold } from "react-icons/pi";
import { GiPenguin } from "react-icons/gi";
import { FaAnglesRight } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import './UserPage.css';

export default function UserPage() {
  const { userId } = useParams();
  const [tasks, setTasks] = useState([]);
  const [userDetails, setUserDetails] = useState({});
  const [mealLogs, setMealLogs] = useState([]);
  const [isMealModalOpen, setIsMealModalOpen] = useState(false);
  const [showMealLogs, setShowMealLogs] = useState(false); // State to control visibility of Meal Logs

  // Fetch tasks for the user
  const loadTasks = async () => {
    try {
      const data = await fetchTasks(userId);
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  // Fetch user details (total points and meals)
  const loadUserDetails = async () => {
    try {
      const data = await fetchUserDetails(userId);
      setUserDetails(data);
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  // Fetch meal logs for the user
  const loadMealLogs = async () => {
    try {
      const data = await fetchMealLogs(userId);
      setMealLogs(data);
    } catch (error) {
      console.error('Error fetching meal logs:', error);
    }
  };


  // Load tasks, user details, and meal logs on component mount
  useEffect(() => {
    loadTasks();
    loadUserDetails();
    loadMealLogs();
  }, [userId]);

  // Handle adding a new task
  const handleTaskAdded = async (newTask) => {
    try {
      const addedTask = await addTask(userId, newTask);
      setTasks((prevTasks) => [...prevTasks, addedTask]);
      await loadUserDetails(); // Re-fetch user details to update total points
    } catch (error) {
      console.error('Error adding task:', error);
      alert('Failed to add task');
    }
  };

  // Handle incrementing meals
  const handleIncrementMeals = async ({ logDate, comment }) => {
    try {
      const updatedUser = await incrementMeals(userId, logDate, comment);
      setUserDetails(updatedUser); // Update user details (meals count)
      setIsMealModalOpen(false); // Close the modal
      await loadMealLogs(); // Refresh meal logs
    } catch (error) {
      console.error('Error incrementing meals:', error);
      alert('Failed to increment meals');
    }
  };

  // Handle task updates (e.g., task completion or deletion)
  const handleTaskUpdated = async () => {
    await loadTasks(); // Refresh the task list
    await loadUserDetails(); // Re-fetch user details to update total points
  };

  // Toggle visibility of Meal Logs
  const toggleMealLogs = () => {
    setShowMealLogs(!showMealLogs); // Toggle the state
  };

  const disable = () => {
    if(userDetails.total_points - 5 * userDetails.meals < 5){
      return true;
    }
    return false
  }

  return (
    <div className="user-page-container">
      <nav className="user-page-nav">
        <Link to="/user/1" className="user-page-nav-link"><PiCowBold /> Monisha</Link>
        <span className="user-page-nav-separator">|</span>
        <Link to="/user/2" className="user-page-nav-link">Aryaman <GiPenguin /> </Link>
      </nav>
      <div className="user-page-content">
        <h1 className="user-page-name">{userId == 1 ? (<><PiCowBold /> Monisha's Tab</>) : (<><GiPenguin /> Aryaman's Tab</>)}</h1>
        <div className="user-page-stats">
          <p><FaStar className="user-page-stat-icon" /> Total Points: {userDetails.total_points || 0}</p>
          <p><FaUtensils className="user-page-stat-icon" /> Meals Redeemed: {userDetails.meals || 0}</p>
          <p><FaAnglesRight className="user-page-stat-icon" /> Remaining Points: {userDetails.total_points - 5 * userDetails.meals || 0}</p>
        </div>
        <button className="user-page-add-meal-button" onClick={() => setIsMealModalOpen(true)} disabled={disable()}>
          {disable() ? 'Not Enough Points to Redeem' : 'Redeem Meal'}
        </button>
  
        <h2 className="user-page-section-heading">Issues</h2>
        <AddTaskForm userId={userId} onTaskAdded={handleTaskAdded} />
        <TaskList tasks={tasks} userId={userId} onTaskUpdated={handleTaskUpdated} />
        <br/><br/>
        <div className="user-page-toggle-logs-container">
          <button className="user-page-toggle-logs-button" onClick={toggleMealLogs}>
            {showMealLogs ? 'Hide Previous Meals' : 'Show Previous Meals'}
          </button>
        </div>
        {showMealLogs && (
          <>
            <MealLogs mealLogs={mealLogs} />
          </>
        )}
  
        <MealModal
          isOpen={isMealModalOpen}
          onClose={() => setIsMealModalOpen(false)}
          onSubmit={handleIncrementMeals}
        />
      </div>
    </div>
  );
}