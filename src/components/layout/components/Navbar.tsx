import { useState } from "react";

import { Avatar, IconButton, Toolbar, useTheme } from "@mui/material";
import { AppBar, NavbarLogo, StyledLink } from "./styled";

import { stringAvatar } from "@utils/string-tratament";
import { useGlobalContext } from "@/context/global";
import UserMenu from "./UserMenu";

//Rempazar en caso de ser necesario
import logo from "/logo.svg";

const Navbar = () => {
  const theme = useTheme();

  const { global_context } = useGlobalContext();

  const anchorElUser = useState<null | HTMLElement>(null);

  const handleCloseUserMenu = () => {
    anchorElUser[1](null);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    anchorElUser[1](event.currentTarget);
  };
  return (
    <AppBar sx={{ boxShadow: 0 }}>
      <Toolbar
        style={{
          padding: 0,
          paddingLeft: 12,
          paddingRight: 8,
        }}
      >
        <StyledLink to={"/"}>
          <NavbarLogo className="navLogo" src={logo} alt="Logo NZ" />
        </StyledLink>

        <IconButton
          color="inherit"
          onClick={handleOpenUserMenu}
          sx={{ height: 42, width: 42, ml: "auto" }}
        >
          <Avatar
            {...stringAvatar({
              name: global_context.userData?.name ?? "Desarrollo",
              styles: {
                height: 40,
                width: 40,
                ...(Boolean(anchorElUser) && {
                  zIndex: theme.zIndex.modal + 1,
                }),
              },
            })}
          />
        </IconButton>

        <UserMenu
          anchorElUser={anchorElUser[0]}
          handleCloseUserMenu={handleCloseUserMenu}
        />
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
