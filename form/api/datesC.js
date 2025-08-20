
import { BigQuery } from '@google-cloud/bigquery';

const credentials = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON);

const bigquery = new BigQuery({
  projectId: credentials.project_id,
  credentials
});


const allowedOrigins = [
  "https://www.portal.greenco.com.ar",
  "https://portal.greenco.com.ar",
  "http://localhost:3000" // 👈 for local dev (Vite default)
];


export default async function handler(req, res) {
  
   const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // ✅ Handle preflight request
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const query = `
      SELECT DISTINCT(date)
      FROM \`greenco-db.API_CALLS.turnosDisponiblesCabral\`
    `;

    const [rows] = await bigquery.query({ query, location: 'US' });

    // Return the rows as JSON
    res.status(200).json(rows);
  } catch (err) {
    console.error('ERROR:', err);
    res.status(500).json({ error: 'Error querying BigQuery' });
  }
}
