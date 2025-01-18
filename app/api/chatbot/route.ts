import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { inputValue } = await req.json(); // Extract inputValue from the request body

  if (!inputValue) {
    return NextResponse.json({ error: "No input value provided" });
  }

  const applicationToken = process.env.APPLICATION_TOKEN;
  const langflowBaseURL = process.env.LANGFLOW_BASE_URL;
  const flowId = process.env.FLOW_ID;
  const langflowId = process.env.LANGFLOW_ID;

  try {
    // Construct the API request URL
    const url = `${langflowBaseURL}/lf/${langflowId}/api/v1/run/${flowId}`;

    // Send request to Langflow API
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${applicationToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ input_value: inputValue }), // Send the input data
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error(
          "Authorization failed. The token may be expired or invalid."
        );
      } else {
        throw new Error("An error occurred while interacting with LangFlow.");
      }
    }

    // Parse and return the response from Langflow
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error during LangFlow API request:", error.message);
    return NextResponse.json({
      error: error.message || "Error processing the request",
    });
  }
};
