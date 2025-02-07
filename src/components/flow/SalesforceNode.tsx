import { Handle, Position } from '@xyflow/react';
import { Building2 } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchSalesforceData } from '@/store/apiSlice';

const SalesforceNode = ({ data }: { data: { label: string; webhookUrl?: string } }) => {
  const [webhookUrl, setWebhookUrl] = useState(data.webhookUrl || '');
  
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.api.salesforce);

  const handleTrigger = async () => {
    if (!webhookUrl) return;
    dispatch(fetchSalesforceData(webhookUrl));
  };

  return (
    <div className="px-4 py-2 shadow-lg rounded-md bg-white border-2 border-blue-600 min-w-[200px]">
      <Handle type="target" position={Position.Top} className="w-2 h-2" />
      <div className="flex items-center gap-2 mb-2">
        <div className="p-2 bg-blue-100 rounded-md">
          <Building2 className="w-5 h-5 text-blue-600" />
        </div>
        <div className="flex flex-col items-start">
          <div className="text-sm font-medium">{data.label}</div>
          <div className="text-xs text-gray-500">Salesforce Integration</div>
        </div>
      </div>
      <div className="space-y-2">
        <Input
          placeholder="Enter Salesforce webhook URL"
          value={webhookUrl}
          onChange={(e) => setWebhookUrl(e.target.value)}
          className="text-sm"
        />
        <Button 
          onClick={handleTrigger} 
          disabled={loading} 
          className="w-full"
          size="sm"
        >
          {loading ? "Connecting..." : "Test Connection"}
        </Button>
        {error && <div className="text-xs text-red-500">{error}</div>}
      </div>
      <Handle type="source" position={Position.Bottom} className="w-2 h-2" />
    </div>
  );
};

export default SalesforceNode;