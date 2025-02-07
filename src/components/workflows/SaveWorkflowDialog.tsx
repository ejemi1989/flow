import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface SaveWorkflowDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  workflowName: string;
  workflowDescription: string;
  onWorkflowNameChange: (value: string) => void;
  onWorkflowDescriptionChange: (value: string) => void;
  onSave: () => void;
  isEditing: boolean;
}

const SaveWorkflowDialog = ({
  isOpen,
  onOpenChange,
  workflowName,
  workflowDescription,
  onWorkflowNameChange,
  onWorkflowDescriptionChange,
  onSave,
  isEditing,
}: SaveWorkflowDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Update Workflow" : "Save Workflow"}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Workflow Name</label>
            <Input
              placeholder="Enter workflow name"
              value={workflowName}
              onChange={(e) => onWorkflowNameChange(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Description</label>
            <textarea
              className="w-full min-h-[100px] p-3 rounded-md border border-gray-200"
              placeholder="Enter workflow description"
              value={workflowDescription}
              onChange={(e) => onWorkflowDescriptionChange(e.target.value)}
            />
          </div>
          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button onClick={onSave}>
              {isEditing ? "Update" : "Save"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SaveWorkflowDialog;