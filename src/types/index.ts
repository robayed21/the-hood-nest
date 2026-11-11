export type ProductCategory = 
  | 'hoodies' 
  | 'sweatshirts' 
  | 'jackets' 
  | 'sweaters' 
  | 'winter-bottoms' 
  | 'accessories';

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  priceBDT: number;
  originalPriceBDT?: number;
  image: string;
  badge?: 'Best Seller' | 'New Drop' | 'Signature' | 'Limited';
  inStock: boolean;
  fabricGSM?: string;
  sizes: ('M' | 'L' | 'XL' | 'XXL')[];
  rating: number;
  reviewsCount: number;
}

export interface NavItem {
  label: string;
  path: string;
  badge?: string;
}

