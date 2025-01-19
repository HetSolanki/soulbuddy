import { NextResponse } from "next/server";
import Cors from "cors";
import initMiddleware from "@/lib/init-middleware";

// Initialize the CORS middleware
const cors = initMiddleware(
  Cors({
    origin: "*", // Allow all origins, change to specific domain for production
    methods: ["GET", "POST", "OPTIONS"], // Allowed HTTP methods
  })
);

export async function POST(req) {
  // Run CORS middleware
  await cors(req);

  try {
    const { inputValue } = await req.json();

    if (!inputValue) {
      return NextResponse.json(
        { error: "No input value provided" },
        { status: 400 }
      );
    }

    const applicationToken = process.env.APPLICATION_TOKEN;
    const langflowBaseURL = process.env.LANGFLOW_BASE_URL;
    const flowId = process.env.FLOW_ID;
    const langflowId = process.env.LANGFLOW_ID;

    // Construct the API request URL
    const url = `${langflowBaseURL}/lf/${langflowId}/api/v1/run/${flowId}`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${applicationToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ input_value: inputValue }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch from Langflow API");
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "An error occurred" },
      { status: 500 }
    );
  }
}

// Handle OPTIONS preflight requests
export async function OPTIONS(req) {
  await cors(req);
  return NextResponse.json({}, { status: 204 });
}
