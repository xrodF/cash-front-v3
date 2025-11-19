import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "@components/layout/theme";
import { registerSW } from "./registerSw";

registerSW();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </StrictMode>
);
