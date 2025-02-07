import { Handle, Position } from '@xyflow/react';
import { Calendar } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from 'react';
import { toast } from 'sonner';

const MondayNode = ({ data }: { data: { label: string; webhookUrl?: string } }) => {
  const [webhookUrl, setWebhookUrl] = useState(data.webhookUrl || '');
  const [isLoading, setIsLoading] = useState(false);

  const handleTrigger = async () => {
    if (!webhookUrl) {
      toast.error("Please enter your Monday.com webhook URL");
      return;
    }

    setIsLoading(true);
    console.log("Triggering Monday.com webhook:", webhookUrl);

    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          timestamp: new Date().toISOString(),
          triggered_from: window.location.origin,
          data: data
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      toast.success("Monday.com webhook triggered successfully");
    } catch (error) {
      console.error("Error triggering webhook:", error);
      toast.error("Failed to trigger the Monday.com webhook");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="px-4 py-2 shadow-lg rounded-md bg-white border-2 border-green-500 min-w-[200px]">
      <Handle type="target" position={Position.Top} className="w-2 h-2" />
      <div className="flex items-center gap-2 mb-2">
        <div className="p-2 bg-green-100 rounded-md">
          <Calendar className="w-5 h-5 text-green-500" />
        </div>
        <div className="flex flex-col items-start">
          <div className="text-sm font-medium">{data.label}</div>
          <div className="text-xs text-gray-500">Monday.com Integration</div>
        </div>
      </div>
      <div className="space-y-2">
        <Input
          placeholder="Enter Monday.com webhook URL"
          value={webhookUrl}
          onChange={(e) => setWebhookUrl(e.target.value)}
          className="text-sm"
        />
        <Button 
          onClick={handleTrigger} 
          disabled={isLoading} 
          className="w-full"
          size="sm"
        >
          {isLoading ? "Connecting..." : "Test Connection"}
        </Button>
      </div>
      <Handle type="source" position={Position.Bottom} className="w-2 h-2" />
    </div>
  );
};

export default MondayNode;