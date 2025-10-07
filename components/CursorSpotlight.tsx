import React, { useEffect } from 'react';

export const CursorSpotlight: React.FC = () => {
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      // Use documentElement for better compatibility
      document.documentElement.style.setProperty('--mouse-x', `${event.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${event.clientY}px`);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return <div className="cursor-spotlight" />;
};