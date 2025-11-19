import { createContext, Dispatch, SetStateAction, useContext } from "react";

export const GlobalContext = createContext<IGlobalContext>({
  setGlobalContext: () => {
    throw new Error("setGlobalContext function must be overridden");
  },
} as unknown as IGlobalContext);

export const useGlobalContext = () => useContext(GlobalContext);

interface IGlobalContext {
  global_context: GlobalContextData;
  setGlobalContext: Dispatch<SetStateAction<GlobalContextData>>;
}
