'use client';

import React, { useState } from 'react'
import Link from 'next/link'

const ProjectSelection: React.FC = () => {
  // This would typically fetch projects from an API
  const [projects] = useState([
    { id: 1, name: 'Project A' },
    { id: 2, name: 'Project B' },
    { id: 3, name: 'Project C' },
  ])

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-2">Select a Project</h2>
      <select className="w-full p-2 border rounded">
        <option value="">Choose a project</option>
        {projects.map((project) => (
          <option key={project.id} value={project.id}>
            {project.name}
          </option>
        ))}
      </select>
      <Link href="/projects" className="text-blue-500 hover:underline mt-2 inline-block">
        View All Projects
      </Link>
    </div>
  )
}

export default ProjectSelection