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

/**
 * Robust check for WebGL support.
 */
const isWebGLSupported = (): boolean => {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    return !!(window.WebGLRenderingContext && gl);
  } catch (e) {
    return false;
  }
};

export const VantaBackground: React.FC = () => {
  const vantaRef = useRef<HTMLDivElement>(null);
  const vantaEffectRef = useRef<any>(null);
  const [useFallback, setUseFallback] = useState(false);

  useEffect(() => {
    // Check if the user prefers reduced motion for accessibility
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setUseFallback(true);
      return;
    }

    // Immediate check for WebGL support
    if (!isWebGLSupported()) {
      console.warn('WebGL is not supported in this environment. Using fallback background.');
      setUseFallback(true);
      return;
    }
    
    let checkVantaInterval: number;

    const initVanta = () => {
      if (window.VANTA && window.THREE && vantaRef.current) {
        if (checkVantaInterval) clearInterval(checkVantaInterval);
        
        if (!vantaEffectRef.current) {
          try {
            vantaEffectRef.current = window.VANTA.GLOBE({
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
            setUseFallback(false);
          } catch (error) {
            console.error('Vanta initialization failed (likely WebGL related):', error);
            setUseFallback(true);
          }
        }
      }
    };

    if (window.VANTA && window.THREE) {
        initVanta();
    } else {
        // Scripts might be deferred. Check for them for up to 5 seconds.
        let checks = 0;
        checkVantaInterval = window.setInterval(() => {
            checks++;
            if (window.VANTA && window.THREE) {
                initVanta();
            } else if (checks > 20) { // 20 * 250ms = 5 seconds
                clearInterval(checkVantaInterval);
                console.warn('Vanta.js or Three.js scripts did not load in time, using fallback background.');
                setUseFallback(true);
            }
        }, 250);
    }

    // Cleanup function to destroy the effect on component unmount
    return () => {
      if (checkVantaInterval) clearInterval(checkVantaInterval);
      if (vantaEffectRef.current) {
        vantaEffectRef.current.destroy();
        vantaEffectRef.current = null;
      }
    };
  }, []); // Run only on mount and unmount

  // Render a static fallback background for accessibility or if scripts fail
  if (useFallback) {
    return <div className="fixed top-0 left-0 w-full h-full -z-10 grid-bg-fallback" />;
  }

  // Render the div that Vanta will attach its 3D canvas to
  return <div ref={vantaRef} className="fixed top-0 left-0 w-full h-full -z-10 bg-slate-950" />;
};