require('dotenv').config();
const express = require('express');
const cors = require('cors');
const registerRoute = require('./routes/register');

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Health Check route
app.get('/', (req, res) => {
  res.send('✅ Server is running!');
});

// ✅ Register API route
app.use('/api/register', registerRoute);

// ✅ ตรวจสอบ Environment Variables
console.log('🔎 ENV Loaded:', {
  CHANNEL_ACCESS_TOKEN: process.env.CHANNEL_ACCESS_TOKEN ? '✅' : '❌',
  RICH_MENU_RESIDENT: process.env.RICH_MENU_RESIDENT ? '✅' : '❌',
  RICH_MENU_TECHNICIAN: process.env.RICH_MENU_TECHNICIAN ? '✅' : '❌',
});

// ✅ Catch unhandled errors
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

const PORT = process.env.PORT || 5001;
console.log('Starting app...');
console.log('PORT:', PORT);

app.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`);
});
