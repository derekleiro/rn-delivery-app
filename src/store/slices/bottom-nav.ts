import { createSlice } from "@reduxjs/toolkit";

export const BottomNavSlice = createSlice({
  name: "bottomNav",
  initialState: { nav: "Home" as string },
  reducers: {
    navigate: (state, action) => {
      state.nav = action.payload;
    },
  },
});

export const { navigate } = BottomNavSlice.actions;
export default BottomNavSlice.reducer;
