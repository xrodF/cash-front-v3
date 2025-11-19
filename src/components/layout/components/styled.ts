import { alpha, Button, styled } from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import { Link } from "react-router-dom";

export const AppBar = styled(MuiAppBar)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  padding: theme.spacing(0, 0.5),
}));

export const StyledLink = styled(Link)(({ theme }) => ({
  height: theme.spacing(3.75),
}));

export const NavbarLogo = styled("img")(() => ({
  height: "100%",
  width: "100%",
  objectFit: "contain",
}));

export const LogoutButton = styled(Button)<{ open: "true" | "false" }>(
  ({ open, theme }) => ({
    minWidth: theme.spacing(6),
    minHeight: theme.spacing(6),
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(2),
    borderRadius: theme.spacing(10),
    backgroundColor:
      open === "true"
        ? "rgba(255, 255, 255, 0.10)"
        : alpha(theme.palette.error.main, 0.25),
    color: theme.palette.common.white,
    textTransform: "none",

    "&:hover": {
      backgroundColor: theme.palette.error.dark,
    },
  })
);
