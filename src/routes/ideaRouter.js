const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authMiddleware');
const Idea = require('../models/ideaModel');

// Create a new idea
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { title, description } = req.body;
    const userId = req.user.userId;

    const newIdea = new Idea({ title, description, createdBy: userId });
    await newIdea.save();

    res.status(201).json({ message: 'Idea created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while creating the idea' });
  }
});

// Update an idea
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { title, description } = req.body;
    const ideaId = req.params.id;
    const userId = req.user.userId;

    const idea = await Idea.findById(ideaId);

    if (!idea) {
      return res.status(404).json({ error: 'Idea not found' });
    }

    if (idea.createdBy.toString() !== userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    idea.title = title;
    idea.description = description;
    await idea.save();

    res.json({ message: 'Idea updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while updating the idea' });
  }
});

// Delete an idea
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const ideaId = req.params.id;
    const userId = req.user.userId;

    const idea = await Idea.findById(ideaId);

    if (!idea) {
      return res.status(404).json({ error: 'Idea not found' });
    }

    if (idea.createdBy.toString() !== userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    await idea.remove();

    res.json({ message: 'Idea deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting the idea' });
  }
});

module.exports = router;
