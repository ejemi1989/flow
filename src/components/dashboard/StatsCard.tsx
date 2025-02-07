import Link from "next/link";
import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string;
  change: number;
  icon: LucideIcon;
  iconBgColor: string;
  iconColor: string;
  link?: string;
}

const StatsCard = ({ title, value, change, icon: Icon, iconBgColor, iconColor, link }: StatsCardProps) => {
  const CardWrapper = link ? Link : 'div';
  const changeColor = change >= 0 ? 'text-green-500' : 'text-red-500';
  const changeText = `${change >= 0 ? '↑' : '↓'} ${Math.abs(change)}% vs last week`;
  
  return (
    <CardWrapper href={link || ''}>
      <Card className="p-6 hover:shadow-lg transition-all border-none bg-white dark:bg-gray-800">
        <div className="flex items-center justify-between">
          <div className={`p-3 ${iconBgColor} rounded-xl`}>
            <Icon className={`h-6 w-6 ${iconColor}`} />
          </div>
          <div className="text-right">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white">{value}</h3>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-1">{title}</p>
            <p className={`text-sm mt-2 ${changeColor}`}>
              {changeText}
            </p>
          </div>
        </div>
      </Card>
    </CardWrapper>
  );
};

export default StatsCard;