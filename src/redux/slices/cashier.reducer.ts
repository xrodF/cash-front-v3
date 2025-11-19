import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ICashierSlice {
  cashierData: ICashierData | null;
  id_cashbox: number | null;
}

const initialState: ICashierSlice = {
  cashierData: null,
  id_cashbox: null,
};

const localStorageName = "cashier-data";

export const cashierSlice = createSlice({
  name: "cashier",
  initialState,
  reducers: {
    setCashier: (
      state,
      action: PayloadAction<{ cashierData: ICashierData; id_cashbox: number }>
    ) => {
      state.cashierData = action.payload.cashierData;
      state.id_cashbox = action.payload.id_cashbox;

      saveToLocalStorage(state);
    },

    loadCashierData: (state) => {
      const dataCashier = localStorage.getItem(localStorageName);

      if (dataCashier) {
        const data = JSON.parse(dataCashier);

        state.cashierData = data.cashierData;
        state.id_cashbox = data.id_cashbox;
      }
    },

    resetCashier: (state) => {
      state.cashierData = null;
      state.id_cashbox = null;

      saveToLocalStorage(null);
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCashier, loadCashierData, resetCashier } =
  cashierSlice.actions;

export type CashierActions = typeof cashierSlice.actions;

export default cashierSlice.reducer;

const saveToLocalStorage = (state: ICashierSlice | null) => {
  if (!state) {
    localStorage.removeItem(localStorageName);
  } else {
    localStorage.setItem(localStorageName, JSON.stringify(state));
  }
};
