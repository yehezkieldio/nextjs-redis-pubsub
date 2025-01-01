import Redis from "ioredis";

export const redis = new Redis({
    host: process.env.REDIS_HOST || "localhost",
    port: (process.env.REDIS_PORT as unknown as number) || 6379
});

export interface Message {
    sender: string;
    message: string;
    timestamp: number;
}

export async function publishMessage(room: string, message: Message): Promise<void> {
    await redis.publish(room, JSON.stringify(message));
}

export async function storeMessage(room: string, message: Message) {
    // lpush adds the message to the beginning of the list
    await redis.lpush(`chat:${room}`, JSON.stringify(message));
    await redis.ltrim(`chat:${room}`, 0, 99); // keep only the last 100 messages
}

export async function getMessages(room: string): Promise<Message[]> {
    const messages = redis.lrange(`chat:${room}`, 0, -1); // get all messages

    return (await messages)
        .map((msg) => {
            try {
                const message = JSON.parse(msg);
                return {
                    sender: message.sender || "unknown",
                    message: message.message || "",
                    timestamp: message.timestamp || Date.now()
                };
            } catch (error) {
                console.error("Error parsing message", error);
                return null;
            }
        })
        .filter((msg): msg is Message => msg !== null);
}

export async function getLatestMessages(room: string, lastTimestamp: number): Promise<Message[]> {
    const messages = await getMessages(room);
    return messages.filter((msg) => msg.timestamp > lastTimestamp);
}

export async function setUsername(room: string, userId: string, username: string) {
    await redis.hset(`user:${room}`, userId, username);
}

export async function getUsername(room: string, userId: string): Promise<string> {
    const username = await redis.hget(`user:${room}`, userId);
    return username || "unknown";
}
