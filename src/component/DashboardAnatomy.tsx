'use client';

import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const AnatomyVisualization = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const width = 400, height = 600;
    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .style('background', '#f5f5f5');
    
    // Draw torso
    svg.append('rect')
      .attr('x', 150)
      .attr('y', 100)
      .attr('width', 100)
      .attr('height', 300)
      .attr('fill', '#d9a066');
    
    // Draw heart
    svg.append('circle')
      .attr('cx', 200)
      .attr('cy', 200)
      .attr('r', 30)
      .attr('fill', 'red');
    
    // Labels
    const labels = [
      { text: 'Blood', x: 250, y: 150 },
      { text: 'Sugar Level', x: 250, y: 220 },
      { text: 'Heartbeat Health', x: 250, y: 250 }
    ];

    labels.forEach(label => {
      svg.append('text')
        .attr('x', label.x)
        .attr('y', label.y)
        .text(label.text)
        .attr('fill', 'black')
        .attr('font-size', '14px');
      
      svg.append('line')
        .attr('x1', label.x - 10)
        .attr('y1', label.y - 5)
        .attr('x2', 200)
        .attr('y2', 200)
        .attr('stroke', 'black');
    });
  }, []);

  return <svg ref={svgRef}></svg>;
};

export default AnatomyVisualization;
