import type { Product } from '../../types/productTypes';

export type CartProduct = {
  product: Product;
  quantity: number;
}

export type CartState = {
  cartCount: number;
  cart: CartProduct[];
}

