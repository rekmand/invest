const express = require('express');
const cors = require('cors');
const { getNifty50Data, getSensexData, getTop3MutualFunds } = require('../js/marketData');

const app = express();
app.use(cors());

app.get('/api/market', async (req, res) => {
  try {
    const [nifty, sensex, mutualFunds] = await Promise.all([
      getNifty50Data(true),
      getSensexData(true),
      getTop3MutualFunds(true)
    ]);
    res.json({ nifty, sensex, mutualFunds });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Market data API running on port ${PORT}`);
});
