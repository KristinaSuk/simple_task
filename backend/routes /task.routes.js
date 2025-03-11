const express = require('express');
const router = express.Router();
const fs = require('fs');
const multer = require('multer');
const csvParser = require('csv-parser');
const { Op } = require('sequelize');
const { Task } = require('../models');    // from index.js
const authenticateToken = require('../middleware/authMiddleware');

// Setup multer for CSV
const upload = multer({ dest: 'uploads/' });

// Create
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { title, description, priority, status, dueDate, category } = req.body;
    if (!title) {
      return res.status(400).json({ error: "Task title required" });
    }
    const newTask = await Task.create({
      title,
      description,
      priority: priority || 'Medium',
      status: status || 'New',
      dueDate,
      category,
      userId: req.userId
    });
    return res.status(201).json(newTask);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Could not create task" });
  }
});

// Read (search, filter)
router.get('/', authenticateToken, async (req, res) => {
  try {
    const { search, priority, status, category } = req.query;
    const whereClause = { userId: req.userId };

    if (search) {
      whereClause.title = { [Op.iLike]: `%${search}%` };
    }
    if (priority) whereClause.priority = priority;
    if (status) whereClause.status = status;
    if (category) whereClause.category = category;

    const tasks = await Task.findAll({ where: whereClause });
    return res.json(tasks);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Could not fetch tasks" });
  }
});

// Update
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Task.update(req.body, {
      where: { id, userId: req.userId }
    });
    if (!updated) {
      return res.status(404).json({ error: "Task not found or not yours" });
    }
    return res.json({ message: "Task updated" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Could not update task" });
  }
});

// Delete
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Task.destroy({
      where: { id, userId: req.userId }
    });
    if (!deleted) {
      return res.status(404).json({ error: "Task not found" });
    }
    return res.json({ message: "Task deleted" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Could not delete task" });
  }
});

// Import CSV
router.post('/import', authenticateToken, upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const results = [];
  fs.createReadStream(req.file.path)
    .pipe(csvParser({
      headers: ['title', 'description', 'priority', 'status', 'dueDate', 'category'],
      skipLines: 1,
      separator: ',',
      mapHeaders: ({ header }) => header.replace('\ufeff','').trim(),
    }))
    .on('data', (row) => {
      console.log('Parsed row:', row);
      results.push(row);
    })
    .on('end', async () => {
      console.log('All parsed rows:', results);
      try {
        const tasksToCreate = results.map(r => ({
          title: r.title || 'Untitled',
          description: r.description || '',
          priority: r.priority || 'Medium',
          status: r.status || 'New',
          dueDate: r.dueDate || null,
          category: r.category || null,
          userId: req.userId
        }));

        await Task.bulkCreate(tasksToCreate);
        fs.unlinkSync(req.file.path);

        return res.json({ message: `Imported ${tasksToCreate.length} tasks.` });
      } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Error importing tasks" });
      }
    })
    .on('error', (err) => {
      console.error('CSV Parse Error:', err);
      fs.unlinkSync(req.file.path);
      return res.status(500).json({ error: "Error reading CSV" });
    });
});

module.exports = router;