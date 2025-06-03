require('dotenv').config();
const express = require('express');
const cors = require('cors');

const registerRoute = require('./routes/register');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/register', registerRoute);

const PORT = process.env.PORT || 5001; // <-- ให้ใช้ env PORT ก่อน

console.log('Starting app...');
console.log('PORT:', PORT);
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

app.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`);
});
