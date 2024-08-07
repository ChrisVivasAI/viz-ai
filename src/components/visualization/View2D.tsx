import React from 'react';
import MermaidDiagram from './MermaidDiagram';

interface View2DProps {
  projectId: string;
}

const View2D: React.FC<View2DProps> = ({ projectId }) => {
  return (
    <div className="border border-gray-700 p-4 rounded-lg bg-gray-900 text-white">
      <h2 className="text-xl font-semibold mb-4">2D View - AI-powered Chatbot Flow</h2>
      <MermaidDiagram projectId={projectId} />
      <p className="mt-4 text-sm text-gray-400">
        Note: This diagram represents a typical flow for an AI-powered chatbot. In the future, it will be dynamically generated from the project's GitHub repository structure and Mermaid diagrams found in the codebase.
      </p>
    </div>
  );
}

export default View2D;