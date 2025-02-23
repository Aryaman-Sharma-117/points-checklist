const API_URL = 'https://points-checklist.onrender.com/api';

// Fetch user details
export const fetchUserDetails = async (userId) => {
  try {
    const response = await fetch(`${API_URL}/users/${userId}/details`);
    if (!response.ok) throw new Error('Failed to fetch user details');
    return await response.json();
  } catch (error) {
    console.error('Error fetching user details:', error);
    throw error;
  }
};

// Increment meals and add a meal log
export const incrementMeals = async (userId, logDate, comment) => {
  try {
    const response = await fetch(`${API_URL}/users/${userId}/meals`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ logDate, comment }),
    });
    if (!response.ok) throw new Error('Failed to increment meals');
    return await response.json();
  } catch (error) {
    console.error('Error incrementing meals:', error);
    throw error;
  }
};

// Fetch meal logs for a user
export const fetchMealLogs = async (userId) => {
  try {
    const response = await fetch(`${API_URL}/users/${userId}/meal-logs`);
    if (!response.ok) throw new Error('Failed to fetch meal logs');
    return await response.json();
  } catch (error) {
    console.error('Error fetching meal logs:', error);
    throw error;
  }
};