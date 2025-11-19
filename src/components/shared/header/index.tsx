import { FC } from "react";
import { Box, SxProps, Theme, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

import { BackButton, Container } from "./styled";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

interface HeaderProps {
  subtitle?: boolean;
  backBtn?: boolean;
  backBtnText?: boolean;
  pathToNavigate?: string;
  replace?: boolean;
  title?: string;
  icon?: React.ReactNode;
  sxTitle?: SxProps<Theme>;
  sxContainer?: SxProps<Theme>;
  component?: React.ReactNode;
  onClickBack?: () => void;
}

const HeaderComponent: FC<HeaderProps> = ({
  subtitle = false,
  backBtn = false,
  backBtnText = false,
  pathToNavigate,
  replace = false,
  icon,
  title,
  sxTitle,
  sxContainer,
  component,
  onClickBack,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Container
      sx={{
        my: 2,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        ...(sxContainer || {}),
      }}
    >
      <Box
        sx={{ display: "flex", alignItems: "center ", gap: 1, height: "100%" }}
      >
        {backBtn && (
          <BackButton
            onClick={() => {
              if (onClickBack) {
                onClickBack?.();
                return;
              }

              navigate(
                {
                  pathname: pathToNavigate || location.state?.from || "/",
                  search: location.search,
                },
                {
                  replace,
                }
              );
            }}
            variant="outlined"
          >
            <ArrowBackIcon />
            {backBtnText && (
              <Typography
                sx={{
                  textTransform: "none",
                }}
              >
                Volver
              </Typography>
            )}
          </BackButton>
        )}

        {icon && (
          <Box
            sx={{
              backgroundColor: "primary.main",
              p: 2,
              borderRadius: 10,
              width: "40px",
              height: "40px",
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
            }}
          >
            {icon}
          </Box>
        )}

        {title && (
          <Typography
            variant={subtitle ? "h5" : "h4"}
            sx={{
              ...(component && { mr: 2 }),
              ...(sxTitle || {}),
            }}
            fontWeight={600}
          >
            {title}
          </Typography>
        )}
      </Box>

      {component}
    </Container>
  );
};

export default HeaderComponent;
