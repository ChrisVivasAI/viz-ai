import { notFound } from 'next/navigation';
import Link from 'next/link';

// Import components (you'll need to create these)
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

export default async function ProjectDetail({ params }: { params: { id: string } }) {
  const project = await getProject(params.id);

  return (
    <div className="container mx-auto p-4">
      <Link href="/projects" className="text-blue-500 hover:underline mb-4 inline-block">
        ← Back to Projects
      </Link>
      <h1 className="text-3xl font-bold mb-6">{project.name}</h1>
      <p className="text-gray-600 mb-8">{project.description}</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="border rounded-lg p-4 shadow-md">
          <h2 className="text-xl font-semibold mb-4">2D Visualization</h2>
          <View2D projectId={project.id} />
        </div>
        <div className="border rounded-lg p-4 shadow-md">
          <h2 className="text-xl font-semibold mb-4">3D Visualization</h2>
          <View3D projectId={project.id} />
        </div>
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