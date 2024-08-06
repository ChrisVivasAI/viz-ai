import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const projectId = searchParams.get('projectId');

  // This would typically fetch metrics for a specific project from a database
  const metrics = {
    projectId,
    cost: 10000,
    roi: 1.5,
    resourcesUsed: 'CPU: 80%, Memory: 60%',
    projections: 'Estimated completion: 3 months',
  };

  return NextResponse.json(metrics);
}