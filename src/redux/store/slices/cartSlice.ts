import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
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
    item.quantity = action.payload.quantity; // Update to match the local counter
  } else {
    state.items.push({ ...action.payload });
  }
},
    removeItem: (state, action: PayloadAction<string>) => {
      const index = state.items.findIndex(i => i.name === action.payload);
      if (index !== -1) {
        if (state.items[index].quantity > 1) {
          state.items[index].quantity--;
        } else {
          state.items.splice(index, 1);
        }
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { toggleCart, addItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
