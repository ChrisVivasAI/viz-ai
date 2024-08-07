'use client';

import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';

interface MermaidDiagramProps {
  projectId: string;
}

const MermaidDiagram: React.FC<MermaidDiagramProps> = ({ projectId }) => {
  const mermaidRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (mermaidRef.current) {
      mermaid.initialize({
        startOnLoad: true,
        theme: 'dark',
        securityLevel: 'loose',
        logLevel: 'error',
      });

      const diagram = `
        graph TD
          A[User Input] --> B[Natural Language Processing]
          B --> C{Intent Classification}
          C --> |Question| D[Question Answering Module]
          C --> |Command| E[Task Execution Module]
          C --> |Conversation| F[Dialogue Management]
          D --> G[Knowledge Base]
          E --> H[API Integrations]
          F --> I[Context Management]
          G --> J[Response Generation]
          H --> J
          I --> J
          J --> K[Natural Language Generation]
          K --> L[User Interface]
          L --> A

          classDef default fill:#2d2d2d,stroke:#7f7f7f,color:#fff;
          classDef highlight fill:#4b4b4b,stroke:#a9a9a9,color:#fff,font-weight:bold;
          class A,B,C,J,K,L highlight;
      `;

      try {
        mermaid.render('mermaid-diagram', diagram).then((result) => {
          if (mermaidRef.current) {
            mermaidRef.current.innerHTML = result.svg;
          }
        }).catch((err) => {
          console.error('Mermaid render error:', err);
          setError('Failed to render diagram');
        });
      } catch (err) {
        console.error('Mermaid error:', err);
        setError('Error initializing diagram');
      }
    }
  }, [projectId]);

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="mermaid-diagram-container bg-gray-800 p-4 rounded-lg overflow-auto max-h-[600px]">
      <div ref={mermaidRef} className="mermaid"></div>
    </div>
  );
};

export default MermaidDiagram;