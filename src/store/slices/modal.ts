import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
  name: "modal",
  initialState: { modal: { type: "" as string, messages: [] as string[] } },
  reducers: {
    showModal: (state, action) => {
      state.modal = action.payload;
    },
    hideModal: (state) => {
      state.modal = { type: "" as string, messages: [] as string[] };
    },
  },
});

export const { showModal, hideModal } = modalSlice.actions;
export default modalSlice.reducer;
