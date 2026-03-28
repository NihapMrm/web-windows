import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import FullscreenToggle from './FullscreenToggle';
import FullscreenNotification from './FullscreenNotification';
import FaultyTerminal from './FaultyTerminal';
import { Model } from './Scene';

export default function Laptop3D({ className = '' }) {
  const groupRef = useRef();
  const containerRef = useRef();

  useEffect(() => {
    if (!groupRef.current) return;
    let ctx = gsap.context(() => {
      gsap.to(groupRef.current.scale, {
        x: 3.2,
        y: 3.2,
        z: 3.2,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=400',
          scrub: true,
        },
      });
      gsap.to(groupRef.current.position, {
        z: 1.2,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=400',
          scrub: true,
        },
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className={`laptop3d-wrapper ${className}`} style={{ width: '100%', height: '100vh', position: 'relative', overflow: 'hidden' }}>
      <FullscreenToggle />
      <FullscreenNotification />
      {/* Claymorphism Background */}
      <div style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 0,
      }}>
        <div
          style={{
            width: '95%',
            height: '95vh',
            background: 'orange',
            backdropFilter: 'blur(5px)',
            backgroundColor: '#ff9627',
            borderRadius: '40px',
            boxShadow: '12px 12px 18px rgba(0, 0, 0, 0.3), inset -12px -12px 18px rgba(0, 0, 0, 0.3), inset 12px 12px 18px rgba(255, 255, 255, 0.6)',
            margin: 'auto',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        ></div>
      </div>

      <div style={{ position: 'relative', width: '100%', height: '100%', zIndex: 1, pointerEvents: 'auto' }}>
        <Canvas camera={{ position: [0, 1.2, 3.6], fov: 42 }} shadows gl={{ antialias: true }}>
          <ambientLight intensity={0.65} />
          <directionalLight position={[6, 8, 4]} intensity={1.6} castShadow shadow-mapSize={[2048, 2048]} />
          <pointLight position={[-3, 2, -2]} intensity={0.5} color="#90a8c8" />

          <group ref={groupRef} position={[0, -0.15, 0]} scale={2.2}>
            <Model />
          </group>

          <ContactShadows position={[0, -0.24, 0]} opacity={0.45} scale={5} blur={2.8} far={1.2} />
          <Environment preset="city" />
          <OrbitControls
            enablePan={false}
            enableZoom={false}
            enableRotate={false}
            minPolarAngle={Math.PI / 6}
            maxPolarAngle={Math.PI / 1.7}
            minDistance={2.2}
            maxDistance={7.5}
          />
        </Canvas>
      </div>
    </div>
  );
}