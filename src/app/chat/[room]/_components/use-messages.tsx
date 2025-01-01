import { useEffect, useRef, useState } from "react";

import { Message } from "#/lib/redis";

export function useMessages(room: string) {
    const [messages, setMessages] = useState<Message[]>([]);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const lastTimestampRef = useRef(0);

    useEffect(() => {
        const fetchMessages = async () => {
            const response = await fetch(`/api/messages?room=${room}&lastTimestamp=${lastTimestampRef.current}`);
            const newMessages: Message[] = await response.json();
            setMessages((prevMessages) => [...prevMessages, ...newMessages]);
        };

        fetchMessages();
        const intervalId = setInterval(fetchMessages, 1000);
        return () => clearInterval(intervalId);
    }, [room]);

    return { messages, messagesEndRef };
}
