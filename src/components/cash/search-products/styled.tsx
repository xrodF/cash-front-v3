import { Box } from "@mui/material";

import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";

export const ReturnIconPlaceholder = () => (
  <Box
    sx={{
      position: "absolute",
      right: 12,
      top: "50%",
      transform: "translateY(-50%)",
      display: "flex",
      alignItems: "center",
      gap: 0.5,
      color: "text.disabled",
      pointerEvents: "none", // no bloquea clics
    }}
  >
    <KeyboardReturnIcon fontSize="small" />
    <Box
      sx={{
        fontSize: "0.75rem",
        fontFamily: "monospace",
        border: "1px solid",
        borderColor: "divider",
        borderRadius: "6px",
        px: 0.7,
        py: 0.1,
        boxShadow: "inset 0 -1px 1px rgba(0,0,0,0.2)",
        backgroundColor: "action.hover",
      }}
    >
      Presiona <span style={{ fontWeight: "bold" }}>Enter</span> para buscar
    </Box>
  </Box>
);
