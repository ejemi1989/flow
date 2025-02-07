import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { WorkflowTemplate } from "@/types/flow";
import { Badge } from "@/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface TemplateDialogProps {
  templates: WorkflowTemplate[];
  onSelectTemplate: (template: WorkflowTemplate) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const TemplateDialog = ({ templates, onSelectTemplate, open, onOpenChange }: TemplateDialogProps) => {
  const handleTemplateSelect = (template: WorkflowTemplate) => {
    console.log('Selected template:', template);
    onSelectTemplate(template);
    onOpenChange(false); // Close dialog after selection
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Choose a Workflow Template</DialogTitle>
          <DialogDescription>
            Start with a pre-built workflow template to save time
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="w-full whitespace-nowrap rounded-md">
          <div className="flex w-max space-x-4 p-4">
            {templates.map((template) => (
              <div
                key={template.id}
                className="w-[300px] shrink-0 border rounded-lg p-4 hover:border-primary cursor-pointer transition-colors bg-white"
                onClick={() => handleTemplateSelect(template)}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold truncate">{template.name}</h3>
                  <Badge variant="secondary">{template.category}</Badge>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {template.description}
                </p>
              </div>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default TemplateDialog;