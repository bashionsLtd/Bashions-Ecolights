import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

const initialState: CartState = {
  items: [],
  isOpen: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    toggleCart: (state) => {
      state.isOpen = !state.isOpen;
    },

  addItem: (state, action: PayloadAction<CartItem>) => {
    const item = state.items.find(i => i.name === action.payload.name);
    if (item) {
      item.quantity += 1; // ✅ use passed quantity
    } else {
      state.items.push({ ...action.payload });
    }
  },


    removeItem: (state, action: PayloadAction<string>) => {
      // ✅ Completely remove the product, no decrement
      state.items = state.items.filter(i => i.name !== action.payload);
    },

    decreaseQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find(i => i.name === action.payload);
      if (item) {
        item.quantity -= 1;
        if (item.quantity <= 0) {
          state.items = state.items.filter(i => i.name !== action.payload);
        }
      }
    },

    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { toggleCart, addItem, removeItem, clearCart, decreaseQuantity } = cartSlice.actions;
export default cartSlice.reducer;
