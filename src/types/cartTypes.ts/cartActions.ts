import type { Product } from "../productTypes";

export type AddToCart = {
  product: Product;
}

export type RemoveFromCart = {
  id: number;
}

export type IncrementCartItem = {
  id: number;
}

export type DecrementCartItem = {
  id: number;
}