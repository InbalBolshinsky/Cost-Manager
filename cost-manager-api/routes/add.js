const express = require('express');
const router = express.Router();
const Cost = require('../models/Cost');

// POST /api/add
router.post('/', async (req, res) => {
  try {
    const { userid, description, category, sum, date } = req.body;

    // Validate required fields
    if (!userid || !description || !category || !sum) {
      return res.status(400).json({ error: 'Missing required fields.' });
    }

    // Create a new Cost document
    const newCost = new Cost({
      userid,
      description,
      category,
      sum,
      date: date || Date.now()
    });

    const savedCost = await newCost.save();
    res.status(201).json(savedCost);

  } catch (err) {
    console.error('Error saving cost:', err);
    res.status(500).json({ error: 'Server error. Could not add cost item.' });
  }
});

module.exports = router;
