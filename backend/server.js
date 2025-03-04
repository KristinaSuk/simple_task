require('dotenv').config();
const express = require('express');
const cors = require('cors');

// Import the Sequelize instance (to sync if needed)
const { sequelize } = require('./models'); // This is from models/index.js

// Import routes
const authRoutes = require('./routes/auth.routes');
const taskRoutes = require('./routes/task.routes');

const app = express();
app.use(cors());
app.use(express.json());


// Mount the routes
app.use('/auth', authRoutes);  // All routes start with /auth
app.use('/tasks', taskRoutes); // All task routes start with /tasks

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});











































































