import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const projectId = searchParams.get('projectId');

  // This would typically fetch components for a specific project from a database
  const components = [
    { id: '1', name: 'Component A', status: 'active', projectId },
    { id: '2', name: 'Component B', status: 'pending', projectId },
    { id: '3', name: 'Component C', status: 'inactive', projectId },
  ];

  return NextResponse.json(components);
}

export async function POST(request: Request) {
  const data = await request.json();
  // This would typically save the new component to a database
  console.log('Creating new component:', data);
  return NextResponse.json({ message: 'Component created successfully' }, { status: 201 });
}