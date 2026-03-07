import React, { useState, useEffect } from 'react';
import { FiX, FiMoreHorizontal, FiBell } from 'react-icons/fi';
import { AiFillWarning } from 'react-icons/ai';
import { MdSecurity } from 'react-icons/md';

const VirusModel = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 backdrop-blur-sm overflow-hidden">
      {/* Cracked Screen Effect with Depth */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice">
        <defs>
          {/* Shadow filter for depth */}
          <filter id="crackShadow">
            <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
            <feOffset dx="2" dy="2" result="offsetblur"/>
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.6"/>
            </feComponentTransfer>
            <feMerge>
              <feMergeNode/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          
          {/* Radial gradient for impact center */}
          <radialGradient id="impactGrad">
            <stop offset="0%" style={{ stopColor: 'rgba(255,255,255,0.5)', stopOpacity: 1 }} />
            <stop offset="30%" style={{ stopColor: 'rgba(255,255,255,0.3)', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: 'rgba(255,255,255,0)', stopOpacity: 0 }} />
          </radialGradient>
        </defs>
        
        {/* Impact center glow */}
        <circle cx="960" cy="540" r="200" fill="url(#impactGrad)" opacity="0.4" />
        
        {/* Main crack lines with shadow - radiating from center */}
        <g filter="url(#crackShadow)">
          {/* Primary cracks from center */}
          <path d="M 960 540 L 400 150 Q 350 120 300 100 L 200 50" 
            stroke="rgba(255,255,255,0.7)" strokeWidth="4" fill="none" strokeLinecap="round" />
          <path d="M 960 540 L 1520 200 Q 1570 180 1620 160 L 1720 120" 
            stroke="rgba(255,255,255,0.7)" strokeWidth="4" fill="none" strokeLinecap="round" />
          <path d="M 960 540 L 450 920 Q 400 960 350 990 L 280 1030" 
            stroke="rgba(255,255,255,0.7)" strokeWidth="4" fill="none" strokeLinecap="round" />
          <path d="M 960 540 L 1450 880 Q 1500 920 1550 950 L 1640 1000" 
            stroke="rgba(255,255,255,0.7)" strokeWidth="4" fill="none" strokeLinecap="round" />
          <path d="M 960 540 L 180 480 Q 120 470 80 460" 
            stroke="rgba(255,255,255,0.65)" strokeWidth="3.5" fill="none" strokeLinecap="round" />
          <path d="M 960 540 L 1740 600 Q 1800 610 1840 620" 
            stroke="rgba(255,255,255,0.65)" strokeWidth="3.5" fill="none" strokeLinecap="round" />
          <path d="M 960 540 L 850 100 Q 820 60 800 30" 
            stroke="rgba(255,255,255,0.65)" strokeWidth="3.5" fill="none" strokeLinecap="round" />
          <path d="M 960 540 L 1070 980 Q 1100 1020 1120 1050" 
            stroke="rgba(255,255,255,0.65)" strokeWidth="3.5" fill="none" strokeLinecap="round" />
        </g>
        
        {/* Secondary cracks branching out */}
        <g filter="url(#crackShadow)">
          <path d="M 400 150 L 300 280 Q 250 330 200 380" 
            stroke="rgba(255,255,255,0.55)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path d="M 400 150 L 550 80 L 650 40" 
            stroke="rgba(255,255,255,0.5)" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M 1520 200 L 1620 350 L 1680 450" 
            stroke="rgba(255,255,255,0.55)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path d="M 1520 200 L 1350 130 Q 1300 110 1250 90" 
            stroke="rgba(255,255,255,0.5)" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M 450 920 L 550 980 L 620 1030" 
            stroke="rgba(255,255,255,0.55)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path d="M 450 920 L 380 820 Q 350 780 320 740" 
            stroke="rgba(255,255,255,0.5)" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M 1450 880 L 1540 940 L 1620 980" 
            stroke="rgba(255,255,255,0.55)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path d="M 1450 880 L 1340 810 Q 1300 780 1260 750" 
            stroke="rgba(255,255,255,0.5)" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M 850 100 L 700 50 L 600 20" 
            stroke="rgba(255,255,255,0.5)" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M 1070 980 L 1220 1030 L 1320 1060" 
            stroke="rgba(255,255,255,0.5)" strokeWidth="2" fill="none" strokeLinecap="round" />
        </g>
        
        {/* Tertiary fine cracks */}
        <g opacity="0.7">
          <path d="M 300 280 L 220 400 L 180 480" 
            stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          <path d="M 550 80 L 650 130 L 750 180" 
            stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          <path d="M 1620 350 L 1680 480 L 1720 560" 
            stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          <path d="M 1350 130 L 1250 180 L 1150 220" 
            stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          <path d="M 550 980 L 650 970 L 750 950" 
            stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          <path d="M 380 820 L 340 730 L 300 650" 
            stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        </g>
        
        {/* Additional radial micro-cracks from center */}
        <g opacity="0.6">
          <path d="M 960 540 L 860 440" stroke="rgba(255,255,255,0.7)" strokeWidth="2" fill="none" />
          <path d="M 960 540 L 1060 440" stroke="rgba(255,255,255,0.7)" strokeWidth="2" fill="none" />
          <path d="M 960 540 L 860 640" stroke="rgba(255,255,255,0.7)" strokeWidth="2" fill="none" />
          <path d="M 960 540 L 1060 640" stroke="rgba(255,255,255,0.7)" strokeWidth="2" fill="none" />
          <path d="M 960 540 L 920 500" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" fill="none" />
          <path d="M 960 540 L 1000 500" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" fill="none" />
          <path d="M 960 540 L 920 580" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" fill="none" />
          <path d="M 960 540 L 1000 580" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" fill="none" />
          <path d="M 960 540 L 820 540" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" fill="none" />
          <path d="M 960 540 L 1100 540" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" fill="none" />
          <path d="M 960 540 L 960 420" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" fill="none" />
          <path d="M 960 540 L 960 660" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" fill="none" />
        </g>
        
        {/* Glass fragments/shatter pieces near impact */}
        <g opacity="0.4">
          <polygon points="860,440 900,420 920,460" fill="rgba(255,255,255,0.5)" />
          <polygon points="1020,480 1080,460 1040,520" fill="rgba(255,255,255,0.45)" />
          <polygon points="920,560 960,600 880,590" fill="rgba(255,255,255,0.5)" />
          <polygon points="1000,440 1040,420 1060,460" fill="rgba(255,255,255,0.4)" />
          <polygon points="840,520 870,490 890,530" fill="rgba(255,255,255,0.45)" />
          <polygon points="1030,560 1070,540 1050,590" fill="rgba(255,255,255,0.4)" />
        </g>
      </svg>
      
      <div className="w-[420px] rounded-lg shadow-2xl overflow-hidden animate-shake z-10">
        {/* Top Section - Blue Windows Defender Alert */}
        <div className="bg-[#0078D4] text-white p-4">
          <div className="flex items-start gap-3 mb-2">
            <MdSecurity className="w-10 h-10 flex-shrink-0" />
            <div className="flex-1">
              <h2 className="font-semibold text-[15px] mb-1">Congratulations! You've Won a Virus! 🎉</h2>
            </div>
          </div>
          <div className="text-[12px] space-y-0.5 ml-[52px]">
            <p>OMG! We found 9,999 viruses (totally legit)</p>
            <p>Please panic immediately and click suspicious links</p>
            <p className="mt-2 font-semibold">Your wallet needs an urgent 'update' 💰</p>
          </div>
        </div>

        {/* Bottom Section - Dark Notification */}
        <div className="bg-[#2D2D2D] text-white p-3">
          {/* Notification Header */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <FiBell className="w-4 h-4" />
              <span className="text-[11px] text-gray-300">xndiqv.actarpluctess.com</span>
            </div>
            <div className="flex items-center gap-2">
              <button className="hover:bg-[#3d3d3d] rounded p-0.5 transition-colors">
                <FiMoreHorizontal className="w-4 h-4" />
              </button>
              <button 
                onClick={onClose}
                className="hover:bg-[#3d3d3d] rounded p-0.5 transition-colors"
              >
                <FiX className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Notification Content */}
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 mt-1">
              <div className="w-10 h-10 bg-[#0078D4] rounded flex items-center justify-center">
                <MdSecurity className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-start gap-1 mb-1">
                <AiFillWarning className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                <h3 className="text-[13px] font-semibold leading-tight">SUPER_DANGEROUS_VIRUS.EXE DETECTED (NOT)</h3>
              </div>
              <p className="text-[11px] text-blue-400 cursor-pointer hover:underline mb-1">
                Click Here To Donate Your Bank Account 🤑
              </p>
              <p className="text-[10px] text-gray-400">via Microsoft Edge</p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
        
        /* Crack animations */
        @keyframes crackSpread {
          0% {
            stroke-dasharray: 1000;
            stroke-dashoffset: 1000;
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            stroke-dashoffset: 0;
            opacity: 1;
          }
        }
        
        @keyframes impactGlow {
          0% {
            opacity: 0;
            transform: scale(0.5);
          }
          50% {
            opacity: 0.6;
          }
          100% {
            opacity: 0.4;
            transform: scale(1);
          }
        }
        
        @keyframes fragmentFall {
          0% {
            opacity: 0;
            transform: scale(0) rotate(0deg);
          }
          50% {
            opacity: 0.5;
          }
          100% {
            opacity: 0.4;
            transform: scale(1) rotate(15deg);
          }
        }
        
        /* Apply animations to crack groups */
        svg circle {
          animation: impactGlow 0.6s ease-out forwards;
        }
        
        svg g:nth-of-type(1) path {
          animation: crackSpread 0.8s ease-out forwards;
        }
        
        svg g:nth-of-type(1) path:nth-child(1) {
          animation-delay: 0s;
        }
        
        svg g:nth-of-type(1) path:nth-child(2) {
          animation-delay: 0.05s;
        }
        
        svg g:nth-of-type(1) path:nth-child(3) {
          animation-delay: 0.1s;
        }
        
        svg g:nth-of-type(1) path:nth-child(4) {
          animation-delay: 0.15s;
        }
        
        svg g:nth-of-type(1) path:nth-child(5) {
          animation-delay: 0.08s;
        }
        
        svg g:nth-of-type(1) path:nth-child(6) {
          animation-delay: 0.12s;
        }
        
        svg g:nth-of-type(1) path:nth-child(7) {
          animation-delay: 0.06s;
        }
        
        svg g:nth-of-type(1) path:nth-child(8) {
          animation-delay: 0.14s;
        }
        
        svg g:nth-of-type(2) path {
          animation: crackSpread 0.6s ease-out forwards;
        }
        
        svg g:nth-of-type(2) path:nth-child(1) {
          animation-delay: 0.2s;
        }
        
        svg g:nth-of-type(2) path:nth-child(2) {
          animation-delay: 0.22s;
        }
        
        svg g:nth-of-type(2) path:nth-child(3) {
          animation-delay: 0.24s;
        }
        
        svg g:nth-of-type(2) path:nth-child(4) {
          animation-delay: 0.26s;
        }
        
        svg g:nth-of-type(2) path:nth-child(5) {
          animation-delay: 0.28s;
        }
        
        svg g:nth-of-type(2) path:nth-child(6) {
          animation-delay: 0.3s;
        }
        
        svg g:nth-of-type(2) path:nth-child(7) {
          animation-delay: 0.32s;
        }
        
        svg g:nth-of-type(2) path:nth-child(8) {
          animation-delay: 0.34s;
        }
        
        svg g:nth-of-type(2) path:nth-child(9) {
          animation-delay: 0.25s;
        }
        
        svg g:nth-of-type(2) path:nth-child(10) {
          animation-delay: 0.27s;
        }
        
        svg g:nth-of-type(3) path {
          animation: crackSpread 0.5s ease-out forwards;
        }
        
        svg g:nth-of-type(3) path:nth-child(1) {
          animation-delay: 0.36s;
        }
        
        svg g:nth-of-type(3) path:nth-child(2) {
          animation-delay: 0.38s;
        }
        
        svg g:nth-of-type(3) path:nth-child(3) {
          animation-delay: 0.4s;
        }
        
        svg g:nth-of-type(3) path:nth-child(4) {
          animation-delay: 0.42s;
        }
        
        svg g:nth-of-type(3) path:nth-child(5) {
          animation-delay: 0.44s;
        }
        
        svg g:nth-of-type(3) path:nth-child(6) {
          animation-delay: 0.46s;
        }
        
        svg g:nth-of-type(4) path {
          animation: crackSpread 0.4s ease-out forwards;
        }
        
        svg g:nth-of-type(4) path:nth-child(1),
        svg g:nth-of-type(4) path:nth-child(2),
        svg g:nth-of-type(4) path:nth-child(3),
        svg g:nth-of-type(4) path:nth-child(4) {
          animation-delay: 0.1s;
        }
        
        svg g:nth-of-type(4) path:nth-child(5),
        svg g:nth-of-type(4) path:nth-child(6),
        svg g:nth-of-type(4) path:nth-child(7),
        svg g:nth-of-type(4) path:nth-child(8) {
          animation-delay: 0.15s;
        }
        
        svg g:nth-of-type(4) path:nth-child(9),
        svg g:nth-of-type(4) path:nth-child(10),
        svg g:nth-of-type(4) path:nth-child(11),
        svg g:nth-of-type(4) path:nth-child(12) {
          animation-delay: 0.2s;
        }
        
        svg g:nth-of-type(5) polygon {
          animation: fragmentFall 0.8s ease-out forwards;
        }
        
        svg g:nth-of-type(5) polygon:nth-child(1) {
          animation-delay: 0.5s;
        }
        
        svg g:nth-of-type(5) polygon:nth-child(2) {
          animation-delay: 0.52s;
        }
        
        svg g:nth-of-type(5) polygon:nth-child(3) {
          animation-delay: 0.54s;
        }
        
        svg g:nth-of-type(5) polygon:nth-child(4) {
          animation-delay: 0.56s;
        }
        
        svg g:nth-of-type(5) polygon:nth-child(5) {
          animation-delay: 0.58s;
        }
        
        svg g:nth-of-type(5) polygon:nth-child(6) {
          animation-delay: 0.6s;
        }
      `}</style>
    </div>
  );
};

export default VirusModel;
