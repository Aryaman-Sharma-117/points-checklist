const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path'); // Add this line
const taskRoutes = require('./routes/taskRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 5100; // Use environment variable for port

// Middleware
app.use(cors());
app.use(bodyParser.json());

// API Routes
app.use('/api', taskRoutes);
app.use('/api', userRoutes);


// Set the static folder
app.use(express.static(path.join(__dirname, '../points-checklist-frontend/build')));

// Handle React routing, return all requests to React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../points-checklist-frontend/build', 'index.html'));
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});