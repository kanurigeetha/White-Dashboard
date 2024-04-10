// Canvas.js
import React, { useRef, useEffect } from 'react';

const Canvas = ({ drawing, onDraw }) => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.lineCap = 'round';
    context.strokeStyle = 'black';
    context.lineWidth = 5;
    contextRef.current = context;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawing.forEach((action) => {
      if (action.type === 'draw') {
        const { x, y, color, size } = action.payload;
        context.strokeStyle = color;
        context.lineWidth = size;
        context.lineTo(x, y);
        context.stroke();
      }
    });
  }, [drawing]);

  const handleMouseDown = (event) => {
    const { offsetX, offsetY } = event.nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    onDraw({ type: 'draw', payload: { x: offsetX, y: offsetY } });
  };

  const handleMouseMove = (event) => {
    const { offsetX, offsetY } = event.nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
    onDraw({ type: 'draw', payload: { x: offsetX, y: offsetY } });
  };

  const handleMouseUp = () => {
    contextRef.current.closePath();
  };

  return (
    <canvas
      ref={canvasRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      width={800} // Adjust as needed
      height={600} // Adjust as needed
    />
  );
};

export default Canvas;
