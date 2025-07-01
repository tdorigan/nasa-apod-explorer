const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const marsRoutes = require('./routes/mars');
const apodRoutes = require('./routes/apod'); // ✅ new

const app = express();
app.use(cors({
  origin: ['http://localhost:3000', 'https://nasa-apod-explorer-green.vercel.app']
}));

app.use('/api/mars', marsRoutes);
app.use('/api/apod', apodRoutes); // ✅ new

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
