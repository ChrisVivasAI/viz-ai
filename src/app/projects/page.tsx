import Link from 'next/link';

async function getProjects() {
  const res = await fetch('http://localhost:3000/api/projects', { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch projects');
  }
  return res.json();
}

export default async function Projects() {
  const projects = await getProjects();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project: any) => (
          <div key={project.id} className="border rounded-lg p-4 shadow-md">
            <h2 className="text-xl font-semibold mb-2">{project.name}</h2>
            <p className="text-gray-600 mb-4">{project.description}</p>
            <Link href={`/projects/${project.id}`} className="text-blue-500 hover:underline">
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}