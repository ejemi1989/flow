import { useCallback } from 'react';
import { useReactFlow, Node } from '@xyflow/react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { NodeData } from '@/types/flow';

interface NodeSettingsProps {
  node: Node<NodeData> | null;
  isOpen: boolean;
  onClose: () => void;
}

const NodeSettings = ({ node, isOpen, onClose }: NodeSettingsProps) => {
  const { setNodes } = useReactFlow();

  const updateNodeData = useCallback((field: string, value: string) => {
    setNodes((nodes) =>
      nodes.map((n) => {
        if (n.id === node?.id) {
          return {
            ...n,
            data: {
              ...n.data,
              [field]: value,
            },
          };
        }
        return n;
      })
    );
  }, [node, setNodes]);

  if (!node) return null;

  const getSettingsFields = () => {
    switch (node.type) {
      case 'ai':
        return (
          <div className="space-y-6">
            {/* Input Section */}
            <div className="space-y-4">
              <div className="text-xs font-medium text-gray-700 uppercase">Input Variables</div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>
                    Prompt
                    <span className="text-red-500 ml-1">*</span>
                  </Label>
                  <Textarea
                    value={String(node.data.prompt || '')}
                    onChange={(e) => updateNodeData('prompt', e.target.value)}
                    placeholder="Type '/' to insert variable"
                    className="min-h-[100px]"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Temperature</Label>
                  <Input
                    type="number"
                    value={String(node.data.temperature || '0.7')}
                    onChange={(e) => updateNodeData('temperature', e.target.value)}
                    min={0}
                    max={1}
                    step={0.1}
                  />
                </div>
              </div>
            </div>

            {/* Output Section */}
            <div className="space-y-2">
              <div className="text-xs font-medium text-gray-700 uppercase">Output</div>
              <div className="text-sm text-gray-600">
                response: string
              </div>
            </div>
          </div>
        );
      case 'parameter':
        return (
          <div className="space-y-4">
            <div>
              <Label>Parameter Name</Label>
              <Input
                value={node.data.label || ''}
                onChange={(e) => updateNodeData('label', e.target.value)}
                placeholder="Enter parameter name"
              />
            </div>
            <div>
              <Label>Type</Label>
              <Select
                value={String(node.data.type || 'string')}
                onValueChange={(value) => updateNodeData('type', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="string">String</SelectItem>
                  <SelectItem value="number">Number</SelectItem>
                  <SelectItem value="boolean">Boolean</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Default Value</Label>
              <Input
                value={String(node.data.value || '')}
                onChange={(e) => updateNodeData('value', e.target.value)}
                placeholder="Enter default value"
              />
            </div>
          </div>
        );
      case 'condition':
        return (
          <div className="space-y-4">
            <div>
              <Label>Condition Type</Label>
              <Select
                value={String(node.data.conditionType || 'equals')}
                onValueChange={(value) => updateNodeData('conditionType', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select condition type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="equals">Equals</SelectItem>
                  <SelectItem value="contains">Contains</SelectItem>
                  <SelectItem value="greater">Greater Than</SelectItem>
                  <SelectItem value="less">Less Than</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Value to Compare</Label>
              <Input
                value={String(node.data.compareValue || '')}
                onChange={(e) => updateNodeData('compareValue', e.target.value)}
                placeholder="Enter value to compare"
              />
            </div>
          </div>
        );
      case 'email':
        return (
          <div className="space-y-4">
            <div>
              <Label>Subject</Label>
              <Input
                value={String(node.data.subject || '')}
                onChange={(e) => updateNodeData('subject', e.target.value)}
                placeholder="Email subject"
              />
            </div>
            <div>
              <Label>Template</Label>
              <Textarea
                value={String(node.data.template || '')}
                onChange={(e) => updateNodeData('template', e.target.value)}
                placeholder="Email template"
                className="h-32"
              />
            </div>
          </div>
        );
      case 'delay':
        return (
          <div>
            <Label>Delay Duration (hours)</Label>
            <Input
              type="number"
              value={String(node.data.duration || '24')}
              onChange={(e) => updateNodeData('duration', e.target.value)}
              min="1"
            />
          </div>
        );
      case 'gptsales':
        return (
          <div className="space-y-4">
            <div>
              <Label>Prompt Template</Label>
              <Textarea
                value={String(node.data.prompt || '')}
                onChange={(e) => updateNodeData('prompt', e.target.value)}
                placeholder="Enter your GPT prompt template"
                className="h-32"
              />
            </div>
            <div>
              <Label>Temperature</Label>
              <Input
                type="number"
                value={String(node.data.temperature || '0.7')}
                onChange={(e) => updateNodeData('temperature', e.target.value)}
                min="0"
                max="1"
                step="0.1"
              />
            </div>
          </div>
        );
      default:
        return (
          <div>
            <Label>Label</Label>
            <Input
              value={String(node.data.label || '')}
              onChange={(e) => updateNodeData('label', e.target.value)}
              placeholder="Node label"
            />
          </div>
        );
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Node Settings</SheetTitle>
        </SheetHeader>
        <div className="py-4">
          {getSettingsFields()}
          <div className="mt-6">
            <Button onClick={onClose}>Close</Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default NodeSettings;