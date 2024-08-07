'use client';

import { useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import View2D from '@/components/visualization/View2D';
import View3D from '@/components/visualization/View3D';
import MetricsDashboard from '@/components/dashboard/MetricsDashboard';
import Timeline from '@/components/navigation/Timeline';

async function getProject(id: string) {
  const res = await fetch(`http://localhost:3000/api/projects/${id}`, { cache: 'no-store' });
  if (!res.ok) {
    notFound();
  }
  return res.json();
}

export default function ProjectDetail({ params }: { params: { id: string } }) {
  const [project, setProject] = useState<any>(null);
  const [viewMode, setViewMode] = useState<'2D' | '3D'>('2D');

  useEffect(() => {
    getProject(params.id).then(setProject);
  }, [params.id]);

  if (!project) {
    return <div className="text-white">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4 bg-gray-900 text-white min-h-screen">
      <Link href="/projects" className="text-blue-400 hover:underline mb-4 inline-block">
        ← Back to Projects
      </Link>
      <h1 className="text-3xl font-bold mb-6">{project.name}</h1>
      <p className="text-gray-300 mb-8">{project.description}</p>
      
      <div className="mb-4">
        <label htmlFor="viewMode" className="mr-2">Select View Mode:</label>
        <select
          id="viewMode"
          value={viewMode}
          onChange={(e) => setViewMode(e.target.value as '2D' | '3D')}
          className="border rounded p-2 bg-gray-800 text-white"
        >
          <option value="2D">2D View</option>
          <option value="3D">3D View</option>
        </select>
      </div>

      <div className="mb-8">
        {viewMode === '2D' ? (
          <View2D projectId={project.id} />
        ) : (
          <View3D projectId={project.id} />
        )}
      </div>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Project Timeline</h2>
        <Timeline projectId={project.id} />
      </div>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Metrics Dashboard</h2>
        <MetricsDashboard projectId={project.id} />
      </div>
    </div>
  );
}