import { NextResponse } from "next/server";
import { Client } from "@upstash/qstash";

export async function GET(req: Request) {
  // We recommend securing this endpoint in a real production app (e.g., checking an admin token).
  // For this MVP setup phase, it's fine to leave it open so you can hit it easily.
  
  const token = process.env.QSTASH_TOKEN;
  // Fallback to VERCEL_URL for preview environments
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 
                 (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null);

  if (!token) {
    return NextResponse.json({ error: "QSTASH_TOKEN is not set in environment variables." }, { status: 500 });
  }

  if (!baseUrl) {
    return NextResponse.json({ error: "NEXT_PUBLIC_BASE_URL or VERCEL_URL is not set in environment variables." }, { status: 500 });
  }

  try {
    const client = new Client({ token });
    const destinationUrl = `${baseUrl}/api/cron/send-reminders`;

    console.log(`[QSTASH SETUP] Creating 5-minute schedule for: ${destinationUrl}`);

    // Create a schedule that triggers every 5 minutes
    const schedule = await client.schedules.create({
      destination: destinationUrl,
      cron: "*/5 * * * *", 
    });

    return NextResponse.json({
      success: true,
      message: "Successfully created QStash 5-minute schedule.",
      scheduleId: schedule.scheduleId,
      destination: destinationUrl,
    });
  } catch (error: any) {
    console.error("[QSTASH SETUP] Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
