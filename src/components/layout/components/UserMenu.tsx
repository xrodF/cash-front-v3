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
} from "@mui/material";

import { NavigateFunction, useNavigate } from "react-router-dom";

import Cookies from "js-cookie";

import LogoutIcon from "@mui/icons-material/Logout";
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
  disabled?: boolean;
}

const UserMenu: FC<MenuProps> = ({ anchorElUser, handleCloseUserMenu }) => {
  const navigate = useNavigate();

  const { global_context } = useGlobalContext();

  const options: SubMenuItem[] = [
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
        backgroundColor: "error.dark",
        color: "common.white",

        "&:hover": {
          backgroundColor: "error.light",
        },
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
          ({ action, icon, text, borderTop, disabled, sx }, index) => (
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
                  ...sx,
                }}
                disabled={disabled ?? false}
              >
                {icon}
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
