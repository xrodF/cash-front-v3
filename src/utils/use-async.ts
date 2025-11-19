import { useEffect } from "react";

const useAsync = (
  callback: () => Promise<void> | void,
  states?: Array<unknown>
) => {
  useEffect(() => {
    callback();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, states ?? []);
};

export default useAsync;
