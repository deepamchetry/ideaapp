const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authMiddleware');
const Idea = require('../models/ideaModel');

// Get all ideas (admin-only)
router.get('/ideas', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;

    // Check if the user is an admin
    if (userId !== 'admin') {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    const ideas = await Idea.find();

    res.json(ideas);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching ideas' });
  }
});

module.exports = router;
