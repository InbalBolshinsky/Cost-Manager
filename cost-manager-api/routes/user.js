const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Cost = require('../models/Cost');

router.get('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const user = await User.findOne({ id });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const totalCosts = await Cost.aggregate([
      { $match: { userid: id } },
      { $group: { _id: null, total: { $sum: '$sum' } } }
    ]);

    const total = totalCosts[0]?.total || 0;

    res.json({
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      total
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
