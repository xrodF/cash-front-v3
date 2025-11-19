import { useState } from "react";

import { Box, Divider, styled, Typography } from "@mui/material";

import { CustomPaper, StyledButton } from "@components/shared/styled";
import LoginForm from "@components/login";

import { loginAction } from "./utils/post-login";

//Rempazar en caso de ser necesario
import logo from "/logo.svg";
import { VersionComponent } from "@components/version";

const LoginPage = () => {
  const isLoading = useState<boolean>(false);
  const isPasswordVisible = useState<boolean>(false);

  const loginData = useState<LoginData>({
    email: "",
    password: "",
  });

  return (
    <Box
      component={"div"}
      sx={{
        display: "flex",
        width: "100dvw",
        height: "100dvh",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: {
          xs: "#00000000",
          sm: "background.default",
        },
      }}
    >
      <CustomPaper
        sx={{
          maxWidth: {
            xs: "100%",
            sm: 500,
          },
          width: "100%",
        }}
        elevation={0}
      >
        <LogoContainer>
          <NavbarLogo className="navLogo" src={logo} alt="Logo NZ" />
        </LogoContainer>

        <Typography variant="h4" sx={{ mt: 3, fontWeight: 600, fontSize: 30 }}>
          Iniciar sesion
        </Typography>

        <LoginForm
          loginData={loginData}
          isPasswordVisible={isPasswordVisible}
        />

        <StyledButton
          fullWidth
          loading={isLoading[0]}
          loadingIndicator="start"
          onClick={() => loginAction(isLoading[1], loginData[0])}
          sx={{ color: "common.white", mt: 1 }}
        >
          Iniciar sesión
        </StyledButton>

        <Divider sx={{ bgcolor: "divider" }} />

        <VersionComponent />
      </CustomPaper>
    </Box>
  );
};

export default LoginPage;

export const LogoContainer = styled("div")(({ theme }) => ({
  height: theme.spacing(5.5),
}));

export const NavbarLogo = styled("img")(() => ({
  height: "100%",
  objectFit: "scale-down",
}));
