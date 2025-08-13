
import { BigQuery } from '@google-cloud/bigquery';

const credentials = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON);

const bigquery = new BigQuery({
  projectId: credentials.project_id,
  credentials
});

export async function GET() {
  try {
    const query = `
           SELECT distinct(date)
      FROM \`greenco-db.API_CALLS.turnosDisponiblesSecos\`
    `;
    const [rows] = await bigquery.query({ query, location: 'US' });
    return Response.json(rows);
  } catch (err) {
    console.error('ERROR:', err);
    return new Response('Error querying BigQuery', { status: 500 });
  }
}

