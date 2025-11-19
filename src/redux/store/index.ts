import { configureStore } from "@reduxjs/toolkit";

//Import reducers
import user from "../slices/userSlice";
import cart from "../slices/cart.slice";
import products from "@redux/slices/productsSlice";
import clients from "@redux/slices/clientsSlice";
import note from "@redux/slices/noteSlice";
import location from "@redux/slices/countrySlice";
import exchange from "@redux/slices/exchangeSlice";
import replenishment from "@redux/slices/replenishmentSlice";
import history from "@redux/slices/historySlice";

//Configure store
export const store = configureStore({
  reducer: {
    user,
    note,
    cart,
    products,
    clients,
    location,
    exchange,
    replenishment,
    history,
  },
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
export type AppGetState = AppStore["getState"];
