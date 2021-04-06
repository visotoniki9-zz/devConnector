const express = require('express');

const server = express();

// Init Middleware
server.use(express.json({ extended: false }));

server.get('/', (req, res) => res.send('API Running'));

// Define Routes
server.use('/api/users', require('./routes/api/users'));
server.use('/api/auth', require('./routes/api/auth'));
server.use('/api/profile', require('./routes/api/profile'));
server.use('/api/posts', require('./routes/api/posts'));

module.exports = server;
