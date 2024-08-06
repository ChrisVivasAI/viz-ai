export default function MetricsDashboard({ projectId }: { projectId: string }) {
  // This would typically fetch data from an API
  const metrics = {
    cost: 10000,
    roi: 1.5,
    resourcesUsed: 'CPU: 80%, Memory: 60%',
    projections: 'Estimated completion: 3 months'
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="border rounded-lg p-4 shadow-md">
        <h3 className="font-semibold">Cost</h3>
        <p>${metrics.cost}</p>
      </div>
      <div className="border rounded-lg p-4 shadow-md">
        <h3 className="font-semibold">ROI</h3>
        <p>{metrics.roi}x</p>
      </div>
      <div className="border rounded-lg p-4 shadow-md">
        <h3 className="font-semibold">Resources Used</h3>
        <p>{metrics.resourcesUsed}</p>
      </div>
      <div className="border rounded-lg p-4 shadow-md">
        <h3 className="font-semibold">Projections</h3>
        <p>{metrics.projections}</p>
      </div>
    </div>
  );
}