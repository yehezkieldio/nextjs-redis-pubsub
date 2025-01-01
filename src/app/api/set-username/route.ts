import { NextResponse } from "next/server";

import { setUsername } from "#/lib/redis";
import { ulid } from "#/lib/ulid";

export async function POST(req: Request) {
    const { room, username } = await req.json();

    const userId = ulid();

    await setUsername(room, userId, username);

    return NextResponse.json({ success: true, userId });
}
