import React from 'react'

interface View2DProps {
  projectId: string;
}

const View2D: React.FC<View2DProps> = ({ projectId }) => {
  return (
    <div className="border p-4 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">2D View</h2>
      {/* Implement Mermaid.js chart here */}
      <p>2D visualization for project {projectId} will be implemented here using Mermaid.js</p>
    </div>
  )
}

export default View2D