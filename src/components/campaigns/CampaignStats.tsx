import { Mail, Target, Users } from "lucide-react";
import { Card } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  iconBg: string;
}

const StatCard = ({ title, value, change, icon, iconBg }: StatCardProps) => (
  <Card className="p-6 bg-white">
    <div className="flex items-start justify-between">
      <div className={`${iconBg} p-3 rounded-lg`}>
        {icon}
      </div>
      <div className="text-right">
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <h3 className="text-2xl font-bold mt-1">{value}</h3>
        <p className="text-sm text-green-500 mt-1">{change}</p>
      </div>
    </div>
  </Card>
);

const CampaignStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatCard
        title="Total Sent"
        value="12,456"
        change="↑ 12% vs last month"
        icon={<Mail className="w-6 h-6 text-blue-600" />}
        iconBg="bg-blue-50"
      />
      <StatCard
        title="Open Rate"
        value="45.8%"
        change="↑ 5% vs last month"
        icon={<Target className="w-6 h-6 text-green-600" />}
        iconBg="bg-green-50"
      />
      <StatCard
        title="Response Rate"
        value="28.3%"
        change="↑ 8% vs last month"
        icon={<Users className="w-6 h-6 text-purple-600" />}
        iconBg="bg-purple-50"
      />
    </div>
  );
};

export default CampaignStats;