const axios = require("axios");
const cheerio = require("cheerio");

// Function 1: Extract NIFTY 50 from NSE India
async function getNifty50Data(returnData = false) {
  try {
    console.log("Fetching NIFTY 50 data from NSE India...");
    const res = await axios.get("https://www.nseindia.com/api/equity-stockIndices?index=NIFTY%2050", {
      headers: {
        "User-Agent": "Mozilla/5.0",
        "Referer": "https://www.nseindia.com/",
      }
    });
    console.log("NSE India response status:", res.status);
    const data = res.data;
    console.log("NSE India response data:", JSON.stringify(data).slice(0, 500));
    const indexInfo = data.data[0];
    const result = {
      index: indexInfo.index,
      last: indexInfo.last,
      change: indexInfo.change,
      percentChange: indexInfo.pChange
    };
    if (returnData) return result;
    console.log("NIFTY 50:");
    console.log(result);
  } catch (err) {
    console.error("Failed to fetch NIFTY 50:", err.message);
    console.error("Error stack:", err.stack);
    // Fallback value for frontend if fetch fails
    const fallback = {
      index: 'NIFTY 50',
      last: 23450.25,
      change: 0,
      percentChange: 0
    };
    if (returnData) return fallback;
  }
}

// Function 2: Extract SENSEX from BSE India
async function getSensexData(returnData = false) {
  try {
    const res = await axios.get("https://www.bseindia.com/", {
      headers: { "User-Agent": "Mozilla/5.0" }
    });
    const $ = cheerio.load(res.data);
    const sensexValue = $("#sensex").text().trim();
    const change = $("#lblchange").text().trim();
    const result = { sensexValue, change };
    if (returnData) return result;
    console.log("SENSEX:");
    console.log(result);
  } catch (err) {
    if (returnData) throw err;
    console.error("Failed to fetch SENSEX:", err.message);
  }
}

// Function 3: Extract top 3 mutual funds by NAV from AMFI
async function getTop3MutualFunds(returnData = false) {
  const AMFI_URL = "https://www.amfiindia.com/spages/NAVAll.txt";
  try {
    const response = await axios.get(AMFI_URL);
    const lines = response.data.split("\n");
    const fundData = lines
      .filter(line => /^\d+;/.test(line))
      .map(line => {
        const parts = line.split(";");
        return {
          schemeCode: parts[0],
          schemeName: parts[3],
          nav: parseFloat(parts[4]),
          date: parts[7]
        };
      })
      .filter(f => !isNaN(f.nav))
      .sort((a, b) => b.nav - a.nav)
      .slice(0, 3);
    if (returnData) return fundData;
    console.log("Top 3 Mutual Funds by NAV:");
    fundData.forEach((fund, i) => {
      console.log(`${i + 1}. ${fund.schemeName} - NAV ₹${fund.nav} (as of ${fund.date})`);
    });
  } catch (err) {
    if (returnData) throw err;
    console.error("Failed to fetch Mutual Funds:", err.message);
  }
}

module.exports = { getNifty50Data, getSensexData, getTop3MutualFunds };

// Only run all if called directly
if (require.main === module) {
  getNifty50Data();
  getSensexData();
  getTop3MutualFunds();
}
