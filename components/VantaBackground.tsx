import React, { useState, useEffect, useRef } from 'react';

// Define types for Vanta and THREE on the window object for TypeScript
declare global {
  interface Window {
    THREE: any;
    VANTA: {
      GLOBE: (options: any) => any;
    };
  }
}

export const VantaBackground: React.FC = () => {
  const vantaRef = useRef<HTMLDivElement>(null);
  const [vantaEffect, setVantaEffect] = useState<any>(null);
  const [useFallback, setUseFallback] = useState(false);

  useEffect(() => {
    // Check if the user prefers reduced motion for accessibility
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setUseFallback(true);
      return;
    }
    
    // Check if the required Vanta and THREE scripts are loaded
    if (!window.VANTA || !window.THREE) {
      console.warn('Vanta.js or Three.js scripts not loaded, using fallback background.');
      setUseFallback(true);
      return;
    }

    // Initialize the Vanta effect if it hasn't been created yet
    if (!vantaEffect && vantaRef.current) {
      const effect = window.VANTA.GLOBE({
        el: vantaRef.current,
        THREE: window.THREE,
        mouseControls: false,
        touchControls: false,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,
        color: 0x14b8a6,      // Teal-500
        color2: 0x8b5cf6,     // Violet-500
        backgroundColor: 0x020617, // Slate-950
        size: 1.20
      });
      setVantaEffect(effect);
    }

    // Cleanup function to destroy the effect on component unmount
    return () => {
      if (vantaEffect) {
        vantaEffect.destroy();
        setVantaEffect(null);
      }
    };
  }, [vantaEffect]);
  
  // Render a static fallback background for accessibility
  if (useFallback) {
    return <div className="fixed top-0 left-0 w-full h-full -z-10 grid-bg-fallback" />;
  }

  // Render the div that Vanta will attach its 3D canvas to
  return <div ref={vantaRef} className="fixed top-0 left-0 w-full h-full -z-10" />;
};