import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, Clock, ThumbsUp, Calendar } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Message } from "@/types/chat";

interface ChatAnalyticsProps {
  messages: Message[];
}

interface MessageWithMetadata extends Message {
  id: string;
  reactions: string[];
  attachments?: { name: string; url: string }[];
}

const ChatAnalytics = ({ messages }: { messages: MessageWithMetadata[] }) => {
  const analytics = useMemo(() => {
    const totalMessages = messages.length;
    const userMessages = messages.filter(m => m.role === 'user').length;
    const aiMessages = messages.filter(m => m.role === 'assistant').length;
    const totalReactions = messages.reduce((sum, m) => sum + m.reactions.length, 0);
    const attachments = messages.reduce((sum, m) => sum + (m.attachments?.length || 0), 0);

    // Calculate messages per hour
    const messagesByHour: { [key: string]: number } = {};
    messages.forEach(message => {
      const hour = new Date(parseInt(message.id)).getHours();
      messagesByHour[hour] = (messagesByHour[hour] || 0) + 1;
    });

    const hourlyData = Array.from({ length: 24 }, (_, i) => ({
      hour: i,
      messages: messagesByHour[i] || 0,
    }));

    return {
      totalMessages,
      userMessages,
      aiMessages,
      totalReactions,
      attachments,
      hourlyData,
    };
  }, [messages]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Messages</CardTitle>
            <MessageCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalMessages}</div>
            <p className="text-xs text-muted-foreground">
              {analytics.userMessages} user / {analytics.aiMessages} AI
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Response Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">~2.5s</div>
            <p className="text-xs text-muted-foreground">Average AI response time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Engagement</CardTitle>
            <ThumbsUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalReactions}</div>
            <p className="text-xs text-muted-foreground">Total reactions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Attachments</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.attachments}</div>
            <p className="text-xs text-muted-foreground">Files shared</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Message Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analytics.hourlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="messages" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChatAnalytics;