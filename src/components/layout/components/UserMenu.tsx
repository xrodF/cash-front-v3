import { FC, Fragment } from "react";

import {
  Divider,
  Menu,
  MenuItem,
  Typography,
  Paper,
  Avatar,
  Box,
  SxProps,
  Backdrop,
  alpha,
  useTheme,
} from "@mui/material";

import { NavigateFunction, useNavigate } from "react-router-dom";

import Cookies from "js-cookie";

import LogoutIcon from "@mui/icons-material/Logout";
import OpenInBrowserIcon from "@mui/icons-material/OpenInBrowser";

import { stringAvatar } from "@/utils/string-tratament";
import { useGlobalContext } from "@/context/global";
import { handleConfirm } from "@utils/handleConfirm";
import { VersionComponent } from "@components/version";

interface OptionProps {
  navigate: NavigateFunction;
}

interface MenuProps {
  anchorElUser: null | HTMLElement;
  handleCloseUserMenu: () => void;
}

interface SubMenuItem {
  text: string;
  action: ({ navigate }: OptionProps) => Promise<void>;
  icon: React.ReactNode;
  borderTop?: boolean;
  sx?: SxProps;
  sxIcon?: SxProps;
  disabled?: boolean;
}

const UserMenu: FC<MenuProps> = ({ anchorElUser, handleCloseUserMenu }) => {
  const theme = useTheme();

  const navigate = useNavigate();

  const { global_context } = useGlobalContext();

  const options: SubMenuItem[] = [
    {
      text: "Abrir pantalla secundaria",
      action: async () => {
        const url = "/customer-display";
        window.open(url, "_blank", "noopener,noreferrer");
      },
      icon: <OpenInBrowserIcon />,
      sx: {
        justifyContent: "space-between",

        "& .MuiTypography-root": {
          fontWeight: 600,
        },

        "&:hover": {
          backgroundColor: alpha(theme.palette.info.dark, 0.9),
          color: "#fff",
        },
      },
      sxIcon: {
        bgcolor: "info.dark",
      },
    },

    {
      text: "Cerrar sesión",
      action: async () => {
        if (!(await handleConfirm({ title: "Cerrar sesión", text: "" })))
          return;

        Cookies.remove(import.meta.env.VITE_TOKEN_NAME);
        window.location.href = import.meta.env.VITE_BASE_URL_LOGIN;
      },
      icon: <LogoutIcon />,
      borderTop: true,
      sx: {
        justifyContent: "space-between",
        bgcolor: "error.dark",

        "& .MuiTypography-root": {
          fontWeight: 600,
        },

        "&:hover": {
          backgroundColor: alpha(theme.palette.error.dark, 0.9),
          color: "#fff",
        },
      },
      sxIcon: {
        bgcolor: "transparent",
      },
    },
  ];

  return (
    <Fragment>
      <Backdrop
        open={Boolean(anchorElUser)}
        onClick={handleCloseUserMenu}
        sx={{ zIndex: (theme) => theme.zIndex.modal }}
        invisible={false}
        style={{
          background: "rgb(0,0,0, 0.1)",
          backdropFilter: "blur(4px)",
        }}
      />

      <Menu
        id="menu-user-options"
        anchorEl={anchorElUser}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
        sx={{
          mt: 1,
          "& .MuiList-root": {
            p: 0.75,
            minWidth: 280,
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 1,
          },

          "& .MuiPaper-root": {
            borderRadius: 1,
          },
        }}
      >
        <Paper
          sx={{
            display: "flex",
            gap: 1,
            alignItems: "center",
            p: 1,
            borderRadius: 1,
          }}
          elevation={0}
        >
          <Avatar
            {...stringAvatar({
              name: global_context.userData?.name || "Desarrollo",
            })}
          />

          <Box
            component={"div"}
            sx={{ display: "flex", flexDirection: "column" }}
          >
            <Typography textAlign="left" variant="body2">
              {global_context.userData?.name || "Desarrollo"}
            </Typography>
            <Typography textAlign="left" variant="caption">
              {global_context.userData?.email || "dev@desarrollo.com"}
            </Typography>
          </Box>
        </Paper>

        {options.map(
          ({ action, icon, text, borderTop, disabled, sx, sxIcon }, index) => (
            <Box key={`option-user-menu-${index}`}>
              {(borderTop || index === 0) && <Divider sx={{ my: 0.75 }} />}

              <MenuItem
                key={`option-user-menu-${index}`}
                onClick={() => {
                  action({ navigate });
                  handleCloseUserMenu();
                }}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  borderRadius: 1,
                  pl: 0,
                  ...sx,
                }}
                disabled={disabled ?? false}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 1,
                    bgcolor: "primary.dark",
                    padding: 0.75,
                    width: 32,
                    height: 32,
                    ml: 1,
                    ...sxIcon,
                    ...(disabled && {
                      bgcolor: "divider",
                    }),
                  }}
                >
                  {icon}
                </Box>

                <Typography textAlign="center">{text}</Typography>
              </MenuItem>
            </Box>
          )
        )}

        <Box
          sx={{
            pt: 0.75,
          }}
        >
          <VersionComponent />
        </Box>
      </Menu>
    </Fragment>
  );
};

export default UserMenu;
