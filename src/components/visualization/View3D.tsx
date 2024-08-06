'use client';

import React from 'react';
import ThreeDVisualization from './ThreeDVisualization';

interface View3DProps {
  projectId: string;
}

const View3D: React.FC<View3DProps> = ({ projectId }) => {
  return (
    <div className="border p-4 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">3D View</h2>
      <div style={{ height: '500px' }}> {/* Adjust height as needed */}
        <ThreeDVisualization projectId={projectId} />
      </div>
    </div>
  );
};

export default View3D;