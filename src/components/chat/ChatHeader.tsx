import { Button } from "@/components/ui/button";
import { SheetHeader } from "@/components/ui/sheet";
import QuoteDialog from "./QuoteDialog";
import ScheduleDialog from "./ScheduleDialog";

interface ChatHeaderProps {
  onQuoteGenerated: (quoteText: string) => void;
  onMeetingScheduled: (meetingDetails: string) => void;
  clearHistory: () => void;
}

const ChatHeader = ({
  onQuoteGenerated,
  onMeetingScheduled,
  clearHistory,
}: ChatHeaderProps) => {
  return (
    <SheetHeader className="border-b px-6 py-3">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Sales Chat</h2>
        <div className="flex items-center gap-2">
          <QuoteDialog onQuoteGenerated={onQuoteGenerated} />
          <ScheduleDialog onMeetingScheduled={onMeetingScheduled} />
          <Button variant="outline" size="sm" onClick={clearHistory}>
            Clear History
          </Button>
        </div>
      </div>
    </SheetHeader>
  );
};

export default ChatHeader;