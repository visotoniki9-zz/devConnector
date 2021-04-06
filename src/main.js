const connectDB = require('./db');
const server = require('./server');

require('dotenv').config();

// Connect Database
connectDB();
// Get port
const PORT = process.env.PORT || 3000;
// Init Server
server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
