import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { eventType, path, deviceType, branch, metadata } = body;

    if (!eventType || typeof eventType !== "string") {
      return NextResponse.json({ error: "Invalid event type" }, { status: 400 });
    }

    // 1. Neon Database Support
    const sql = getDb();
    if (sql) {
      await sql`
        INSERT INTO analytics_events (event_type, path, device_type, branch, metadata)
        VALUES (
          ${eventType},
          ${path || null},
          ${deviceType || null},
          ${branch || null},
          ${metadata ? JSON.stringify(metadata) : null}
        )
      `;
      return NextResponse.json({ success: true, engine: "neon" });
    }

    // 2. Fallback to Supabase Admin Client
    const admin = createAdminClient();
    if (admin) {
      await admin.from("analytics_events").insert({
        event_type: eventType,
        path: path || null,
        device_type: deviceType || null,
        branch: branch || null,
        metadata: metadata || null,
      });
      return NextResponse.json({ success: true, engine: "supabase" });
    }

    return NextResponse.json({ ok: true, stored: false });
  } catch (err) {
    console.error("[analytics api error]", err);
    return NextResponse.json({ error: "Failed to record event" }, { status: 500 });
  }
}
