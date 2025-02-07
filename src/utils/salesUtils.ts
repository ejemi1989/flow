export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
}

export interface Quote {
  products: Product[];
  total: number;
  validUntil: Date;
}

// Mock product data - in a real app this would come from an API
export const products: Product[] = [
  {
    id: '1',
    name: 'Basic Plan',
    price: 99,
    description: 'Perfect for small businesses',
  },
  {
    id: '2',
    name: 'Pro Plan',
    price: 199,
    description: 'Advanced features for growing teams',
  },
  {
    id: '3',
    name: 'Enterprise Plan',
    price: 499,
    description: 'Custom solutions for large organizations',
  },
];

export const generateQuote = (selectedProducts: Product[]): Quote => {
  const total = selectedProducts.reduce((sum, product) => sum + product.price, 0);
  const validUntil = new Date();
  validUntil.setDate(validUntil.getDate() + 30); // Quote valid for 30 days

  return {
    products: selectedProducts,
    total,
    validUntil,
  };
};