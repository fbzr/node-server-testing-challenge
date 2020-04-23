const express = require('express');
const cors = require('cors');

server = express();

server.use(cors());
server.use(express.json());

server.get('/', (req, res) => res.send('api up and running'));
server.use('/api/users', require('./routes/api/users'));

module.exports = server;