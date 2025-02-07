import { Handle, Position } from '@xyflow/react';
import { Webhook } from 'lucide-react';

const WebhookNode = ({ data }: { data: { label: string } }) => {
  return (
    <div className="px-4 py-2 shadow-lg rounded-md bg-white border-2 border-cyan-500 min-w-[200px]">
      <Handle type="target" position={Position.Top} className="w-2 h-2" />
      <div className="flex items-center gap-2">
        <div className="p-2 bg-cyan-100 rounded-md">
          <Webhook className="w-5 h-5 text-cyan-500" />
        </div>
        <div className="flex flex-col items-start">
          <div className="text-sm font-medium">{data.label}</div>
          <div className="text-xs text-gray-500">Webhook</div>
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} className="w-2 h-2" />
    </div>
  );
};

export default WebhookNode;