import { Handle, Position } from '@xyflow/react';
import { Mail } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchGmailData } from '@/store/apiSlice';
import { toast } from 'sonner';

const GmailNode = ({ data }: { data: { label: string; webhookUrl?: string } }) => {
  const [webhookUrl, setWebhookUrl] = useState(data.webhookUrl || '');
  
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.api.gmail);

  const validateUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleTrigger = async () => {
    if (!webhookUrl) {
      toast.error("Please enter a webhook URL");
      return;
    }

    if (!validateUrl(webhookUrl)) {
      toast.error("Please enter a valid URL");
      return;
    }

    dispatch(fetchGmailData(webhookUrl));
  };

  return (
    <div className="px-4 py-2 shadow-lg rounded-md bg-white border-2 border-red-500 min-w-[200px]">
      <Handle type="target" position={Position.Top} className="w-2 h-2" />
      <div className="flex items-center gap-2 mb-2">
        <div className="p-2 bg-red-100 rounded-md">
          <Mail className="w-5 h-5 text-red-500" />
        </div>
        <div className="flex flex-col items-start">
          <div className="text-sm font-medium">{data.label}</div>
          <div className="text-xs text-gray-500">Gmail Integration</div>
        </div>
      </div>
      <div className="space-y-2">
        <Input
          placeholder="Enter Gmail webhook URL"
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

export default GmailNode;