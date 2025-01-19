import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req) {
  const { inputData, collectionName } = await req.json();

  if (!inputData || !collectionName) {
    return NextResponse.json(
      { error: "inputData and collectionName are required" },
      { status: 400 }
    );
  }

  // Load environment variables
  const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
  const ASTRA_DB_URL = process.env.ASTRA_DB_URL;
  const ASTRA_DB_TOKEN = process.env.ASTRA_DB_APPLICATION_TOKEN;

  try {
    console.log(GOOGLE_API_KEY);
    console.log(ASTRA_DB_TOKEN);
    console.log(ASTRA_DB_URL);

    /** Step 1: Get Embeddings from Google Gemini */
    const inputData = "Sample text for embedding.";

    const googleResponse = async () => {
      try {
        const googleResponse = await axios.post(
          `https://generativelanguage.googleapis.com/v1beta2/models/text-embedding-001:embedText?key=${GOOGLE_API_KEY}`,
          { text: "Het Solanki" }
        );
        return googleResponse;
      } catch (error) {
        console.error("API Error:", error.response?.data || error);
      }
    };

    console.log(googleResponse.data);
    if (!googleResponse.data || !googleResponse.data.embedding) {
      throw new Error("Failed to retrieve embeddings from Google Gemini");
    }

    const embedding = googleResponse.data.embedding;

    /** Step 2: Store Data in Astra DB */
    const astraResponse = await axios.post(
      `${ASTRA_DB_URL}/api/rest/v2/default_keyspace/collections/${collectionName}`,
      {
        data: inputData,
        vector: embedding, // Store the vectorized data
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.ASTRA_DB_TOKEN}`,
          "X-Cassandra-Token": ASTRA_DB_TOKEN,
        },
      }
    );

    return NextResponse.json({
      success: true,
      message: "Data vectorized and stored successfully",
      astraResponse: astraResponse.data,
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// import { NextResponse } from "next/server";

// class LangflowClient {
//   constructor(baseURL, applicationToken) {
//     this.baseURL = baseURL;
//     this.applicationToken = applicationToken;
//   }

//   async post(endpoint, body) {
//     const headers = {
//       Authorization: `Bearer ${this.applicationToken}`,
//       "Content-Type": "application/json",
//     };

//     const url = `${this.baseURL}${endpoint}`;

//     try {
//       const response = await fetch(url, {
//         method: "POST",
//         headers,
//         body: JSON.stringify(body),
//       });

//       const responseMessage = await response.json();
//       if (!response.ok) {
//         throw new Error(
//           `${response.status} ${response.statusText} - ${JSON.stringify(
//             responseMessage
//           )}`
//         );
//       }

//       return responseMessage;
//     } catch (error) {
//       console.error("Request Error:", error.message);
//       throw error;
//     }
//   }

//   async initiateSession(
//     flowId,
//     langflowId,
//     inputValue,
//     inputType = "chat",
//     outputType = "chat",
//     stream = false,
//     tweaks = {}
//   ) {
//     const endpoint = `/lf/${langflowId}/api/v1/run/${flowId}?stream=${stream}`;
//     return this.post(endpoint, {
//       input_value: inputValue,
//       input_type: inputType,
//       output_type: outputType,
//       tweaks,
//     });
//   }
// }

// export async function POST(req) {
//   const { inputValue, collectionName } = await req.json();
//   const flowIdOrName = "59b52fde-bb0c-4de0-abdd-d801ed1807c6";
//   const langflowId = "ccf1daa1-7b1b-4f59-99ef-61d5b9dd1fda";

//   const applicationToken = process.env.APPLICATION_TOKEN;
//   const langflowBaseURL = "https://api.langflow.astra.datastax.com";

//   const langflowClient = new LangflowClient(langflowBaseURL, applicationToken);

//   try {
//     const tweaks = {
//       "Google Generative AI Embeddings-NwgsI": {
//         api_key: "GoogleApi",
//         model_name: "models/text-embedding-004",
//       },
//       "AstraDB-gFUAO": {
//         collection_name: collectionName,
//         api_endpoint: process.env.ASTRADB_URL,
//         token: process.env.ASTRADB_APPLICATION_TOKEN,
//       },
//       "TextInput-WY494": { input_value: inputValue },
//     };

//     const response = await langflowClient.initiateSession(
//       flowIdOrName,
//       langflowId,
//       inputValue,
//       "chat",
//       "chat",
//       false,
//       tweaks
//     );

//     return NextResponse.json({
//       success: true,
//       message: "Processing completed successfully.",
//       result: response,
//     });
//   } catch (error) {
//     console.error("Error in API Handler:", error.message);
//     return NextResponse.json({
//       success: false,
//       message: `Error: ${error.message}`,
//     });
//   }
// }
