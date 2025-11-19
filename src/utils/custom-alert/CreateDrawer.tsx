import { Fragment } from "react";
import { ThemeProvider } from "@mui/material";
import { createRoot, Root } from "react-dom/client";
import { theme } from "@components/layout/theme";

type ModalCallback = (
  reject: (x: Error) => void,
  resolve: (x: DrawerAlertResponse) => void
) => React.ReactNode;

let activeRoot: Root | null = null;
let activeElement: HTMLElement | null = null;

function cleanup() {
  if (activeRoot && activeElement) {
    activeRoot.unmount();
    document.body.removeChild(activeElement);
  }
  activeRoot = null;
  activeElement = null;
}

export const CreateDrawer = (component: ModalCallback) => {
  cleanup();

  const promise = new Promise<DrawerAlertResponse>((res, rej) => {
    const element = document.createElement("div");
    document.body.appendChild(element);
    const root = createRoot(element);

    activeRoot = root;
    activeElement = element;

    const reject = (x: Error) => {
      cleanup();
      rej(x);
    };

    const resolve = (x: DrawerAlertResponse) => {
      cleanup();
      res(x);
    };

    root.render(
      <ThemeProvider theme={theme}>
        <Fragment>{component(reject, resolve)}</Fragment>
      </ThemeProvider>
    );
  });

  return promise;
};
