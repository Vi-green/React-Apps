
import { BigQuery } from '@google-cloud/bigquery';

const credentials = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON);

const bigquery = new BigQuery({
  projectId: credentials.project_id,
  credentials
});



export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const query = `
      SELECT DISTINCT(date)
      FROM \`greenco-db.API_CALLS.turnosDisponiblesSecos\`
    `;

    const [rows] = await bigquery.query({ query, location: 'US' });

    // Return the rows as JSON
    res.status(200).json(rows);
  } catch (err) {
    console.error('ERROR:', err);
    res.status(500).json({ error: 'Error querying BigQuery' });
  }
}
