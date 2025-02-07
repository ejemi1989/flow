import { Card } from "@/components/backend/ui/card";
import { BarChart2 } from "lucide-react";

interface AgentPerformanceProps {
  name: string;
  deals: number;
  conversion: number;
  satisfaction: number;
}

const AgentPerformanceCard = ({ name, deals, conversion, satisfaction }: AgentPerformanceProps) => {
  return (
    <Card className="p-4 border-none bg-gray-50 dark:bg-gray-700/50">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold">{name}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Sales Representative</p>
        </div>
        <div className="flex items-center space-x-2">
          <BarChart2 className="h-5 w-5 text-purple-500" />
          <span className="font-semibold">{conversion}%</span>
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500 dark:text-gray-400">Deals Closed</span>
          <span className="font-medium">{deals}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500 dark:text-gray-400">Conversion Rate</span>
          <span className="font-medium">{conversion}%</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500 dark:text-gray-400">Customer Satisfaction</span>
          <span className="font-medium">{satisfaction}%</span>
        </div>
      </div>
    </Card>
  );
};

export default AgentPerformanceCard;