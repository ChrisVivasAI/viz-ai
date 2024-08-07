'use client';

import React, { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

interface MermaidDiagramProps {
  chart: string;
}

const MermaidDiagram: React.FC<MermaidDiagramProps> = ({ chart }) => {
  const mermaidRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mermaidRef.current) {
      mermaid.initialize({ startOnLoad: true, theme: 'dark' });
      mermaid.run({ nodes: [mermaidRef.current] });
    }
  }, [chart]);

  return (
    <div ref={mermaidRef} className="mermaid">
      {chart}
    </div>
  );
};

export default MermaidDiagram;