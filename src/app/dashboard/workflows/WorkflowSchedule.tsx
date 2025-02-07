import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/backend/ui/table";
import { Button } from "@/components/backend/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/backend/ui/dialog";
import { Input } from "@/components/backend/ui/input";
import { Label } from "@/components/backend/ui/label";
import { Calendar } from "@/components/backend/ui/calendar";
import { format } from "date-fns";
import { toast } from "sonner";

// Mock data - in a real app this would come from your API
const fetchScheduledWorkflows = async () => {
  return [
    {
      id: "1",
      workflowName: "Daily Lead Sync",
      schedule: "Daily at 9:00 AM",
      nextRun: new Date(2024, 2, 2, 9, 0),
      status: "active",
    },
    {
      id: "2",
      workflowName: "Weekly Report",
      schedule: "Every Monday at 8:00 AM",
      nextRun: new Date(2024, 2, 4, 8, 0),
      status: "active",
    },
  ];
};

const WorkflowSchedule = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState("09:00");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data: schedules = [], isLoading } = useQuery({
    queryKey: ["workflow-schedules"],
    queryFn: fetchScheduledWorkflows,
  });

  const handleScheduleWorkflow = () => {
    // Here you would implement the actual scheduling logic
    toast.success("Workflow scheduled successfully");
    setIsDialogOpen(false);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Scheduled Workflows</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>Schedule New Workflow</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Schedule Workflow</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Select Date</Label>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border"
                />
              </div>
              <div className="space-y-2">
                <Label>Select Time</Label>
                <Input
                  type="time"
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                />
              </div>
              <Button onClick={handleScheduleWorkflow}>Schedule</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Workflow Name</TableHead>
            <TableHead>Schedule</TableHead>
            <TableHead>Next Run</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {schedules.map((schedule) => (
            <TableRow key={schedule.id}>
              <TableCell>{schedule.workflowName}</TableCell>
              <TableCell>{schedule.schedule}</TableCell>
              <TableCell>
                {format(schedule.nextRun, "MMM d, yyyy HH:mm")}
              </TableCell>
              <TableCell>{schedule.status}</TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    toast.success("Schedule paused");
                  }}
                >
                  Pause
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default WorkflowSchedule;