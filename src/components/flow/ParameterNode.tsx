import { Handle, Position } from '@xyflow/react';
import { Variable } from 'lucide-react';

const ParameterNode = ({ data }: { data: { label: string; value?: string; type?: string } }) => {
  return (
    <div className="px-4 py-2 shadow-lg rounded-md bg-white border-2 border-teal-500 min-w-[200px]">
      <Handle type="source" position={Position.Bottom} className="w-2 h-2" />
      <div className="flex items-center gap-2">
        <div className="p-2 bg-teal-100 rounded-md">
          <Variable className="w-5 h-5 text-teal-500" />
        </div>
        <div className="flex flex-col items-start">
          <div className="text-sm font-medium">{data.label}</div>
          <div className="text-xs text-gray-500">
            {data.type || 'string'}: {data.value || 'undefined'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParameterNode;