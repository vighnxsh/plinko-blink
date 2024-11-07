import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import {
    ActionPostResponse,
    createActionHeaders, 
    createPostResponse,
    ActionGetResponse,
    ActionPostRequest,
    ACTIONS_CORS_HEADERS,
  } from "@solana/actions";
  import { Connection, PublicKey, SystemProgram, Transaction } from '@solana/web3.js';

  const headers = createActionHeaders({
    chainId: "devnet",
    actionVersion: "2.2.1",
  });

  export async function GET(request: NextRequest ) {
    try {
      const response: ActionGetResponse = {
          icon: "https://example.com/plinko-icon.png",
          title: "Plinko Game", 
          description: "Play Plinko and win rewards!",
          label: "Play Plinko",
          links: {
              actions: [
                  {
                      type: "transaction",
                      label: "Play with 0.1 SOL",
                      href: "/api/actions?amount=0.1"
                  },
                  {
                      type: "transaction", 
                      label: "Play with 0.5 SOL",
                      href: "/api/actions?amount=0.5"
                  },
                  {
                      type: "transaction",
                      label: "Play with Custom Amount",
                      href: "/api/actions?amount={amount}",
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

  export async function POST(request: NextRequest) {
    try {
      const body: ActionPostRequest<string> = await request.json();
      //@ts-ignore
      const { betAmount, startPosition } = body;

      if (!betAmount || isNaN(parseFloat(betAmount))) {
        return NextResponse.json({ error: "Invalid amount" }, { status: 400, headers });
      }

      // Call backend plinko game logic
      const response = await fetch('http://localhost:3000/api/r', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ betAmount, startPosition })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      return NextResponse.json(result, {
        headers: ACTIONS_CORS_HEADERS
      });
    } catch (error) {
      console.error('Error in POST:', error);
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
