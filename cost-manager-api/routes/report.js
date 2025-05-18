const express = require('express');
const router = express.Router();
const Cost = require('../models/Cost');

router.get('/', async (req, res) => {
  try {
    const { id, month, year } = req.query;

    if (!id || !month || !year) {
      return res.status(400).json({ error: 'Missing id, month, or year.' });
    }

    const userId = parseInt(id);
    const monthInt = parseInt(month) - 1; 
    const yearInt = parseInt(year);

    const start = new Date(yearInt, monthInt, 1);
    const end = new Date(yearInt, monthInt + 1, 1);

    const costs = await Cost.find({
      userid: userId,
      date: { $gte: start, $lt: end }
    });

    const grouped = {
      food: [],
      health: [],
      housing: [],
      sport: [],
      education: []
    };

    for (const cost of costs) {
      grouped[cost.category].push({
        sum: cost.sum,
        description: cost.description,
        day: new Date(cost.date).getDate()
      });
    }

    const formatted = {
      userid: userId,
      year: yearInt,
      month: monthInt + 1,
      costs: Object.entries(grouped).map(([category, items]) => ({
        [category]: items
      }))
    };

    res.json(formatted);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
