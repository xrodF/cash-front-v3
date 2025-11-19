import Cookies from "js-cookie";
import { UseExchangeSocket } from "./exchange";

const { DEV, VITE_TOKEN, VITE_TOKEN_NAME } = import.meta.env;

export const initSocketsAction = (
  wsExchange: ReturnType<typeof UseExchangeSocket>,
  setGlobalContext: React.Dispatch<React.SetStateAction<GlobalContextData>>
) => {
  const token = DEV ? VITE_TOKEN : Cookies.get(VITE_TOKEN_NAME);

  if (token) {
    wsExchange.OpenConnection({
      updateExchangeAction: (data) => {
        setGlobalContext((x) => ({ ...x, exchange: data }));
      },
    });
  }

  return () => {
    wsExchange?.CloseConnection();
  };
};
