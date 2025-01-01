import { NextResponse } from "next/server";

import { getLatestMessages, Message } from "#/lib/redis";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const room: string | null = searchParams.get("room");
    const lastTimestamp = parseInt(searchParams.get("lastTimestamp") || "0");

    if (!room) {
        return NextResponse.json(
            {
                error: "Room is required"
            },
            { status: 400 }
        );
    }

    const messages: Message[] = await getLatestMessages(room, lastTimestamp);
    return NextResponse.json({ messages });
}
