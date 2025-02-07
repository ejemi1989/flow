import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const emailData = [
  { name: 'Week 1', sent: 120, opened: 45, clicked: 20 },
  { name: 'Week 2', sent: 145, opened: 55, clicked: 25 },
  { name: 'Week 3', sent: 180, opened: 70, clicked: 35 },
  { name: 'Week 4', sent: 220, opened: 85, clicked: 40 },
];

const conversionData = [
  { name: 'Week 1', rate: 28 },
  { name: 'Week 2', rate: 32 },
  { name: 'Week 3', rate: 37 },
  { name: 'Week 4', rate: 42 },
];

const CampaignPerformance = () => {
  return (
    <Card className="p-6 mt-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Campaign Performance</h2>
        <div className="flex gap-4">
          <button className="text-sm text-gray-600 hover:text-gray-900">Week</button>
          <button className="text-sm text-blue-600 font-medium">Month</button>
          <button className="text-sm text-gray-600 hover:text-gray-900">Quarter</button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h3 className="text-base text-gray-600 mb-4">Email Metrics</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={emailData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="sent" fill="#3B82F6" />
                <Bar dataKey="opened" fill="#10B981" />
                <Bar dataKey="clicked" fill="#8B5CF6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div>
          <h3 className="text-base text-gray-600 mb-4">Conversion Rate</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={conversionData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="rate" 
                  stroke="#3B82F6" 
                  strokeWidth={2}
                  dot={{ fill: '#3B82F6', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CampaignPerformance;