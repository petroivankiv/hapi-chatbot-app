export interface Product {
  product: string;
  category: string;
  name: string;
  author: string;
  description: string;
  price: number;
  rate: number;
  available: boolean;
  recommended: boolean;
  sale: number;
}

export interface Category {
  product: string;
  name: string;
  title: string;
  id: string;
}
