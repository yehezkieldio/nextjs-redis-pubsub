import { Button } from "#/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "#/components/ui/card";
import { Input } from "#/components/ui/input";

type Props = {
    username: string;
    onUsernameChange: (value: string) => void;
    onSubmit: (e: React.FormEvent) => void;
};

export function UsernameForm({ username, onUsernameChange, onSubmit }: Props) {
    return (
        <Card className="w-full max-w-md mx-auto mt-8">
            <CardHeader>
                <CardTitle>Enter Your Username</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={onSubmit} className="space-y-4">
                    <Input
                        type="text"
                        value={username}
                        onChange={(e) => onUsernameChange(e.target.value)}
                        placeholder="Your username"
                        className="w-full"
                    />
                    <Button type="submit" className="w-full">
                        Set Username
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
