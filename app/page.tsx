// "use client";
// import React, { useState, useEffect, useRef } from 'react';
// import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';

// const PlinkoGame = () => {
//   const [betAmount, setBetAmount] = useState(100);
//   const [startPosition, setStartPosition] = useState(8);
//   const [gameResult, setGameResult] = useState<{
//     path: number[];
//     finalPosition: number;
//     score: number;
//     multiplier: number;
//   } | null>(null);
//   const [animationStep, setAnimationStep] = useState(-1);
//   const canvasRef = useRef<HTMLCanvasElement>(null);

//   const drawBoard = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
//     ctx.clearRect(0, 0, width, height);
    
//     // Draw pins
//     const pinRadius = 3;
//     const rows = 16;
//     const pinsPerRow = 16;
//     const pinSpacingX = width / (pinsPerRow + 1);
//     const pinSpacingY = height / (rows + 2);

//     ctx.fillStyle = '#666';
//     for (let row = 0; row < rows; row++) {
//       for (let pin = 0; pin <= row + 1; pin++) {
//         const x = (width / 2) - ((row + 1) / 2 * pinSpacingX) + (pin * pinSpacingX);
//         const y = (row + 1) * pinSpacingY;
//         ctx.beginPath();
//         ctx.arc(x, y, pinRadius, 0, Math.PI * 2);
//         ctx.fill();
//       }
//     }

//     // Draw ball if there's a game result and animation is in progress
//     if (gameResult && animationStep >= 0 && animationStep < gameResult.path.length) {
//       const currentPos = gameResult.path[animationStep];
//       const row = animationStep;
//       const x = (width / 2) - ((row + 1) / 2 * pinSpacingX) + (currentPos * pinSpacingX);
//       const y = (row + 1) * pinSpacingY;
      
//       ctx.fillStyle = '#ff4444';
//       ctx.beginPath();
//       ctx.arc(x, y, 6, 0, Math.PI * 2);
//       ctx.fill();
//     }

//     // Draw slots at the bottom
//     ctx.fillStyle = '#444';
//     for (let i = 0; i <= pinsPerRow; i++) {
//       const x = (width / 2) - ((pinsPerRow) / 2 * pinSpacingX) + (i * pinSpacingX);
//       ctx.fillRect(x - 15, height - 30, 30, 30);
//     }
//   };

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     const ctx = canvas.getContext('2d');
//     if (!ctx) return;

//     const width = canvas.width;
//     const height = canvas.height;
//     drawBoard(ctx, width, height);
//   }, [animationStep, gameResult]);

//   useEffect(() => {
//     if (gameResult && animationStep < gameResult.path.length - 1) {
//       const timer = setTimeout(() => {
//         setAnimationStep(prev => prev + 1);
//       }, 200);
//       return () => clearTimeout(timer);
//     }
//   }, [animationStep, gameResult]);

//   const handleDrop = async () => {
//     try {
//       setAnimationStep(-1);
//       const response = await fetch('/api/r', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ betAmount, startPosition }),
//       });

//       const result = await response.json();
//       setGameResult(result);
//       setAnimationStep(0);
//     } catch (error) {
//       console.log('Error dropping the ball:', error);
//     }
//   };

//   return (
//     <Card className="w-full max-w-lg">
//       <CardHeader>
//         <CardTitle>Plinko Game</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <div className="mb-4">
//           <canvas 
//             ref={canvasRef} 
//             width={400} 
//             height={500} 
//             className="w-full border border-gray-300 rounded bg-white"
//           />
//         </div>
//         <div className="mb-4">
//           <label htmlFor="bet-amount" className="block mb-2 font-medium">
//             Bet Amount:
//           </label>
//           <input
//             id="bet-amount"
//             type="number"
//             value={betAmount}
//             onChange={(e) => setBetAmount(parseFloat(e.target.value))}
//             className="border border-gray-300 rounded px-3 py-2 w-full"
//           />
//         </div>
//         <div className="mb-4">
//           <label htmlFor="start-position" className="block mb-2 font-medium">
//             Start Position:
//           </label>
//           <input
//             id="start-position"
//             type="number"
//             min="0"
//             max="16"
//             value={startPosition}
//             onChange={(e) => setStartPosition(parseInt(e.target.value))}
//             className="border border-gray-300 rounded px-3 py-2 w-full"
//           />
//         </div>
//         <Button 
//           onClick={handleDrop} 
//           className="w-full"
//         >
//           Drop Ball
//         </Button>
//         {gameResult && (
//           <div className="mt-4">
//             <p>Path: {gameResult.path.join(' -> ')}</p>
//             <p>Final Position: {gameResult.finalPosition}</p>
//             <p>Multiplier: {gameResult.multiplier.toFixed(1)}x</p>
//             <p>Score: {gameResult.score}</p>
//           </div>
//         )}
//       </CardContent>
//     </Card>
//   );
// };

// export default PlinkoGame;