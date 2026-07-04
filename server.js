require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.log('❌ Error', err));

// ✅ Flexible schema - accepts ANYTHING
const dataSchema = new mongoose.Schema({
  data: mongoose.Schema.Types.Mixed,
  timestamp: { type: Date, default: Date.now }
});
const Data = mongoose.model('Data', dataSchema);

// POST - Save anything from ESP32
app.post('/data', async (req, res) => {
  const newData = new Data({ data: req.body });
  await newData.save();
  res.json({ status: '✅ saved', data: newData });
});

// GET - Read everything
app.get('/data', async (req, res) => {
  const allData = await Data.find();
  res.json(allData);
});

app.listen(process.env.PORT || 3000, () => {
  console.log('🚀 Server running on port 3000');
});
