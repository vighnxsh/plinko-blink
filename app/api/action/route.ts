import { NextResponse } from 'next/server'
import {
    ActionGetResponse,
    ACTIONS_CORS_HEADERS,
} from "@solana/actions";

export async function GET() {
    try {
        const response: ActionGetResponse = {
            icon: "https://utfs.io/f/fp4FPpzIq8tr36JrXH8vyrYH6V02JScIPMWOUltmgXNZv5Ki",
            title: "Plinko Game", 
            description: "Drop the ball and win rewards!!",
            label: "Play Plinko",
            links: {
                actions: [
                    {
                        type: "transaction",
                        label: "Play with 0.1 SOL",
                        href: "/api/action?amount=0.1"
                    },
                    {
                        type: "transaction", 
                        label: "Play with 0.5 SOL",
                        href: "/api/action?amount=0.5"
                    },
                    {
                        type: "transaction",
                        label: "Play with Custom Amount",
                        href: "/api/action?amount={amount}",
                        parameters: [
                            {
                                name: "amount",
                                label: "Enter SOL amount (0.01-10)",
                                required: true
                            }
                        ]
                    }
                ]
            }
        }
        return NextResponse.json(response, { headers: ACTIONS_CORS_HEADERS });
    } catch (error) {
        console.error('Error in GET:', error);
        return NextResponse.json({ error: 'Internal server error' }, { 
            status: 500,
            headers: ACTIONS_CORS_HEADERS 
        });
    }
}

export async function OPTIONS() {
    return new NextResponse(null, {
        status: 204,
        headers: ACTIONS_CORS_HEADERS
    });
}
