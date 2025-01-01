"use client";

import { RefObject, useCallback, useReducer } from "react";
import { useParams } from "next/navigation";

import { ChatInterface } from "#/app/chat/[room]/_components/chat-interface";
import { useChatScroll } from "#/app/chat/[room]/_components/use-chat-scroll";
import { useMessages } from "#/app/chat/[room]/_components/use-messages";
import { UsernameForm } from "#/app/chat/[room]/_components/username-form";

type ChatState = {
    input: string;
    username: string;
    isUsernameSet: boolean;
};

type ChatAction =
    | { type: "SET_INPUT"; payload: string }
    | { type: "SET_USERNAME"; payload: string }
    | { type: "SET_USERNAME_STATUS"; payload: boolean }
    | { type: "CLEAR_INPUT" };

const chatReducer = (state: ChatState, action: ChatAction): ChatState => {
    switch (action.type) {
        case "SET_INPUT":
            return { ...state, input: action.payload };
        case "SET_USERNAME":
            return { ...state, username: action.payload };
        case "SET_USERNAME_STATUS":
            return { ...state, isUsernameSet: action.payload };
        case "CLEAR_INPUT":
            return { ...state, input: "" };
        default:
            return state;
    }
};

export default function ChatRoom() {
    const { room } = useParams();
    const [state, dispatch] = useReducer(chatReducer, {
        input: "",
        username: "",
        isUsernameSet: false
    });

    const { messages, messagesEndRef } = useMessages(room as string);
    useChatScroll(messagesEndRef as RefObject<HTMLDivElement>, messages);

    const sendMessage = useCallback(
        async (e: React.FormEvent) => {
            e.preventDefault();
            if (!state.input.trim() || !state.isUsernameSet) return;

            const response = await fetch("/api/send-message", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    room,
                    message: state.input,
                    sender: state.username
                })
            });

            if (response.ok) {
                dispatch({ type: "CLEAR_INPUT" });
            }
        },
        [state.input, state.isUsernameSet, state.username, room]
    );

    const setUserName = useCallback(
        async (e: React.FormEvent) => {
            e.preventDefault();
            if (!state.username.trim()) return;

            const response = await fetch("/api/set-username", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ room, username: state.username })
            });

            if (response.ok) {
                dispatch({ type: "SET_USERNAME_STATUS", payload: true });
            }
        },
        [state.username, room]
    );

    if (!state.isUsernameSet) {
        return (
            <UsernameForm
                username={state.username}
                onUsernameChange={(value) => dispatch({ type: "SET_USERNAME", payload: value })}
                onSubmit={setUserName}
            />
        );
    }

    return (
        <ChatInterface
            room={room as string}
            input={state.input}
            messages={messages}
            messagesEndRef={messagesEndRef as RefObject<HTMLDivElement>}
            onInputChange={(value) => dispatch({ type: "SET_INPUT", payload: value })}
            onSubmit={sendMessage}
        />
    );
}
