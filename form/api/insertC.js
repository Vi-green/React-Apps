import { BigQuery } from "@google-cloud/bigquery";
import axios from "axios";

const credentials = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON);
const API_KEY = "tdan8ex2a9d6u4rvsedrggiw43gnes"


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
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // ✅ Handle preflight request
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }


  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const bigquery = new BigQuery({
      projectId: credentials.projectId,
      credentials
    });

    const datasetId = "API_CALLS";
    const tableId = "turnos-cabral";

    // Insert form data
    await bigquery
      .dataset(datasetId)
      .table(tableId)
      .insert(req.body);

    const formData=req.body;
       const relayBody = {
      from_name: "Turnos GreenCo",
      from_email: "info@greenco.com.ar",
      messageId: `form-${Date.now()}`, // unique ID
      subject: "Tu turno agendado con GreenCo",
      text: `Hola ${formData.razon_social}, gracias por agendar tu turno con nosotros`,
      html: `    <p>Hola ${formData.razon_social}, con cuit ${formData.cuit}</p>
    <p>Tu turno ha sido reservado con éxito:</p>
    <ul>
      <li><strong>Fecha:</strong> ${formData.dia}</li>
      <li><strong>Hora:</strong> ${formData.hora}</li>
    </ul>

    <p> Te esperamos en Sargento Cabral 1130 - San Martín - Buenos Aires para entregar:</p>
    <p> ${formData.ocs}</p>

     <p>En caso de querer cancelar o modificar tu turno, por favor ponte en contacto con nosotros
    a nuestro mail: recepciones@greenco.com.ar
     </p> 

    <p>¡Gracias por usar nuestro sistema!</p>`,
      recipients: [
        {
          email: formData.email,
          name: formData.razon_social || "",
          type: "to",
        },
      ],
      skip_track_opens: true,
      skip_track_clicks: true,
    };

    const response = await axios.post(
      "https://api.dopplerrelay.com/accounts/9317/messages",
      relayBody,
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );


    res.status(200).json({ message: "Data inserted successfully and email sent" });
  } 
  
  
  catch (error) {
  console.error("Relay error details:", {
    status: error.response?.status,
    statusText: error.response?.statusText,
    data: error.response?.data,
    headers: error.response?.headers,
    message: error.message,
  });

  return res.status(500).json({
    error: "Relay failed",
    details: error.response?.data || error.message,
  });
  };


  
}