import { NodeCategory } from '@/types/flow';
import { Search } from 'lucide-react';
import * as Icons from 'lucide-react';
import { Input } from "@/components/ui/input";
import { useState, ChangeEvent } from 'react';
import { LucideIcon } from 'lucide-react';
import { ScrollArea } from "@/components/ui/scroll-area";

interface NodePanelProps {
  categories: NodeCategory[];
  zoom: number;
  onDragStart: (event: React.DragEvent, nodeData: { type: string; label: string; icon?: string }) => void;
}

const NodePanel = ({ categories = [], zoom, onDragStart }: NodePanelProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredCategories = categories
    .filter(category => category && category.items)
    .map(category => ({
      ...category,
      items: category.items.filter(item => 
        item.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }))
    .filter(category => category.items.length > 0);

  const renderIcon = (iconName: string) => {
    const LucideIcons = Icons as unknown as Record<string, LucideIcon>;
    const IconComponent = LucideIcons[iconName];
    return IconComponent ? <IconComponent className="w-4 h-4" /> : null;
  };

  console.log('Rendering NodePanel with categories:', categories);

  return (
    <div className="bg-white rounded-lg shadow-lg w-72 border border-gray-200 h-[calc(100vh-12rem)] flex flex-col m-4">
      <div className="p-4 space-y-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Nodes</h3>
          <span className="text-sm text-gray-500">{Math.round(zoom * 100)}%</span>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search nodes..."
            className="pl-10"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-6">
          {filteredCategories.map((category, categoryIndex) => (
            <div key={category.title} className="space-y-3">
              <h4 className="text-sm font-medium text-gray-500 flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full bg-${category.color}-500`} />
                {category.title}
              </h4>
              <div className="grid grid-cols-1 gap-2">
                {category.items.map((item, itemIndex) => (
                  <div
                    key={`${item.type}-${item.label}`}
                    className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg cursor-move hover:bg-gray-100 transition-colors border border-gray-200"
                    draggable
                    onDragStart={(event) => {
                      console.log('Starting drag for node:', item);
                      onDragStart(event, item);
                    }}
                  >
                    <div className={`p-2 rounded-md bg-${category.color}-100`}>
                      {item.icon && (
                        <span className={`text-${category.color}-500`}>
                          {renderIcon(item.icon)}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-sm font-medium text-gray-900 truncate">
                        {item.label}
                      </span>
                      {item.description && (
                        <span className="text-xs text-gray-500 truncate">
                          {item.description}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default NodePanel;