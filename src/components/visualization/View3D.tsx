import React from 'react'

interface View3DProps {
  projectId: string;
}

const View3D: React.FC<View3DProps> = ({ projectId }) => {
  return (
    <div className="border p-4 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">3D View</h2>
      {/* Implement Three.js visualization here */}
      <p>3D visualization for project {projectId} will be implemented here using Three.js</p>
    </div>
  )
}

export default View3D