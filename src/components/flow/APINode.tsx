import { Handle, Position } from '@xyflow/react';
import { Globe, X, MoreVertical, Play, Copy, HelpCircle } from 'lucide-react';
import { useCallback } from 'react';
import { useReactFlow } from '@xyflow/react';
import { toast } from 'sonner';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const APINode = ({ data, id }: { data: { label: string }; id: string }) => {
  const { setNodes, getNodes } = useReactFlow();

  const handleDelete = useCallback(() => {
    console.log('Deleting node:', id);
    setNodes((nodes) => nodes.filter((node) => node.id !== id));
    toast.success('Node deleted');
  }, [id, setNodes]);

  const handleDuplicate = useCallback(() => {
    setNodes((nodes) => {
      const nodeToClone = nodes.find((n) => n.id === id);
      if (!nodeToClone) return nodes;

      const newNode = {
        ...nodeToClone,
        id: `${nodeToClone.type}-${nodes.length + 1}`,
        position: {
          x: nodeToClone.position.x + 50,
          y: nodeToClone.position.y + 50,
        },
      };

      return [...nodes, newNode];
    });
    toast.success('Node duplicated');
  }, [id, setNodes]);

  const handleCopy = useCallback(() => {
    const nodeData = getNodes().find((n) => n.id === id);
    if (nodeData) {
      navigator.clipboard.writeText(JSON.stringify(nodeData));
      toast.success('Node configuration copied');
    }
  }, [id, getNodes]);

  const handleRunStep = useCallback(() => {
    toast.success('Running this step...');
    // Implement step execution logic here
  }, []);

  return (
    <div className="group relative px-4 py-2 shadow-lg rounded-md bg-white border-2 border-sky-500 min-w-[200px]">
      <Handle type="target" position={Position.Top} className="w-2 h-2" />
      
      <div className="absolute -right-3 -top-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button 
              className="p-1.5 rounded-full bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <MoreVertical className="w-3.5 h-3.5 text-gray-600" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent 
            align="end" 
            className="w-48 bg-white"
            onClick={(e) => e.stopPropagation()}
          >
            <DropdownMenuItem onClick={handleRunStep} className="cursor-pointer">
              <Play className="w-4 h-4 mr-2" />
              Run this step
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleCopy} className="cursor-pointer">
              <Copy className="w-4 h-4 mr-2" />
              Copy
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleDuplicate} className="cursor-pointer">
              <Copy className="w-4 h-4 mr-2" />
              Duplicate
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleDelete} className="cursor-pointer text-red-600">
              <X className="w-4 h-4 mr-2" />
              Delete
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              <HelpCircle className="w-4 h-4 mr-2" />
              Help Link
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex items-center gap-2">
        <div className="p-2 bg-sky-100 rounded-md">
          <Globe className="w-5 h-5 text-sky-500" />
        </div>
        <div className="flex flex-col items-start">
          <div className="text-sm font-medium">{data.label}</div>
          <div className="text-xs text-gray-500">API Request</div>
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} className="w-2 h-2" />
    </div>
  );
};

export default APINode;