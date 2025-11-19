import { styled } from "@mui/material";

export const RootContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1),
  maxHeight: "80dvh",
  width: "100%",
  "*::-webkit-scrollbar-thumb": {
    background: "#d5d5d5",
  },
}));
