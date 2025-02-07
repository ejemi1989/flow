"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";

interface ScheduleDialogProps {
  onMeetingScheduled: (meetingDetails: string) => void;
}

const timeSlots = [
  "09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00"
];

const ScheduleDialog = ({ onMeetingScheduled }: ScheduleDialogProps) => {
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState<string>();
  const [isOpen, setIsOpen] = useState(false);

  const handleScheduleMeeting = () => {
    if (date && time) {
      const meetingText = `📅 Meeting scheduled for ${format(date, 'MMM d, yyyy')} at ${time}`;
      onMeetingScheduled(meetingText);
      setIsOpen(false);
      setDate(undefined);
      setTime(undefined);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">Schedule Meeting</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Schedule a Meeting</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            disabled={(date) => date < new Date()}
            className="rounded-md border"
          />
          <Select value={time} onValueChange={setTime}>
            <SelectTrigger>
              <SelectValue placeholder="Select time" />
            </SelectTrigger>
            <SelectContent>
              {timeSlots.map((slot) => (
                <SelectItem key={slot} value={slot}>
                  {slot}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            onClick={handleScheduleMeeting}
            disabled={!date || !time}
            className="w-full"
          >
            Schedule Meeting
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ScheduleDialog;