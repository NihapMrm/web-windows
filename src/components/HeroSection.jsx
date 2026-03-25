import React from 'react';

export default function HeroSection({ show, onStart }) {
  return (
    <div
      className={`absolute inset-0 flex flex-col items-center justify-center z-10 transition-opacity duration-800 ${show ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
    >
      <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-full py-2 px-8 shadow-2xl  flex flex-col items-center  glass-card absolute top-12">
        <h1 className="text-xl md:text-xl font-bold text-white text-center drop-shadow-lg">
          Hi, I'm Nihap
        </h1>
      </div>
       <h1 className="text-8xl md:text-9xl font-bold mb-3 text-white text-center drop-shadow-lg">
          Welcome to My <br></br> Web OS
        </h1>
      <button
          onClick={onStart}
          className="bg-white text-black  px-8 py-3 rounded-full font-semibold text-lg shadow-lg transition-all duration-300 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-blue-300/40"
        >
          Start <span className="ml-1">▶</span>
        </button>
    </div>
  );
}