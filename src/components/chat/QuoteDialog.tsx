"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Product, products, generateQuote } from "@/utils/salesUtils";
import { format } from "date-fns";

interface QuoteDialogProps {
  onQuoteGenerated: (quoteText: string) => void;
}

const QuoteDialog = ({ onQuoteGenerated }: QuoteDialogProps) => {
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const handleProductToggle = (product: Product) => {
    setSelectedProducts(prev =>
      prev.some(p => p.id === product.id)
        ? prev.filter(p => p.id !== product.id)
        : [...prev, product]
    );
  };

  const handleGenerateQuote = () => {
    const quote = generateQuote(selectedProducts);
    const quoteText = `📋 Quote Summary:\n\nSelected Products:\n${quote.products
      .map(p => `- ${p.name} ($${p.price})`)
      .join('\n')}\n\nTotal: $${quote.total}\nValid until: ${format(
      quote.validUntil,
      'MMM d, yyyy'
    )}`;
    
    onQuoteGenerated(quoteText);
    setIsOpen(false);
    setSelectedProducts([]);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">Generate Quote</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Generate Quote</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            {products.map((product) => (
              <div key={product.id} className="flex items-start space-x-3">
                <Checkbox
                  id={product.id}
                  checked={selectedProducts.some(p => p.id === product.id)}
                  onCheckedChange={() => handleProductToggle(product)}
                />
                <div>
                  <label
                    htmlFor={product.id}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {product.name} - ${product.price}
                  </label>
                  <p className="text-sm text-muted-foreground">
                    {product.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <Button
            onClick={handleGenerateQuote}
            disabled={selectedProducts.length === 0}
            className="w-full"
          >
            Generate Quote
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QuoteDialog;