"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";
import { useLayoutEffect } from "react";

// ...
const RadarGraph = (props:any) => {
  const [dimensions, setDimensions] = useState({ width: 500, height: 246 });
  const containerRef = useRef(null);
  const [fontSize, setFontSize] = useState(22);
 
  useLayoutEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      const newFontSize = screenWidth < 768 ? 10 : 22; // Adjust the font size based on the screen width
      setFontSize(newFontSize);
    };

    handleResize(); // Call the function initially

    window.addEventListener("resize", handleResize); // Add event listener for window resize

    return () => {
      window.removeEventListener("resize", handleResize); // Clean up the event listener
    };
  }, []);
  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      const { width, height } = entries[0]?.contentRect || {}; // Add null check
      setDimensions({ width: width || 0, height: height || 0 }); // Add null check
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        resizeObserver.unobserve(containerRef.current);
      }
    };
  }, [containerRef]);
  const data = [
    { name: "Mindfulness", x: props?.mind },
    { name: "Wealth", x: props?.wealth },
    { name: "Relationship", x: props?.relationship },
    { name: "Fitness", x: props?.fit },
  ];

  return (
    <div className="flex  w-[100%] flex-col rounded-xl border border-gray-200 bg-white px-10 py-5 text-3xl font-semibold shadow-lg">
      <div>Life update</div>
      <div ref={containerRef} style={{ width: "100%", height: "100%" }}>
        <RadarChart
          width={dimensions.width}
          height={dimensions.width}
          outerRadius="70%"
          data={data}
        >
          <PolarGrid />

          <PolarAngleAxis dataKey="name" fontSize={fontSize} />
          <PolarRadiusAxis fontSize={fontSize} />
          <Radar dataKey="x" stroke="blue" fill="#BCDCFF" fillOpacity={0.5} />
        </RadarChart>
      </div>
    </div>
  );
};

export default RadarGraph;
