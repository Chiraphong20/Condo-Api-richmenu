require('dotenv').config();
const express = require('express');
const cors = require('cors');

const registerRoute = require('./routes/register');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/register', registerRoute);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`);
});
