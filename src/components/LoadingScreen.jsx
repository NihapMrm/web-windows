import React from "react";
import FaultyTerminal from './FaultyTerminal';

const FAULTY_GRID_MUL = [2, 1];

const LoadingScreen = ({ fading, duration = 2000 }) => {

  return (
    <div
      className={`LoadingScreen absolute inset-0 flex items-center justify-center bg-black/80 z-50 flex-col gap-8 transition-opacity duration-500 ${
        fading ? 'opacity-0' : 'opacity-100'
      }`}
    >
         {/* Animated Beams Background */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}>
         <FaultyTerminal
    scale={1.5}
    gridMul={FAULTY_GRID_MUL}
    digitSize={1.2}
    timeScale={0.5}
    pause={false}
    scanlineIntensity={0.5}
    glitchAmount={1}
    flickerAmount={1}
    noiseAmp={1}
    chromaticAberration={0}
    dither={0}
    curvature={0.1}
    tint="#ffffff"
    mouseReact
    mouseStrength={0.5}
    pageLoadAnimation
    brightness={0.6}
  />
      </div>
        <div className="card w-80 grid grid-cols-2 gap-x-4 gap-y-2 z-10">
            <div className="box backdrop-blur-xl bg-white/10 border border-white/20 glass-card w-40 h-40"></div>
            <div className="box backdrop-blur-xl bg-white/10 border border-white/20 glass-card w-40 h-40"></div>
            <div className="box backdrop-blur-xl bg-white/10 border border-white/20 glass-card w-40 h-40"></div>
            <div className="box backdrop-blur-xl bg-white/10 border border-white/20 glass-card w-40 h-40"></div>
        </div>
        <div className="progress-loader z-10 w-80">


<div className="w-full backdrop-blur-xl bg-white/10 border border-white/20 glass-card rounded-full h-2">
  <div className="bg-white h-2 rounded-full loading-bar" style={{ animationDuration: `${duration}ms` }}></div>
</div>


        </div>


    </div>
  );
};

export default LoadingScreen;
