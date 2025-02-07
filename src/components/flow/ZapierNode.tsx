import { Handle, Position } from '@xyflow/react';
import { Webhook } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { triggerZapierWebhook } from '@/store/apiSlice';

const ZapierNode = ({ data }: { data: { label: string; webhookUrl?: string } }) => {
  const [webhookUrl, setWebhookUrl] = useState(data.webhookUrl || '');
  
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.api.zapier);

  const validateWebhookUrl = (url: string) => {
    try {
      const parsedUrl = new URL(url);
      return parsedUrl.protocol === 'https:' && parsedUrl.host.includes('zapier.com');
    } catch (e) {
      return false;
    }
  };

  const handleTrigger = async () => {
    if (!webhookUrl || !validateWebhookUrl(webhookUrl)) return;
    dispatch(triggerZapierWebhook(webhookUrl));
  };

  return (
    <div className="px-4 py-2 shadow-lg rounded-md bg-white border-2 border-purple-500 min-w-[200px]">
      <Handle type="target" position={Position.Top} className="w-2 h-2" />
      <div className="flex items-center gap-2 mb-2">
        <div className="p-2 bg-purple-100 rounded-md">
          <Webhook className="w-5 h-5 text-purple-500" />
        </div>
        <div className="flex flex-col items-start">
          <div className="text-sm font-medium">{data.label}</div>
          <div className="text-xs text-gray-500">Zapier Integration</div>
        </div>
      </div>
      <div className="space-y-2">
        <Input
          placeholder="Enter Zapier webhook URL"
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
          {loading ? "Triggering..." : "Test Webhook"}
        </Button>
        {error && <div className="text-xs text-red-500">{error}</div>}
      </div>
      <Handle type="source" position={Position.Bottom} className="w-2 h-2" />
    </div>
  );
};

export default ZapierNode;