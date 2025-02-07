import { Handle, Position } from '@xyflow/react';
import { Calendar } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchMondayData } from '@/store/apiSlice';

const MondayAPINode = ({ data }: { data: { label: string; apiKey?: string; boardId?: string; operation?: string } }) => {
  const [apiKey, setApiKey] = useState(data.apiKey || '');
  const [boardId, setBoardId] = useState(data.boardId || '');
  const [operation, setOperation] = useState(data.operation || 'create_item');
  
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.api.monday);

  const handleTest = async () => {
    if (!apiKey || !boardId) {
      return;
    }

    dispatch(fetchMondayData({ apiKey, boardId }));
  };

  return (
    <div className="px-4 py-2 shadow-lg rounded-md bg-white border-2 border-blue-500 min-w-[250px]">
      <Handle type="target" position={Position.Top} className="w-2 h-2" />
      <div className="flex items-center gap-2 mb-2">
        <div className="p-2 bg-blue-100 rounded-md">
          <Calendar className="w-5 h-5 text-blue-500" />
        </div>
        <div className="flex flex-col items-start">
          <div className="text-sm font-medium">{data.label}</div>
          <div className="text-xs text-gray-500">Monday.com API</div>
        </div>
      </div>
      <div className="space-y-2">
        <Input
          placeholder="Enter Monday.com API Key"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          type="password"
          className="text-sm"
        />
        <Input
          placeholder="Enter Board ID"
          value={boardId}
          onChange={(e) => setBoardId(e.target.value)}
          className="text-sm"
        />
        <Select value={operation} onValueChange={setOperation}>
          <SelectTrigger>
            <SelectValue placeholder="Select operation" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="create_item">Create Item</SelectItem>
            <SelectItem value="update_item">Update Item</SelectItem>
            <SelectItem value="delete_item">Delete Item</SelectItem>
            <SelectItem value="get_items">Get Items</SelectItem>
          </SelectContent>
        </Select>
        <Button 
          onClick={handleTest} 
          disabled={loading} 
          className="w-full"
          size="sm"
        >
          {loading ? "Testing..." : "Test Connection"}
        </Button>
        {error && <div className="text-xs text-red-500">{error}</div>}
      </div>
      <Handle type="source" position={Position.Bottom} className="w-2 h-2" />
    </div>
  );
};

export default MondayAPINode;