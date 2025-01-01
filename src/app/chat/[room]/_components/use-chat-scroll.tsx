import { useEffect, RefObject } from "react";
import { Message } from "#/lib/redis";

export function useChatScroll(
    ref: RefObject<HTMLDivElement>,
    messages: Message[]
) {
    useEffect(() => {
        ref.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, ref]);
}