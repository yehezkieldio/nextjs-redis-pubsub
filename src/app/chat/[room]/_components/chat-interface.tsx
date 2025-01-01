import { Button } from "#/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "#/components/ui/card";
import { Input } from "#/components/ui/input";
import { Message } from "#/lib/redis";

type Props = {
    room: string;
    input: string;
    messages: Message[];
    messagesEndRef: React.RefObject<HTMLDivElement>;
    onInputChange: (value: string) => void;
    onSubmit: (e: React.FormEvent) => void;
};

export function ChatInterface({ room, input, messages, messagesEndRef, onInputChange, onSubmit }: Props) {
    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle>Chat Room: {room}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-96 overflow-y-auto mb-4 p-4 border rounded">
                    {messages.map((msg, index) => (
                        <div key={index} className="mb-2">
                            <span className="font-bold">{msg.sender}: </span>
                            {msg.message}
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>
                <form onSubmit={onSubmit} className="flex gap-2">
                    <Input
                        type="text"
                        value={input}
                        onChange={(e) => onInputChange(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-grow"
                    />
                    <Button type="submit">Send</Button>
                </form>
            </CardContent>
        </Card>
    );
}
