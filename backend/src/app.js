const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const path = require('path');
const authRoutes = require('./routes/auth');
const projectRoutes = require('./routes/projects');

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use(helmet());

// mount routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/achievements', require('./routes/achievements'));
app.use('/api/applications', require('./routes/applications'));
app.use('/api/dashboard', require('./routes/dashboard'));

// serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// simple health check
app.get('/', (req, res) => {
  res.send({ message: 'Stackfolio API running' });
});

module.exports = app;
