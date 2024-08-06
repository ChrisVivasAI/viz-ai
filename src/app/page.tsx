import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">AI Project Visualization</h1>
      <Link href="/projects" className="text-blue-500 hover:underline">
        View Projects
      </Link>
    </main>
  )
}