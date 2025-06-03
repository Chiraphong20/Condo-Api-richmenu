const express = require('express');
const cors = require('cors');
const app = express();
const registerRoute = require('./routes/register');

app.use(cors());
app.use(express.json());

app.use('/api/register', registerRoute);

app.listen(5001, () => {
  console.log('🚀 Backend running on http://localhost:5001');
});
