import { NextResponse } from 'next/server';

// Defines the structure of a Plinko game result
interface PlinkoResult {
  path: number[];           // Array of positions the ball takes
  finalPosition: number;    // Final landing position
  score: number;           // Final score (bet * multiplier)
  multiplier: number;      // Multiplier applied to bet
}

// Board configuration constants
const ROWS = 16;            // Number of rows of pins
const PINS_PER_ROW = 16;    // Number of pins per row

// Multiplier values for each landing slot (17 slots total)
// Adjusted multipliers to ensure house edge
const MULTIPLIERS = [
  0.8, 0.9, 1.0, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7,
  1.6, 1.5, 1.4, 1.3, 1.2, 1.1, 1.0
];

// House edge percentage (5%)
const HOUSE_EDGE = 0.05;
    
// Calculates the path the ball takes through the pins
function calculatePath(startPosition: number): number[] {
  const path: number[] = [startPosition];
  let currentPosition = startPosition;

  // For each row of pins
  for (let row = 0; row < ROWS; row++) {
    // Slightly biased random choice (55/45) towards less profitable positions
    const bias = Math.random();
    const direction = bias < 0.55 ? -1 : 1;
    
    // Calculate new position, ensuring it stays within bounds
    currentPosition = Math.max(0, Math.min(row + 2, currentPosition + direction));
    path.push(currentPosition);
  }

  return path;
}

// Calculates final score based on landing position and initial bet
function calculateScore(finalPosition: number, betAmount: number): number {
  const multiplier = MULTIPLIERS[finalPosition];
  // Apply house edge to final score
  const scoreWithEdge = betAmount * multiplier * (1 - HOUSE_EDGE);
  return Math.floor(scoreWithEdge);
}

// API endpoint handler for POST requests
export async function POST(request: Request) {
  try {
    // Extract bet amount and start position from request body
    const body = await request.json();
    const { betAmount, startPosition } = body;

    // Validate bet amount
    if (!betAmount || typeof betAmount !== 'number' || betAmount <= 0) {
      return NextResponse.json({ error: 'Invalid bet amount' }, { status: 400 });
    }

    // Validate start position
    if (startPosition === undefined || 
        startPosition < 0 || 
        startPosition >= PINS_PER_ROW) {
      return NextResponse.json({ error: 'Invalid start position' }, { status: 400 });
    }

    // Simulate the game
    const path = calculatePath(startPosition);
    const finalPosition = path[path.length - 1];

    // Calculate final score
    const score = calculateScore(finalPosition, betAmount);

    // Prepare and return result
    const result: PlinkoResult = {
      path,
      finalPosition,
      score,
      multiplier: MULTIPLIERS[finalPosition]
    };

    return NextResponse.json(result);

  } catch (error) {
    // Handle any unexpected errors
    console.error('Plinko game error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}