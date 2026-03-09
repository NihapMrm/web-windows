import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, RoundedBox, Html } from '@react-three/drei';
import * as THREE from 'three';
import App from '../App';
import Beams from './Beams';
import HeroSection from './HeroSection';
import FullscreenToggle from './FullscreenToggle';
import FullscreenNotification from './FullscreenNotification';


// ─── INTERACTIVE SCREEN APP ───────────────────────────────────────────────────
function ScreenApp() {
  return (
    <div style={{
      width: '1250px',
      height: '800px',
    
      boxSizing: 'border-box',
      overflow: 'hidden',
      fontSize: '10px',
      border: '1px solid #1a3a5c',
      borderRadius: '8px'
    }}>
      <App />
    </div>
  );
}

// ─── LID (screen half) ───────────────────────────────────────────────────────
function Lid({ open }) {
  const lidRef = useRef();
  const targetAngle = open ? -Math.PI * 0.05 : Math.PI * 0.49;

  useFrame(() => {
    if (!lidRef.current) return;
    lidRef.current.rotation.x = THREE.MathUtils.lerp(
      lidRef.current.rotation.x,
      targetAngle,
      0.07
    );
  });

  return (
    <group ref={lidRef} position={[0, 0.06, -0.95]}>
      {/* Lid body - thinner, more modern */}
      <RoundedBox args={[3.3, 2.2, 0.05]} radius={0.04} smoothness={4} position={[0, 1.1, 0]}>
        <meshStandardMaterial
          color="#18191a" 
          metalness={0.9} 
          roughness={0.15} 
          envMapIntensity={1.2}
        />
      </RoundedBox>

      {/* Screen bezel - thinner bezels for modern look */}
      <mesh position={[0, 1.1, 0.028]}>
        <boxGeometry args={[3.2, 2.05, 0.002]} />
        <meshStandardMaterial color="#000000" />
      </mesh>

      {/* ── INTERACTIVE HTML SCREEN ── */}
<Html
  position={[0, 1.1, 0.032]}
  transform
  occlude
  style={{ pointerEvents: open ? 'auto' : 'none' }}
  scale={0.1}
>
  <ScreenApp />
</Html>

      {/* Modern minimal logo */}
      <mesh position={[0, 1.1, -0.028]}>
        <circleGeometry args={[0.15, 32]} />
        <meshStandardMaterial 
          color="#b8b8bb" 
          emissive="#ffffff" 
          emissiveIntensity={0.3} 
          metalness={0.95} 
          roughness={0.05} 
        />
      </mesh>

      {/* Camera dot - smaller modern camera */}
      <mesh position={[0, 2.14, 0.031]}>
        <circleGeometry args={[0.02, 16]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
    </group>
  );
}

// ─── BASE (keyboard half) ─────────────────────────────────────────────────────
function Base() {

  const unit = 0.18;
  const keys = [];

  const layout = [
    // Row 1
    [
      {k:"Esc", w:1},{k:"1", w:1},{k:"2", w:1},{k:"3", w:1},{k:"4", w:1},
      {k:"5", w:1},{k:"6", w:1},{k:"7", w:1},{k:"8", w:1},{k:"9", w:1},
      {k:"0", w:1},{k:"-", w:1},{k:"=", w:1},{k:"Backspace", w:2}
    ],

    // Row 2
    [
      {k:"Tab", w:1.5},{k:"Q", w:1},{k:"W", w:1},{k:"E", w:1},{k:"R", w:1},
      {k:"T", w:1},{k:"Y", w:1},{k:"U", w:1},{k:"I", w:1},{k:"O", w:1},
      {k:"P", w:1},{k:"[", w:1},{k:"]", w:1},{k:"\\", w:1.5}
    ],

    // Row 3
    [
      {k:"Caps", w:1.75},{k:"A", w:1},{k:"S", w:1},{k:"D", w:1},{k:"F", w:1},
      {k:"G", w:1},{k:"H", w:1},{k:"J", w:1},{k:"K", w:1},{k:"L", w:1},
      {k:";", w:1},{k:"'", w:1},{k:"Enter", w:2.25}
    ],

    // Row 4
    [
      {k:"Shift", w:2.25},{k:"Z", w:1},{k:"X", w:1},{k:"C", w:1},{k:"V", w:1},
      {k:"B", w:1},{k:"N", w:1},{k:"M", w:1},{k:",", w:1},{k:".", w:1},
      {k:"/", w:1},{k:"Shift", w:2.75}
    ],

    // Row 5
    [
      {k:"Ctrl", w:1.25},{k:"Win", w:1.25},{k:"Alt", w:1.25},
      {k:"Space", w:6.25},
      {k:"Alt", w:1.25},{k:"Fn", w:1},{k:"Menu", w:1},{k:"Ctrl", w:1.25}
    ]
  ];


  const rowZ = [-0.4, -0.2, 0, 0.2, 0.4];

  layout.forEach((row,rowIndex)=>{

    let totalUnits = row.reduce((sum,k)=>sum+k.w,0);
    let startX = -(totalUnits * unit)/2;

    let cursor = startX;

    row.forEach(key=>{

      const width = key.w * unit;

      keys.push({
        label:key.k,
        x:cursor + width/2,
        z:rowZ[rowIndex],
        width:width
      });

      cursor += width;

    });

  });



  return (
    <group>
      {/* Thinner, more modern base */}
      <RoundedBox args={[3.3, 0.12, 1.85]} radius={0.04} smoothness={4} position={[0, 0, 0]}>
        <meshStandardMaterial 
          color="#18191a" 
          metalness={0.9} 
          roughness={0.12} 
          envMapIntensity={1.2}
        />
      </RoundedBox>
      
      {/* Top panel - aluminum texture */}
      <mesh position={[0, 0.062, 0]}>
        <boxGeometry args={[3.26, 0.002, 1.81]} />
        <meshStandardMaterial 
          color="#1a1b1c" 
          metalness={0.8} 
          roughness={0.25} 
        />
      </mesh>
      
      {/* Keyboard area recess */}
      <mesh position={[0, 0.064, -0.25]}>
        <boxGeometry args={[2.9, 0.002, 1.0]} />
        <meshStandardMaterial color="#0d0d0f" roughness={0.9} />
      </mesh>
      
      {/* Modern low-profile keys */}
      {keys.map((k, i) => (
        <RoundedBox 
          key={i} 
          args={[k.width, 0.008, 0.16]} 
          radius={0.015} 
          smoothness={2}
          position={[k.x, 0.049, k.z - 0.25]}
        >
          <meshStandardMaterial 
            color="#2c2d30" 
            roughness={0.4} 
            metalness={0.3} 
          />
        </RoundedBox>
      ))}
      
 
      
      {/* Modern trackpad - larger and centered */}
      <RoundedBox 
        args={[1.1, 0.002, 0.7]} 
        radius={0.04} 
        smoothness={4} 
        position={[0, -0.02, 0.58]}
      >
        <meshStandardMaterial 
          color="#1c1d1f" 
          metalness={0.6} 
          roughness={0.3} 
        />
      </RoundedBox>
      
      {/* Hinge */}
      <mesh position={[0, 0.03, -0.92]}>
        <boxGeometry args={[3.0, 0.06, 0.04]} />
        <meshStandardMaterial 
          color="#0f1011" 
          metalness={0.95} 
          roughness={0.08} 
        />
      </mesh>
      
      {/* Rubber feet - more subtle */}
      {[[-1.45, -1.1], [1.45, -1.1], [-1.45, 0.8], [1.45, 0.8]].map(([x, z], i) => (
        <mesh key={i} position={[x, -0.062, z]}>
          <cylinderGeometry args={[0.04, 0.04, 0.015, 16]} />
          <meshStandardMaterial color="#0a0a0a" roughness={1} />
        </mesh>
      ))}
    </group>
  );
}

// ─── Full Laptop ──────────────────────────────────────────────────────────────
function LaptopModel({ open }) {
  return (
    <group position={[0, -1, 2]}>
      <Base />
      <Lid open={open} />
    </group>
  );
}


// ─── Exported Component ───────────────────────────────────────────────────────
export default function Laptop3D({ className = '' }) {
  const [open, setOpen] = useState(false);
  const [showHero, setShowHero] = useState(true);

  const handleStart = () => {
    setShowHero(false);
    setOpen(true);
  };
  

  return (
    <div className={`laptop3d-wrapper ${className}`} style={{ width: '100%', height: '100vh', position: 'relative', overflow: 'hidden' }}>
        <FullscreenToggle />
            <FullscreenNotification />
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
        <Beams
          beamWidth={3}
          beamHeight={30}
          beamNumber={20}
          lightColor="#ffffff"
          speed={2}
          noiseIntensity={1.75}
          scale={0.2}
          rotation={30}
        />
      </div>

      {/* 3D Laptop Canvas */}
      <div style={{ position: 'relative', width: '100%', height: '100%', zIndex: 1 }}>
        <Canvas camera={{ position: [0, -5, 0], fov: 45 }} shadows gl={{ antialias: true }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 8, 5]} intensity={1.5} castShadow shadow-mapSize={[2048, 2048]} />
          <pointLight position={[-4, 4, -4]} intensity={0.8} color="#4a5b7a" />
          <pointLight position={[4, 2, 4]} intensity={0.6} color="#ffffff" />
          <spotLight position={[0, 5, 0]} intensity={0.3} angle={0.5} penumbra={1} />

          <LaptopModel open={open} />

          <ContactShadows position={[0, -0.12, 0]} opacity={0.5} scale={6} blur={2.5} far={1} />
          <Environment preset="city" />
          <OrbitControls
            enablePan={false}
            enableZoom={false}
            enableRotate={false}
            minPolarAngle={Math.PI / 6}
            maxPolarAngle={Math.PI / 2.2}
            minDistance={2}
            maxDistance={7}
          />
        </Canvas>

        {/* Hero Section */}
        <HeroSection show={showHero} onStart={handleStart} />

        {/* Close Lid Button */}
        {open && !showHero && (
          <button
            onClick={() => {
              setOpen(false);
              setTimeout(() => setShowHero(true), 700); // 700ms delay before showing hero
            }}
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              background: '#ffffff',
              color: '#000000',
              padding: '8px 18px',
              borderRadius: '1000px',
              cursor: 'pointer',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              fontSize: '0.9rem',
              fontWeight: '500',
              backdropFilter: 'blur(10px)',
              transition: 'all 0.2s ease',
              zIndex: 10,
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(86, 182, 247, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'rgba(28, 28, 30, 0.8)';
            }}
          >
            ✕ Close Lid
          </button>
        )}
      </div>
    </div>
  );
}