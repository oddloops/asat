import React, { useState, useEffect } from 'react';

export default function ColorExtraction() {
  const [colors, setColors] = useState([]);

  useEffect(() => {
    // Fetch the extracted colors from the Django backend API
    const fetchColors = async () => {
      try {
        const response = await fetch("http://localhost:8000/color_app/api/colors/");
        if (response.ok) {
          const data = await response.json();
          setColors(data);
        } else {
          console.error("Error fetching colors");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    // Call the fetchColors function
    fetchColors();
  }, []); // Empty dependency array ensures useEffect runs only once on component mount

  return (
    <div>
      <h1>Extracted Colors</h1>
      <ul>
        {colors.map((color, index) => (
          <li key={index}>{color}</li>
        ))}
      </ul>
    </div>
  );
}
