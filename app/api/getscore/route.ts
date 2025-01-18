import { NextRequest, NextResponse } from "next/server";
import { getCompleteNumerologyAndHoroscope } from "../../utils/getCompleteHoroscope";

export const POST = async (request: NextRequest) => {
  const data = await request.json();
  const analysis = getCompleteNumerologyAndHoroscope(data.birthdate, data.name);

  return NextResponse.json({ ...analysis });
};
