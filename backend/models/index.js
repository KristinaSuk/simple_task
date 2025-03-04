const sequelize = require('../config/db');   // The Sequelize instance
const UserModel = require('./user.model');
const TaskModel = require('./task.model');

// Initialize models
const User = UserModel(sequelize);
const Task = TaskModel(sequelize);

// Define associations
User.hasMany(Task, { foreignKey: 'userId' });
Task.belongsTo(User, { foreignKey: 'userId' });

// Sync database 
sequelize.sync()
  .then(() => console.log("Database synced"))
  .catch(err => console.error("Sync error:", err));

module.exports = {
  sequelize,
  User,
  Task
};
