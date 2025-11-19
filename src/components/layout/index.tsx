import { FC } from "react";

import { Outlet } from "react-router-dom";

import Box from "@mui/material/Box";

import Navbar from "./components/Navbar";

const LayoutComponent: FC<{ auth: boolean }> = ({ auth }) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100dvh" }}>
      {auth && <Navbar />}

      <Box
        component="main"
        {...(auth && {
          sx: {
            flexGrow: 1,
            p: 3,
            bgcolor: "rgb(30, 30, 30)",
            marginTop: "64px",
            minHeight: "calc(100dvh - 64px)",
            display: "flex",
            flexDirection: "column",
            gap: 1,
          },
        })}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default LayoutComponent;
