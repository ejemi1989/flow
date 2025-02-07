import { Handle, Position } from '@xyflow/react';
import { Linkedin } from 'lucide-react';

const LinkedInNode = ({ data }: { data: { label: string } }) => {
  return (
    <div className="px-4 py-2 shadow-lg rounded-md bg-white border-2 border-blue-600 min-w-[200px]">
      <Handle type="target" position={Position.Top} className="w-2 h-2" />
      <div className="flex items-center gap-2">
        <div className="p-2 bg-blue-100 rounded-md">
          <Linkedin className="w-5 h-5 text-blue-600" />
        </div>
        <div className="flex flex-col items-start">
          <div className="text-sm font-medium">{data.label}</div>
          <div className="text-xs text-gray-500">LinkedIn Post</div>
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} className="w-2 h-2" />
    </div>
  );
};

export default LinkedInNode;