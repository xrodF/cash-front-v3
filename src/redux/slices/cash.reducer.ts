import { ECurrency, getShortNameByCurrency } from "@/enums/currency_type";
import { ECashSteps } from "@/enums/ECashSteps";
import { EMovement_type } from "@/enums/EMovement_type";
import { EPaymentMethod } from "@/enums/EPaymentMethod";
import { CashAuthType } from "@/enums/socket";
import { IClient } from "@/modules/clientes/entities/clients";
import { Payment } from "@/modules/payment/entities/payment";
import { Product } from "@/modules/productos/entities/product";
import { CommunicationSocket } from "@/modules/sockets/communication-socket/CommunicationSocket";
import { numberToAbsoluteValue } from "@/utils/AmountsHelpers/numberToAbsoluteValue";
import { getMethodType } from "@/utils/Payments/GetMethodType";
import { getMovementType } from "@/utils/Payments/GetMovementType";
import { getPaymentStatus } from "@/utils/Payments/GetPaymentStatus";
import { MySwal } from "@erpexo/components";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const localStorageName = "cash-sale";

export enum ECashSaleTypes {
  SALE = "sale",
  WHOLESALE = "wholesale",
}

export interface ICashSlice {
  selected?: Product;
  step: ECashSteps;
  client?: IClient;
  saleNotesBarcode: Array<string>;
  products: Array<Product>;
  payments: Array<Payment>;
  unique_identifiers: Array<string>;
  commissions: number;
  id_sale_header: number;
  quantity: number;
  opened_at: string | null;
  saleType: ECashSaleTypes;
}

const initialState: ICashSlice = {
  id_sale_header: 0,
  payments: [],
  unique_identifiers: [],
  products: [],
  saleNotesBarcode: [],
  step: ECashSteps.REGISTER_CLIENT,
  quantity: 1,
  opened_at: null,
  commissions: 0,
  saleType: ECashSaleTypes.SALE,
};

export const cashSlice = createSlice({
  name: "cash",
  initialState,
  reducers: {
    setClient: (state, action: PayloadAction<IClient | undefined>) => {
      state.client = action.payload;
      saveToLocalStorage(state);
    },

    setOpenedAt: (state, action: PayloadAction<string | null>) => {
      state.opened_at = action.payload;
      saveToLocalStorage(state);
    },

    setStep: (state, action: PayloadAction<ECashSteps>) => {
      state.step = action.payload;
      saveToLocalStorage(state);
    },

    setSaleNote: (
      state,
      action: PayloadAction<{
        products: Product[];
        saleNoteBarcode: string;
      }>
    ) => {
      const products = joinProducts(state.products, action.payload.products);

      state.products = products;
      state.saleNotesBarcode.push(action.payload.saleNoteBarcode);
      state.step = ECashSteps.SELECT_PRODUCTS;
      state.selected = products[products.length - 1];
      saveToLocalStorage(state);
    },

    setSelectedProduct: (state, action: PayloadAction<Product | undefined>) => {
      state.selected = action.payload;
      saveToLocalStorage(state);
    },

    setProduct: (state, action: PayloadAction<Product>) => {
      const products = setProducts(
        state.products,
        action.payload,
        state.quantity
      );

      state.products = products;
      state.selected = products[products.length - 1];
      state.quantity = 1;

      saveToLocalStorage(state);
    },

    setAllProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
      saveToLocalStorage(state);
    },

    setQuantity: (state, action: PayloadAction<number>) => {
      state.quantity = action.payload;
      saveToLocalStorage(state);
    },

    setPayment: (state, action: PayloadAction<Payment>) => {
      applyPaymentToState(state, action.payload);
    },

    updatePaymentClientWallet: (state, action: PayloadAction<Payment>) => {
      const dataPayment = action.payload;

      const currIndex = state.payments.findIndex(
        (x) => x.movement_type === EMovement_type.CLIENT_WALLET
      );

      if (currIndex !== -1) {
        // se actualiza
        state.payments = [
          ...state.payments
            .map((x) => {
              let copy = { ...x };

              if (x.movement_type === EMovement_type.CLIENT_WALLET) {
                copy = { ...x, ...dataPayment };
              }

              return copy;
            })
            .filter((x) => x.amount_us > 0),
        ];

        saveToLocalStorage(state);
      } else {
        // se crea
        applyPaymentToState(state, dataPayment);
      }
    },

    loadData: (state) => {
      const cash = localStorage.getItem(localStorageName);
      if (cash) {
        const data = JSON.parse(cash);

        state.client = data.client;
        state.opened_at = data.opened_at;
        state.products = data.products;
        state.saleNotesBarcode = data.saleNotesBarcode;
        state.payments = data.payments;
        state.unique_identifiers = data.unique_identifiers;
        state.id_sale_header = data.id_sale_header;
        state.quantity = data.quantity;
        state.step = data.step;
        state.commissions = data.commissions;
        state.saleType = data.saleType || ECashSaleTypes.SALE;
      }
    },

    removePaymentInCash: (state) => {
      const pay = state.payments.filter(
        (e) => e.method !== EPaymentMethod.CASH
      );
      state.payments = pay;

      saveToLocalStorage(state);
    },

    removePaymentClientWallet: (state) => {
      state.payments = [
        ...state.payments.filter(
          (e) => e.method !== EPaymentMethod.CLIENT_WALLET
        ),
      ];

      saveToLocalStorage(state);
    },

    setIDSale: (state, action: PayloadAction<number>) => {
      state.id_sale_header = action.payload;
    },

    resetState: (state) => {
      state.products = [];
      state.client = undefined;
      state.selected = undefined;
      state.step = ECashSteps.REGISTER_CLIENT;
      state.saleNotesBarcode = [];
      state.payments = [];
      state.commissions = 0;
      state.unique_identifiers = [];
      state.saleType = ECashSaleTypes.SALE;
      state.opened_at = null;
      saveToLocalStorage(state);
    },

    setCommissions: (state, action: PayloadAction<number>) => {
      state.commissions = state.commissions + Number(action.payload);
      saveToLocalStorage(state);
    },

    replaceState: (state, action: PayloadAction<ICashSlice>) => {
      const data = action.payload;

      state.client = data.client;
      state.products = data.products;
      state.saleNotesBarcode = data.saleNotesBarcode;
      state.payments = data.payments;
      state.unique_identifiers = data.unique_identifiers;
      state.id_sale_header = data.id_sale_header;
      state.quantity = data.quantity;
      state.step = data.step;
      state.commissions = data.commissions;
      state.selected = data.selected;

      saveToLocalStorage(state);
    },

    setSaleType: (state, action: PayloadAction<ECashSaleTypes>) => {
      state.saleType = action.payload;
      if (action.payload === ECashSaleTypes.WHOLESALE) {
        state.step = ECashSteps.SELECT_PAYMENT_METHODS;
      } else {
        state.step = ECashSteps.REGISTER_CLIENT;
      }
      saveToLocalStorage(state);
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setClient,
  setOpenedAt,
  setStep,
  setSaleNote,
  setSelectedProduct,
  setProduct,
  setAllProducts,
  setPayment,
  updatePaymentClientWallet,
  setCommissions,
  loadData,
  removePaymentInCash,
  removePaymentClientWallet,
  setIDSale,
  setQuantity,
  resetState,
  replaceState,
  setSaleType,
} = cashSlice.actions;

export type CashActions = typeof cashSlice.actions;

export default cashSlice.reducer;

// helpers

// to sell note
const filterCondition = (x: Product, y: Product): boolean =>
  x.id_product === y.id_product &&
  x.price_unit === y.price_unit &&
  x.id_sale_note === y.id_sale_note;

const joinProducts = (products: Product[], productIn: Product[]): Product[] => {
  const newProducts = productIn.filter(
    (e) => !products.some((p) => filterCondition(p, e))
  );

  for (const entry of newProducts) {
    emitCashLog(
      CashAuthType.ADD_PRODUCT_TO_CASH,
      `Producto agregado: ${entry.name} - Cantidad: ${entry.quantity}`,
      entry
    );
  }

  const oldProducts = products.map((p) => {
    const product = productIn.find((e) => filterCondition(p, e));
    if (product) {
      const quantity = p.quantity + product.quantity;
      return {
        ...p,
        quantity,
        price: p.price_unit * quantity,
        price_tourist: p.price_tourist_unit * quantity,
      };
    } else {
      return p;
    }
  });

  return [...oldProducts, ...newProducts];
};

// to add product
const setProducts = (
  pre: Product[],
  current: Product,
  quantity: number = 1
): Product[] => {
  emitCashLog(
    CashAuthType.ADD_PRODUCT_TO_CASH,
    `Producto agregado: ${current.name} - Cantidad: ${quantity}`,
    current
  );

  const index = pre.findIndex(
    (e) =>
      e.id_product === current.id_product &&
      e.price_tourist_unit === current.price_tourist_unit &&
      e.delivery === current.delivery
  );

  if (index !== -1) {
    const identifiers: string[] = Object.values(
      current.unique_identifier[0] || {}
    );
    const aux = pre[index].unique_identifier
      .map((e) => Object.values(e))
      .flat<string[][]>()
      .map((e) => e.toUpperCase())
      .find((e) => identifiers.includes(e.toUpperCase()));

    if (aux) {
      throw new Error("El producto ya fue agregado");
    }

    return pre.map((e): Product => {
      if (
        e.id_product === current.id_product &&
        e.price_tourist_unit === current.price_tourist_unit &&
        e.delivery === current.delivery
      ) {
        return {
          ...e,
          quantity: e.quantity + quantity,
          id_sale_note_details: [
            ...(e.id_sale_note_details ?? []),
            ...(current.id_sale_note_details ?? []),
          ],
          unique_identifier: [
            ...e.unique_identifier,
            ...current.unique_identifier,
          ],
        };
      }
      return e;
    });
  } else {
    return [...pre, { ...current, quantity }];
  }
};

const saveToLocalStorage = (state: ICashSlice) => {
  const wsCommunication = new CommunicationSocket();

  localStorage.setItem(localStorageName, JSON.stringify(state));

  wsCommunication.streamCashboxToSupervisor({
    data: state,
  });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const emitCashLog = (type: CashAuthType, obs: string, data: any) => {
  const wsCommunication = new CommunicationSocket();

  wsCommunication.createCashLog({
    data: {
      type,
      obs,
      data: JSON.parse(JSON.stringify(data)),
    },
  });
};

const applyPaymentToState = (state: ICashSlice, payment: Payment) => {
  if (Object.values(payment.desglose).some((x) => x >= 9999999999)) {
    MySwal.fire({
      icon: "error",
      title: "Monto inválido",
      timer: 3000,
      timerProgressBar: true,
      allowEscapeKey: true,
      allowOutsideClick: true,
      text: "El monto ingresado es demasiado alto.",
      confirmButtonText: "Aceptar",
    });

    throw new Error("Pago no agregado");
  }

  const price = numberToAbsoluteValue(
    state.products.reduce((acc, product) => {
      return (
        acc +
        (state.client?.is_tourist
          ? product.price_tourist_unit
          : product.price_unit) *
          product.quantity
      );
    }, 0)
  );

  const totalPayments = state.payments.reduce((acc, payment) => {
    return acc + payment.amount_us;
  }, 0);

  const saldo = price - totalPayments;

  if (
    payment.movement_type !== EMovement_type.payment_cash &&
    payment.movement_type !== EMovement_type.DOCUMENTO_DE_PAGO &&
    payment.amount_us > saldo + 1
  ) {
    throw new Error(
      "El monto ingresado es mayor al saldo restante. Pago no agregado"
    );
  }

  state.payments = [...state.payments, payment];

  emitCashLog(
    CashAuthType.ADD_PAYMENT,
    `Tipo de pago: ${payment.method} - Monto en USD: ${payment.amount_us}`,
    {
      ...payment,
      method: getMethodType(payment.method),
      movement_type: getMovementType(payment.movement_type),
      status: getPaymentStatus(payment.status),
      desglose: Object.fromEntries(
        Object.entries(payment.desglose).map(([key, value]) => [
          [getShortNameByCurrency(Number(key) as ECurrency)],
          value,
        ])
      ),
    }
  );

  saveToLocalStorage(state);
};
