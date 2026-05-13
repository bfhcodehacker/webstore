import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { CartState } from '../types/cartTypes.ts/cartTypes';
import type { AddToCart, DecrementCartItem, IncrementCartItem, RemoveFromCart } from '../types/cartTypes.ts/cartActions';


const initialState: CartState = {
  cartCount: 0,
  cart: []
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<AddToCart>) => {
      const index = state.cart.findIndex(cartProd => cartProd.product.id === action.payload.product.id);
      if (index === -1) {
        state.cart = [...state.cart, {product: action.payload.product, quantity: 1}];
      } else {
        state.cart[index].quantity += 1;
      }
      state.cartCount += 1;
    },
    removeFromCart: (state, action: PayloadAction<RemoveFromCart>) => {
      const index = state.cart.findIndex(cartProd => cartProd.product.id === action.payload.id);
      if (index > -1) {
        state.cartCount -= state.cart[index].quantity;
        state.cart.splice(index);
      }
    },
    incrementCartItem: (state, action: PayloadAction<IncrementCartItem>) => {
      const index = state.cart.findIndex(cartProd => cartProd.product.id === action.payload.id);
      if (index > -1) {
        state.cartCount += 1;
        state.cart[index].quantity += 1;
      }
    },
    decrementCartItem: (state, action: PayloadAction<DecrementCartItem>) => {
      const index = state.cart.findIndex(cartProd => cartProd.product.id === action.payload.id);
      if (index > -1) {
        state.cartCount -=1;
        const qty = state.cart[index].quantity;
        if (qty === 1) {
          state.cart.splice(index);
        } else {
          state.cart[index].quantity -= 1;
        }
      }
    }
  }
});

export const { addToCart, removeFromCart, incrementCartItem, decrementCartItem } = cartSlice.actions;

export default cartSlice.reducer;