import { NextResponse } from 'next/server';

const projects = [
  { id: '1', name: 'Project A', description: 'AI-powered chatbot' },
  { id: '2', name: 'Project B', description: 'Machine learning model for image recognition' },
  { id: '3', name: 'Project C', description: 'Natural language processing system' },
];

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const project = projects.find(p => p.id === id);
  
  if (project) {
    return NextResponse.json(project);
  } else {
    return new NextResponse('Project not found', { status: 404 });
  }
}