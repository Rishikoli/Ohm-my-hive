import React, { useEffect, useState } from 'react';
import '../styles/BeeTrail.css';

const BeeTrail = () => {
  const [bees, setBees] = useState([]);
  const maxBees = 8;
  const beeLifespan = 800; // milliseconds

  useEffect(() => {
    let lastTime = 0;
    const throttleInterval = 50; // ms between particle creation

    const createBee = (x, y) => {
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * 100 + 50;
      const tx = Math.cos(angle) * distance;
      const ty = Math.sin(angle) * distance;
      
      return {
        id: Date.now() + Math.random(),
        x,
        y,
        tx,
        ty,
      };
    };

    const handleMouseMove = (e) => {
      const currentTime = Date.now();
      if (currentTime - lastTime < throttleInterval) return;
      lastTime = currentTime;

      const newBee = createBee(e.clientX, e.clientY);

      setBees((prevBees) => {
        const updatedBees = [...prevBees, newBee];
        if (updatedBees.length > maxBees) {
          return updatedBees.slice(1);
        }
        return updatedBees;
      });

      setTimeout(() => {
        setBees((prevBees) => prevBees.filter((bee) => bee.id !== newBee.id));
      }, beeLifespan);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      {bees.map((bee) => (
        <div
          key={bee.id}
          className="bee-trail"
          style={{
            left: bee.x + 'px',
            top: bee.y + 'px',
            '--tx': `${bee.tx}px`,
            '--ty': `${bee.ty}px`,
            animation: `scatterFloat ${beeLifespan}ms forwards`,
          }}
        />
      ))}
    </>
  );
};

export default BeeTrail;
