'use client';

import { useState } from 'react';

export default function Timeline({ projectId }: { projectId: string }) {
  const [currentStage, setCurrentStage] = useState(0);
  const stages = ['Planning', 'Development', 'Testing', 'Deployment'];

  return (
    <div className="flex justify-between">
      {stages.map((stage, index) => (
        <div
          key={index}
          className={`flex-1 text-center p-2 ${
            index <= currentStage ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
          onClick={() => setCurrentStage(index)}
        >
          {stage}
        </div>
      ))}
    </div>
  );
}