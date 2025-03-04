// server/models/task.model.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Task = sequelize.define('Task', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      // This allows storing multi-line text from CSV
      type: DataTypes.TEXT,
      allowNull: true
    },
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    priority: {
      type: DataTypes.ENUM('Low', 'Medium', 'High'),
      defaultValue: 'Medium'
    },
    status: {
      type: DataTypes.ENUM('New', 'In Progress', 'Completed'),
      defaultValue: 'New'
    },
    dueDate: {
      // If your CSV might have a date in YYYY-MM-DD format, DATEONLY is fine
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    category: {
      type: DataTypes.STRING,
      allowNull: true
    }
  });

  return Task;
};