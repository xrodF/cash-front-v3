import { FC } from "react";

import { faArrowDown, faCashRegister } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Chip, Typography, Zoom } from "@mui/material";

export const InfoItem: FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <Box
      sx={{
        bgcolor: "divider",
        p: 1,
        borderRadius: 2,
        width: "100%",
        display: "flex",
        justifyContent: "center",
        fontWeight: 600,
      }}
    >
      <Typography
        fontFamily={'"Poppins", sans-serif'}
        sx={{
          textAlign: "center",
          color: "white",
          fontWeight: "600",
          fontSize: "1.1rem",
        }}
      >
        {children}
      </Typography>
    </Box>
  );
};

export const MoreItemsIndicator: FC<{ open: boolean }> = ({ open }) => {
  return (
    <Zoom in={open} unmountOnExit>
      <Chip
        label={
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              px: 2,
            }}
          >
            <Typography
              sx={{
                fontWeight: 600,
              }}
            >
              Más productos en la lista
            </Typography>
            <FontAwesomeIcon icon={faArrowDown} size="lg" />
          </Box>
        }
        sx={{
          position: "absolute",
          bottom: "10px",
          left: "50%",
          translate: "-50%",
          bgcolor: "warning.main",
          color: "common.black",
        }}
      />
    </Zoom>
  );
};

export const CashRegisterIconPlaceholder = () => (
  <Box
    sx={{
      position: "absolute",
      left: "50%",
      top: "50%",
      transform: "translate(-50%, -50%)",
      display: "flex",
      alignItems: "center",
      gap: 0.5,
      color: "text.disabled",
      pointerEvents: "none", // no bloquea clics
    }}
  >
    <Box
      sx={{
        display: "flex",
        fontSize: "1rem",
        fontFamily: "monospace",
        border: "1px solid",
        borderColor: "divider",
        borderRadius: "6px",
        p: 1,
        backgroundColor: "action.hover",
        gap: 1,
      }}
    >
      <FontAwesomeIcon icon={faCashRegister} size="lg" />
      Esperando a que el cajero agregue productos
    </Box>
  </Box>
);
