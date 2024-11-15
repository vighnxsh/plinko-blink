import { ACTIONS_CORS_HEADERS, ActionsJson } from "@solana/actions";
import {  NextResponse } from 'next/server';

export const GET = async () => {
  const payload: ActionsJson = {
    rules: [
      // map all root level routes to an action
      {
        pathPattern: "/*",
        apiPath: "/api/actions/*",
      },
      // idempotent rule as the fallback
      {
        pathPattern: "/api/actions/**",
        apiPath: "/api/actions/**",
      },
    ],
  };

  return new NextResponse(JSON.stringify(payload), {
    headers: {
      ...ACTIONS_CORS_HEADERS,
      'Access-Control-Allow-Origin': 'https://dial.to',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    }
  });
};

// Handle OPTIONS preflight requests
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      ...ACTIONS_CORS_HEADERS,
      'Access-Control-Allow-Origin': 'https://dial.to',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS', 
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    }
  });
}