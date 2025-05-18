const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Middleware
app.use(express.json());

// MongoDB connection
mongoose.connect(mongoose.connect(process.env.MONGO_URI)
).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes (placeholders for now)
app.use('/api/add', require('./routes/add'));
app.use('/api/report', require('./routes/report'));
app.use('/api/users', require('./routes/user'));
app.use('/api/about', require('./routes/about'));

module.exports = app;
