import { createTheme } from "@mui/material";
import type { Theme, Components, PaletteOptions } from "@mui/material";

type TThemes = Components<Omit<Theme, "components">>;

const palette: PaletteOptions = {
  mode: "dark",
  primary: { main: "#00d600" },
  secondary: { main: "#ffffff" },
  background: { default: "#303030", paper: "#000000" },
  action: { active: "#00d600" },
  text: { primary: "#ffffff", secondary: "#00d600" },
};

const MuiAppBar: TThemes["MuiAppBar"] = {
  defaultProps: {
    position: "fixed",
    elevation: 0,
  },
  styleOverrides: {
    root: {
      backgroundColor: palette.background?.paper || "#242934",
      color: "#FAFAFA",
    },
  },
};

const MuiCard: TThemes["MuiCard"] = {
  styleOverrides: {
    root: {
      padding: "1rem",
      backgroundColor: palette.background?.paper,
      border: `1px solid ${
        (palette.primary as { main: string })?.main || "#00000000"
      }`,
    },
  },
};

const MuiOutlinedInput: TThemes["MuiOutlinedInput"] = {
  styleOverrides: {
    root: {
      color: "#FAFAFA",
      backgroundColor: palette.background?.default,
      fieldset: {
        border: `1px solid white !important`,
      },
      "&:hover fieldset": {
        border: `1px solid ${
          (palette.primary as { main: string })?.main || "#00000000"
        } !important`,
      },
      "&.Mui-focused fieldset": {
        border: `1px solid ${
          (palette.primary as { main: string })?.main || "#00000000"
        } !important`,
      },
    },
  },
  defaultProps: {
    autoComplete: "off",
  },
};

const MuiInputBase: TThemes["MuiInputBase"] = {};

const MuiButton: TThemes["MuiButton"] = {
  styleOverrides: {
    contained: {
      borderBottom: "unset",

      "&:hover": {
        borderBottom: "unset",
      },
    },
    containedPrimary: {
      backgroundColor: "primary",
      color: "#1c5300",

      "&:hover": {
        backgroundColor: "primary",
      },
    },
    containedSecondary: {
      backgroundColor: "secondary",
      color: "#5d5858",

      "&:hover": {
        backgroundColor: "secondary",
      },
    },
    containedWarning: {
      backgroundColor: "#fece3d",
      color: "#957201",

      "&:hover": {
        color: "#957201",
        backgroundColor: "#fece3d",
      },
    },
    containedError: {
      backgroundColor: "#D30000",
      "&:hover": {
        backgroundColor: "#7B0606",
        color: "#fff",
      },
    },
    containedSuccess: {
      color: "#fff",
      "&:hover": {
        backgroundColor: "#008200",
        color: "#fff",
      },
    },
    containedInfo: {
      color: "#fff",
      "&:hover": {
        backgroundColor: "#0069d9",
        color: "#fff",
      },
    },
  },
};

export const theme = createTheme({
  palette,
  typography: {},
  components: {
    MuiFormControl: {
      styleOverrides: {
        root: {
          marginBottom: "0.8em",
        },
      },
    },
    MuiOutlinedInput,
    MuiInputBase,
    MuiButton,
    MuiAppBar,
    MuiCard,
  },
});
