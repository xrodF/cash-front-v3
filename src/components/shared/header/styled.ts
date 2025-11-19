import { Button, styled } from "@mui/material";

export const Container = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  width: "100%",
  gap: theme.spacing(1),

  [theme.breakpoints.up("sm")]: {
    alignItems: "flex-start",
    flexDirection: "row",
  },

  "& .MuiTypography-root": {
    color: theme.palette.common.white,
  },
}));

export const BackButton = styled(Button)(({ theme }) => ({
  borderRadius: theme.spacing(4),
  padding: theme.spacing(1, 1.5),
  minWidth: "50px",
  maxHeight: "40px",
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),

  "& .MuiTypography-root": {
    color: theme.palette.primary.main,
  },
}));
