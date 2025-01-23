import React, { useEffect } from "react";
import "./HexagonBackground.css";

const HexagonBackground = () => {
  useEffect(() => {
    const cursor = document.querySelector(".cursor");
    let timeoutId;

    const handleMouseMove = (e) => {
      const x = e.pageX;
      const y = e.pageY;
      cursor.style.left = `${x - 175}px`;
      cursor.style.top = `${y - 175}px`;
      cursor.style.opacity = "1";

      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        cursor.style.opacity = "0";
      }, 1000);
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(timeoutId);
    };
  }, []);

  const renderHoneycomb = () => {
    const rows = 10;
    const hexagonsPerRow = 16;
    
    return Array.from({ length: rows }).map((_, rowIndex) => (
      <div className="row" key={rowIndex}>
        {Array.from({ length: hexagonsPerRow }).map((_, hexIndex) => (
          <div 
            className="hexagon" 
            key={`${rowIndex}-${hexIndex}`}
            style={{
              pointerEvents: 'auto',
              animationDelay: `${(rowIndex * hexagonsPerRow + hexIndex) * 0.05}s`
            }}
          />
        ))}
      </div>
    ));
  };

  return (
    <div className="hexagon-background">
      <div className="honeycomb">
        {renderHoneycomb()}
      </div>
      <div className="cursor" />
    </div>
  );
};

export default HexagonBackground;
