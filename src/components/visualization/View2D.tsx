import React from 'react';
import MermaidDiagram from './MermaidDiagram';

interface View2DProps {
  projectId: string;
}

const View2D: React.FC<View2DProps> = ({ projectId }) => {
  const mermaidChart = `
    graph TD
      A[Project ${projectId}] --> B[Frontend]
      A --> C[Backend]
      A --> D[Database]
      B --> E[React Components]
      C --> F[API Routes]
      D --> G[MongoDB]
  `;

  return (
    <div className="border border-gray-700 p-4 rounded-lg bg-gray-900 text-white">
      <h2 className="text-xl font-semibold mb-4">2D View - Project Structure</h2>
      <MermaidDiagram chart={mermaidChart} />
      <p className="mt-4 text-sm text-gray-400">
        Note: This diagram represents a simple structure of the project. In the future, it will be dynamically generated from the project&apos;s GitHub repository.
      </p>
    </div>
  );
}

export default View2D;