import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "modal",
  initialState: { data: { items: [] } },
  reducers: {
    addToCart: (state, action) => {
      state.data.items = state.data.items.concat({
        ...action.payload,
        orderIndex: state.data.items.length,
        orderStatus: "pending",
      });
    },
    removeFromCart: (state, action) => {
      const inventoryID = action.payload;

      state.data.items = state.data.items.filter(
        (val: any) => val.inventoryID !== inventoryID
      );
    },
    clearCart: (state) => {
      state.data = { items: [] };
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
