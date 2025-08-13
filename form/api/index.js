/*const express = require('express');
const {BigQuery} = require('@google-cloud/bigquery');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

const bigquery = new BigQuery();

process.env.GOOGLE_APPLICATION_CREDENTIALS = 'form/greenco-db-0690d0bc9976.json';


fechas disponibles
app.get('/dates', async (req, res) => {
  try {
    const query = `
      SELECT distinct(date)
      FROM \`greenco-db.API_CALLS.turnosDisponiblesSecos\`
    `;
  const [rows] = await bigquery.query({ query, location: "US" });
    res.json(rows);
  } catch (err) {
    console.error('ERROR:', err);
    res.status(500).send('Error querying BigQuery');
  }
});*/

/*Horarios Disponibles 

app.get('/times', async (req, res) => {
  try {
    const param = req.query.param;

    if (!param) {
      return res.status(400).json({ error: 'param is required' });
    }
    const query = `
      SELECT time
      FROM \`greenco-db.API_CALLS.turnosDisponiblesSecos\`
    WHERE date = '${param}'
    `;
  const [rows] = await bigquery.query({ query, location: "US" });
    res.json(rows);
  } catch (err) {
    console.error('ERROR:', err);
    res.status(500).send('Error querying BigQuery');
  }
});

const PORT = 3000
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
}*/
export async function GET(request) {
  const response = await fetch('https://api.vercel.app/products');
  const products = await response.json();
  return Response.json(products);

}
