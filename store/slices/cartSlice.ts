import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from './../../app/types';

interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

// Başlangıç durumu
const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const item = action.payload;
      const existingItem = state.items.find(i => i.id === item.id);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.items.push({ ...item, quantity: 1 });
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      state.items = state.items.filter(item => item.id !== id);
    },
    incrementQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find(i => i.id === action.payload);
      if (item) {
        item.quantity++;
      }
    },
    decrementQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find(i => i.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity--;
      } else if (item && item.quantity === 1) {
        state.items = state.items.filter(i => i.id !== action.payload);
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, incrementQuantity, decrementQuantity, clearCart } = cartSlice.actions;

export default cartSlice.reducer;