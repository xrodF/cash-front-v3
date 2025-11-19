import { Typography } from "@mui/material";

export const VersionComponent = () => {
  return (
    <Typography
      color={"white"}
      sx={{
        userSelect: "none",
        opacity: 0.5,
        fontSize: "0.75rem",
        zIndex: 9999,
        textAlign: "center",
      }}
    >
      Version: {__APP_VERSION__}
    </Typography>
  );
};
