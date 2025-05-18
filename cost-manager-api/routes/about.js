const express = require('express');
const router = express.Router();

// Replace with your real team names
const team = [
  { first_name: 'Inbal', last_name: 'Bolshinsky' },
  { first_name: 'Teammate', last_name: 'Name' } // Add/remove as needed
];

router.get('/', (req, res) => {
  res.json(team);
});

module.exports = router;
