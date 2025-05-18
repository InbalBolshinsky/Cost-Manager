const express = require('express');
const router = express.Router();

const team = [
  { first_name: 'Inbal', last_name: 'Bolshinsky' },
  { first_name: 'Yahel', last_name: 'Name' } 
];

router.get('/', (req, res) => {
  res.json(team);
});

module.exports = router;
