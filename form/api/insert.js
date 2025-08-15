import { BigQuery } from "@google-cloud/bigquery";

const credentials = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const bigquery = new BigQuery({
      projectId: credentials.projectId,
      credentials
    });

    const datasetId = "API_CALLS";
    const tableId = "turnos-4feb";

    // Insert form data
    await bigquery
      .dataset(datasetId)
      .table(tableId)
      .insert(req.body);

    res.status(200).json({ message: "Data inserted successfully" });
  } catch (error) {
    console.error("BigQuery insert error:", error);
    console.error(error.errors);
    res.status(500).json({ error: "Failed to insert data" });
  }
}