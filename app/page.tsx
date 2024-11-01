import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#0F172A] text-white relative overflow-hidden">
      <div className="relative z-10 text-center space-y-8">
        <h1 className="text-7xl font-bold font-geist-sans bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
          Plinko
        </h1>
        <p className="text-xl text-gray-300 max-w-md mx-auto font-geist-sans leading-relaxed">
          Drop the ball and watch it bounce through pegs for a chance to win big!
        </p>
        <button className="group px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-semibold text-lg relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25">
          <span className="relative z-10">Play Now</span>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
        </button>
      </div>

      {/* Modern backdrop blur effect */}
      <div className="absolute top-20 -left-32 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div className="absolute top-0 -right-32 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-32 left-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-1 h-1 rounded-full bg-cyan-300 animate-float" />
        <div className="absolute top-1/3 right-1/3 w-1 h-1 rounded-full bg-purple-300 animate-float-delayed" />
        <div className="absolute bottom-1/4 left-1/3 w-1 h-1 rounded-full bg-blue-300 animate-float-delayed-more" />
      </div>
      
    </main>
  );
}
