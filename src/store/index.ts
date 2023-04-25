import { configureStore } from "@reduxjs/toolkit";
import BottomNavSlice from "./slices/bottom-nav";
import modalSlice from "./slices/modal";
import checkoutSlice from  "./slices/cart";

export default configureStore({
  reducer: {
    modal: modalSlice,
    nav: BottomNavSlice,
    cart: checkoutSlice
  },
});
