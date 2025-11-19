/* eslint-disable @typescript-eslint/no-unused-vars */
import { Dispatch, SetStateAction, useEffect, useState } from "react";

import useAsync from "@utils/use-async";

import "./App.css";

import { routes } from "./routes";
import Progress from "@components/shared/Progress";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Cookies from "js-cookie";
import { GlobalContext } from "./context/global";
import { initSocketsAction } from "./sockets";
import { UseExchangeSocket } from "./sockets/exchange";

// import { getUserPermissions } from "@services/auth-service";
// import { validatePermissions } from "@utils/auth/validateUserPermissions";

const { DEV, VITE_TOKEN, VITE_TOKEN_NAME } = import.meta.env;

function App() {
  const isFetch = useState<boolean>(true);
  const auth = useState<boolean>(true);

  const [global_context, setGlobalContext] = useState<GlobalContextData>({
    userData: null,
    open_cash: false,
    exchange: [],
  });

  const [wsExchange] = useState<ReturnType<typeof UseExchangeSocket>>(
    UseExchangeSocket()
  );

  const router = createBrowserRouter(routes({ auth: auth[0] }));

  useAsync(async () => {
    const token = DEV ? VITE_TOKEN : Cookies.get(VITE_TOKEN_NAME);

    try {
      if (token) {
        // const {
        //   data: { data },
        // } = await getUserPermissions();
        // await validatePermissions(data, setGlobalContext);
      } else {
        throw new Error();
      }
    } catch (error) {
      auth[1](false);
    } finally {
      isFetch[1](false);
    }
  }, []);

  useEffect(() => initSocketsAction(wsExchange, setGlobalContext), []);

  return (
    <GlobalContext.Provider
      value={{
        global_context,
        setGlobalContext: setGlobalContext as Dispatch<
          SetStateAction<GlobalContextData>
        >,
      }}
    >
      {isFetch[0] ? (
        <div style={{ height: "100dvh" }}>
          <Progress />
        </div>
      ) : (
        <RouterProvider router={router} />
      )}
    </GlobalContext.Provider>
  );
}

export default App;
