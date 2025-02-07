import { Card } from "@/components/backend/ui/card";
import { Play, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { formatDistanceToNow } from "date-fns";

interface WorkflowCardProps {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  onDelete: (id: string) => void;
}

const WorkflowCard = ({ id, name, description, createdAt, onDelete }: WorkflowCardProps) => {
  const router = useRouter();
  
  const handleEdit = () => {
    router.push(`/dashboard/workflows?id=${id}`);
  };

  const handleExecute = async () => {
    try {
      console.log('Starting workflow execution:', id);
      
      const { data, error } = await supabase
        .from('workflow_executions')
        .insert([{
          workflow_id: id,
          status: 'running',
        }])
        .select()
        .single();

      if (error) throw error;

      toast.success('Workflow execution started');
      router.push(`/dashboard/workflows/execution/${data.id}`);
    } catch (error) {
      console.error('Error executing workflow:', error);
      toast.error('Failed to start workflow execution');
    }
  };

  return (
    <Card className="p-6 hover:shadow-lg transition-all">
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{name}</h3>
            {description && (
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{description}</p>
            )}
          </div>
          <Button
            variant="destructive"
            size="icon"
            className="h-8 w-8"
            onClick={() => onDelete(id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>

        <div className="text-sm text-gray-500 dark:text-gray-400">
          Created {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
        </div>

        <div className="flex items-center gap-2">
          <Button 
            className="flex-1"
            onClick={handleExecute}
          >
            <Play className="w-4 h-4 mr-2" />
            Execute
          </Button>
          <Button 
            variant="outline"
            className="flex-1"
            onClick={handleEdit}
          >
            <Edit className="w-4 h-4 mr-2" />
            Edit
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default WorkflowCard;