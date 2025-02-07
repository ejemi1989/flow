import { useQuery } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

// Mock data - in a real app this would come from your API
const fetchWorkflowHistory = async () => {
  // Simulated API call
  return [
    {
      id: "1",
      workflowName: "Lead Nurture",
      status: "completed",
      startTime: new Date(2024, 2, 1, 14, 30),
      endTime: new Date(2024, 2, 1, 14, 35),
      triggeredBy: "system",
    },
    {
      id: "2",
      workflowName: "Email Campaign",
      status: "failed",
      startTime: new Date(2024, 2, 1, 15, 0),
      endTime: new Date(2024, 2, 1, 15, 1),
      triggeredBy: "manual",
    },
    // Add more mock data as needed
  ];
};

const WorkflowHistory = () => {
  const { data: history = [], isLoading } = useQuery({
    queryKey: ["workflow-history"],
    queryFn: fetchWorkflowHistory,
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500";
      case "failed":
        return "bg-red-500";
      case "running":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Workflow History</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Workflow Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Start Time</TableHead>
            <TableHead>End Time</TableHead>
            <TableHead>Triggered By</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {history.map((run) => (
            <TableRow key={run.id}>
              <TableCell>{run.workflowName}</TableCell>
              <TableCell>
                <Badge className={getStatusColor(run.status)}>
                  {run.status}
                </Badge>
              </TableCell>
              <TableCell>
                {format(run.startTime, "MMM d, yyyy HH:mm:ss")}
              </TableCell>
              <TableCell>
                {format(run.endTime, "MMM d, yyyy HH:mm:ss")}
              </TableCell>
              <TableCell>{run.triggeredBy}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default WorkflowHistory;