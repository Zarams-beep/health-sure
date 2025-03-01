'use client';

import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const AnatomyDiagram = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const width = 500, height = 800;
    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .attr('class', 'anatomy-diagram');

    // Background image
    svg.append('image')
      .attr('xlink:href', '/3f9m_27g2_220113.jpg')
      .attr('x', 50)
      .attr('y', 10)
      .attr('width', 400)
      .attr('height', 780);

    const labels = [
      { text: 'Blood Pressure', value: '120/80 mmHg', x: 50, y: 100, side: 'left', trend: 'up' },
      { text: 'Heart Rate', value: '72 bpm', x: 450, y: 150, side: 'right', trend: 'down' },
      { text: 'Blood Sugar', value: '95 mg/dL', x: 50, y: 200, side: 'left', trend: 'down' },
      { text: 'Lung Capacity', value: '5.5L', x: 450, y: 250, side: 'right', trend: 'up' },
      { text: 'Muscle Strength', value: '85%', x: 50, y: 300, side: 'left', trend: 'up' },
      { text: 'Gut Health', value: 'Good', x: 450, y: 350, side: 'right', trend: 'down' },
      { text: 'Brain Activity', value: 'High', x: 50, y: 400, side: 'left', trend: 'up' },
      { text: 'Immune Defense', value: 'Strong', x: 450, y: 450, side: 'right', trend: 'down' },
    ];

    labels.forEach(label => {
      const textX = label.side === 'left' ? label.x : label.x - 120;
      const lineX1 = label.side === 'left' ? label.x + 100 : label.x - 100;
      const lineX2 = label.side === 'left' ? 250 : 350;

      // Add text label with class
      const text = svg.append('text')
        .attr('x', textX)
        .attr('y', label.y)
        .text(label.text)
        .attr('class', 'anatomy-label') // Added class for styling
        .style('cursor', 'pointer');

      // Tooltip (hidden initially)
      const tooltip = svg.append('text')
        .attr('x', textX)
        .attr('y', label.y - 20)
        .text(`${label.value} ${label.trend === 'up' ? '📈' : '📉'}`)
        .attr('class', 'tooltip')
        .style('opacity', 0); // Hide tooltip initially

      // Add hover effect
      text.on('mouseover', function () {
        tooltip.style('opacity', 1); // Show tooltip
      })
        .on('mouseout', function () {
          tooltip.style('opacity', 0); // Hide tooltip
        });

      // Add connecting line
      svg.append('line')
        .attr('x1', lineX1)
        .attr('y1', label.y - 5)
        .attr('x2', lineX2)
        .attr('y2', label.y)
        .attr('class', 'anatomy-line'); // Added class for styling
    });
  }, []);

  return <div className="diagram-container"><svg ref={svgRef}></svg></div>;
};

export default AnatomyDiagram;
