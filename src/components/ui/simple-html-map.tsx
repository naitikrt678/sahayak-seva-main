import React, { useEffect, useRef } from 'react';

interface SimpleHtmlMapProps {
  height?: string;
}

export const SimpleHtmlMap: React.FC<SimpleHtmlMapProps> = ({ height = '300px' }) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mapRef.current) {
      // Create a simple test using just HTML and CSS
      mapRef.current.innerHTML = `
        <div style="
          width: 100%; 
          height: 100%; 
          background: linear-gradient(45deg, #e3f2fd 25%, #bbdefb 25%, #bbdefb 50%, #e3f2fd 50%, #e3f2fd 75%, #bbdefb 75%, #bbdefb);
          background-size: 20px 20px;
          position: relative;
          border: 2px solid #1976d2;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
        ">
          <div style="
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
            text-align: center;
            max-width: 300px;
          ">
            <h3 style="margin: 0 0 10px 0; color: #1976d2;">Map Container Test</h3>
            <p style="margin: 0 0 10px 0; font-size: 14px;">This simulates a map background.</p>
            <p style="margin: 0 0 10px 0; font-size: 12px; color: #666;">
              If you see this, React component rendering works.
            </p>
            <div style="
              width: 20px; 
              height: 20px; 
              background: red; 
              border-radius: 50%; 
              margin: 10px auto;
              border: 3px solid white;
              box-shadow: 0 2px 4px rgba(0,0,0,0.3);
            "></div>
            <p style="margin: 0; font-size: 12px; color: #666;">
              📍 Jharkhand, India (23.61, 85.28)
            </p>
          </div>
        </div>
      `;
    }
  }, []);

  return (
    <div 
      ref={mapRef}
      style={{ height, width: '100%' }}
    />
  );
};