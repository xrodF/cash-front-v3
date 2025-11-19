import { Fragment, useState } from "react";

import {
  Backdrop,
  Box,
  Menu,
  MenuItem,
  SxProps,
  Typography,
  useTheme,
} from "@mui/material";
import { StyledButton } from "@components/shared/styled";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faGift, faPlus } from "@fortawesome/free-solid-svg-icons";

interface OptionItem {
  label: string;
  action: () => void;
  icon: React.ReactNode;
  sx?: SxProps;
  sxIcon?: SxProps;
  disabled?: boolean;
}

const OptionsMenu = () => {
  const theme = useTheme();

  const anchorEl = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl[0]);

  const handleClose = () => {
    anchorEl[1](null);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    anchorEl[1](event.currentTarget);
  };

  const options: OptionItem[] = [
    {
      label: "Aumentar cantidad",
      action: async () => {
        handleClose();
      },
      icon: <FontAwesomeIcon icon={faPlus} size="lg" />,
      sx: {
        color: "success.main",
        "&:hover": {
          bgcolor: "success.dark",
          color: "common.white",
        },
      },
      sxIcon: {
        bgcolor: "success.dark",
        color: "common.white",
      },
    },
    {
      label: "Aplicar GiftCard",
      action: async () => {
        handleClose();
      },
      icon: <FontAwesomeIcon icon={faGift} size="lg" />,
      sx: {
        color: "info.main",
        "&:hover": {
          bgcolor: "info.dark",
          color: "common.white",
        },
      },
      sxIcon: {
        bgcolor: "info.dark",
        color: "common.white",
      },
    },
  ];

  return (
    <Fragment>
      <StyledButton
        color="info"
        onClick={handleClick}
        sx={{
          height: 56,
          ...(Boolean(anchorEl[0]) && {
            zIndex: theme.zIndex.modal + 1,
          }),
        }}
      >
        <FontAwesomeIcon icon={faGear} size="lg" />
      </StyledButton>

      <Backdrop
        open={Boolean(anchorEl[0])}
        onClick={handleClose}
        sx={{ zIndex: (theme) => theme.zIndex.modal }}
        invisible={false}
        style={{
          background: "rgb(0,0,0, 0.5)",
          backdropFilter: "blur(4px)",
        }}
      />

      <Menu
        open={open}
        anchorEl={anchorEl[0]}
        onClose={handleClose}
        sx={{
          marginTop: 1,

          "& .MuiTypography-root": {
            color: "common.white",
          },

          "& .MuiList-root": {
            p: 0,
            minWidth: 300,
          },

          "& .MuiPaper-root": {
            minWidth: 300,
            bgcolor: "common.black",
            borderRadius: "8px",
          },
        }}
      >
        {options.map(({ action, icon, label, sx, sxIcon, disabled }, index) => (
          <Box key={`option-user-menu-${index}`}>
            <MenuItem
              disabled={disabled}
              key={`option-action-menu-${index}`}
              onClick={action}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                borderRadius: 1,
                p: 2,
                color: "primary.main",
                ...sx,
              }}
            >
              <Box
                sx={{
                  width: 4,
                  height: 4,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  p: 2,
                  borderRadius: 1,
                  ...sxIcon,

                  ...(disabled && {
                    color: "grey.500",
                    bgcolor: "grey.700",
                  }),
                }}
              >
                {icon}
              </Box>

              <Typography
                textAlign="center"
                sx={{
                  fontWeight: 600,
                }}
              >
                {label}
              </Typography>
            </MenuItem>
          </Box>
        ))}
      </Menu>
    </Fragment>
  );
};

export default OptionsMenu;
