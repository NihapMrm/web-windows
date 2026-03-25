import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, RoundedBox, Html } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import App from '../App';
import HeroSection from './HeroSection';
import FullscreenToggle from './FullscreenToggle';
import FullscreenNotification from './FullscreenNotification';
import FaultyTerminal from './FaultyTerminal';


// ─── INTERACTIVE SCREEN APP ───────────────────────────────────────────────────
function ScreenApp() {
  return (
    <div style={{
      width: '100%',
      height: '100%',
      background: 'transparent',
      boxSizing: 'border-box',
      overflow: 'hidden',
      fontSize: '10px',
      borderRadius: '8px',
    }}>
   
    </div>
  );
}

// ─── LID (screen half) ───────────────────────────────────────────────────────
function Lid({ progressRef }) {
  const lidRef = useRef();
  const [interactive, setInteractive] = useState(false);
  const interactiveRef = useRef(false);

  useFrame(() => {
    if (!lidRef.current) return;
    const p = Math.min(1, progressRef.current); // clamp: lid only uses 0→1
    const targetAngle = THREE.MathUtils.lerp(Math.PI * 0.49, -Math.PI * 0.05, p);
    lidRef.current.rotation.x = THREE.MathUtils.lerp(
      lidRef.current.rotation.x,
      targetAngle,
      0.08
    );
    const next = p > 0.9;
    if (next !== interactiveRef.current) {
      interactiveRef.current = next;
      setInteractive(next);
    }
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

      {/* Screen bezel - glass transparent */}
      <mesh position={[0, 1.1, 0.028]}>
        <boxGeometry args={[3.2, 2.05, 0.002]} />
        <meshStandardMaterial color="#88aaff" transparent opacity={0.08} roughness={0} metalness={0.1} />
      </mesh>

      {/* ── INTERACTIVE HTML SCREEN ── */}
<Html
  position={[0, 1.1, 0.032]}
  transform
  occlude
  style={{ pointerEvents: interactive ? 'auto' : 'none' }}
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
function LaptopModel({ progressRef }) {
  const groupRef = useRef();

  useFrame(() => {
    if (!groupRef.current) return;
    // Phase 2 (p 1→2): scale laptop up toward camera
    // Zoom starts at p=1.3, giving lid time to fully settle
    const zoomP = Math.max(0, (progressRef.current - 1.3) / 0.7); // 0→1 over p 1.3→2
    const scale = THREE.MathUtils.lerp(1, 3.5, zoomP);
    groupRef.current.scale.setScalar(scale);
  });

  // ↓ pivot controls WHERE the scale originates (x, y, z)
  // e.g. [0, 0, 2]  → scales from screen center
  //      [0, -1, 2] → scales from laptop base
  //      [0, 0.5, 2] → scales from above center
  const PIVOT = [0, 0.5, 2];

  return (
    // Pivot group — this is the scale origin
    <group ref={groupRef} position={PIVOT}>
      {/* Offset content so it stays visually centred */}
      <group position={[0 - PIVOT[0], -1 - PIVOT[1], 0]}>
        <Base />
        <Lid progressRef={progressRef} />
      </group>
    </group>
  );
}


// ─── Exported Component ───────────────────────────────────────────────────────
export default function Laptop3D({ className = '' }) {
  const [showHero, setShowHero] = useState(true);
  const progressRef = useRef(0);
  const wrapperRef = useRef();
  const canvasWrapRef = useRef();
  const appOverlayRef = useRef();
  // GSAP proxy object — gsap tweens this, useFrame reads it
  const gsapProxy = useRef({ p: 0 });

  const syncOpacity = () => {
    const p3 = Math.max(0, Math.min(1, gsapProxy.current.p - 2));
    if (canvasWrapRef.current) canvasWrapRef.current.style.opacity = 1 - p3;
    if (appOverlayRef.current) {
      appOverlayRef.current.style.opacity = p3;
      appOverlayRef.current.style.pointerEvents = p3 > 0.5 ? 'auto' : 'none';
    }
  };

  useEffect(() => {
    const el = wrapperRef.current;
    const handleWheel = (e) => {
      // Once App is fully visible, don't intercept — let App scroll normally
      if (gsapProxy.current.p >= 3) return;
      e.preventDefault();
      const currentP = gsapProxy.current.p;
      // Phase 1 (lid) fast, phase 2 (zoom) + phase 3 (fade) slower
      const divisor = currentP >= 2 ? 200 : currentP >= 1.3 ? 800 : 300;
      const target = Math.min(3, Math.max(0, currentP + e.deltaY / divisor));
      gsap.to(gsapProxy.current, {
        p: target,
        duration: 0.6,
        ease: 'power3.out',
        overwrite: true,
        onUpdate: () => {
          progressRef.current = gsapProxy.current.p;
          setShowHero(gsapProxy.current.p < 0.05);
          syncOpacity();
        },
      });
    };
    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, []);

  const resetScene = () => {
    gsap.to(gsapProxy.current, {
      p: 0,
      duration: 1.4,
      ease: 'power2.inOut',
      overwrite: true,
      onUpdate: () => {
        progressRef.current = gsapProxy.current.p;
        setShowHero(gsapProxy.current.p < 0.05);
        syncOpacity();
      },
    });
  };

  const handleStart = () => {
    gsap.to(gsapProxy.current, {
      p: 1,
      duration: 1.6,
      ease: 'power2.inOut',
      overwrite: true,
      onUpdate: () => {
        progressRef.current = gsapProxy.current.p;
        setShowHero(gsapProxy.current.p < 0.05);
        syncOpacity();
      },
    });
  };
  

  return (
    <div ref={wrapperRef} className={`laptop3d-wrapper ${className}`} style={{ width: '100%', height: '100vh', position: 'relative', overflow: 'hidden' }}>
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
       
      }}>
          <FaultyTerminal
    scale={1.5}
    gridMul={[2, 1]}
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

      {/* 3D Laptop Canvas */}
      <div ref={canvasWrapRef} style={{ position: 'relative', width: '100%', height: '100%', zIndex: 1, pointerEvents: 'none' }}>
        <Canvas camera={{ position: [0, -5, 0], fov: 45 }} shadows gl={{ antialias: true }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 8, 5]} intensity={1.5} castShadow shadow-mapSize={[2048, 2048]} />
          <pointLight position={[-4, 4, -4]} intensity={0.8} color="#4a5b7a" />
          <pointLight position={[4, 2, 4]} intensity={0.6} color="#ffffff" />
          <spotLight position={[0, 5, 0]} intensity={0.3} angle={0.5} penumbra={1} />

          <LaptopModel progressRef={progressRef} />

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

        {/* Scroll hint */}
        {showHero === false && progressRef.current < 0.15 && (
          <div style={{
            position: 'absolute',
            bottom: '24px',
            left: '50%',
            transform: 'translateX(-50%)',
            color: 'rgba(255,255,255,0.4)',
            fontSize: '0.75rem',
            letterSpacing: '0.1em',
            pointerEvents: 'none',
            zIndex: 10,
          }}>
            scroll to open
          </div>
        )}
      </div>

      {/* App overlay — fades in during phase 3 */}
      <div
        ref={appOverlayRef}
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 2,
          opacity: 0,
          pointerEvents: 'none',
          overflowY: 'auto',
          height: '100%',
        }}
      >
        <App onBack={resetScene} />
      </div>
    </div>
  );
}