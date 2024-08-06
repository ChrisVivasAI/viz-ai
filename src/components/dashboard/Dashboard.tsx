import MetricsDashboard from './MetricsDashboard'
import ProjectSelection from '../navigation/ProjectSelection'

const Dashboard = () => {
  const projectId = "your-project-id"; // Replace with the actual project ID
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Project Dashboard</h1>
      <ProjectSelection />
      <MetricsDashboard projectId={projectId} />
    </div>
  )
}

export default Dashboard