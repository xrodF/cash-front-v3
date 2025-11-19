import { FC, useEffect, useState } from "react";
import { Box, darken, Drawer, Grid, Typography } from "@mui/material";

import CountdownProgress from "@components/shared/CountdownProgress";
import { CreateDrawer } from "../CreateDrawer";
import { CustomPaper, StyledButton } from "@components/shared/styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faCircleCheck,
  faCircleExclamation,
  faCircleInfo,
  faCircleXmark,
  faDownload,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";

interface HandlerProps {
  variant: variantType;
  timer?: number;
  title: string;
  text: string;
  showCancelButton?: boolean;
  cancelButtonText?: string;
  showDenyButton?: boolean;
  denyButtonText?: string;
  showConfirmButton?: boolean;
  confirmButtonText?: string;
  headerAction?: boolean;
  headerActionText?: string;
  onClickHeaderAction?: () => void;
  allowOutsideClick?: boolean;
  didClose?: () => void;
}

interface ComponentProps extends Omit<HandlerProps, "theme"> {
  onConfirm: (res: DrawerAlertResponse) => void;
  onCancel: (error: Error) => void;
}

const EventHandlerComponent: FC<ComponentProps> = ({
  onConfirm,
  onCancel,
  variant,
  timer,
  title,
  text,
  showCancelButton,
  cancelButtonText,
  showDenyButton,
  denyButtonText,
  showConfirmButton,
  confirmButtonText,
  headerAction,
  headerActionText,
  allowOutsideClick,
  onClickHeaderAction,
}) => {
  const open = useState(false);

  useEffect(() => {
    setTimeout(() => {
      open[1](true);
    }, 250);
  }, [open]);

  const confirmAction = ({
    isConfirmed = false,
    isDenied = false,
    isDismissed = false,
  }: Partial<DrawerAlertResponse>) => {
    onConfirm({
      isConfirmed,
      isDenied,
      isDismissed,
    });
  };

  const icons: Record<variantType, IconDefinition> = {
    ["info"]: faCircleInfo,
    ["warning"]: faCircleExclamation,
    ["error"]: faCircleXmark,
    ["success"]: faCircleCheck,
  };

  return (
    <Drawer
      anchor="bottom"
      open={open[0]}
      sx={{
        "& .MuiDrawer-paper": { m: 2, borderRadius: 2 },
      }}
      {...(allowOutsideClick && {
        onClose: () =>
          confirmAction({
            isDismissed: true,
          }),
      })}
    >
      <CustomPaper
        sx={{
          ...(variant && {
            bgcolor: (th) => darken(th.palette[variant].dark, 0.8),
          }),
          minHeight: "35dvh !important",
          maxHeight: "50dvh !important",
          p: 3,
          display: "flex",
          flexDirection: "column",
          pb: 1,
          gap: 2.5,
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            <FontAwesomeIcon icon={icons[variant]} size="2xl" />
            <Typography sx={{ fontSize: 30 }}>{title}</Typography>
          </Box>

          {headerAction && (
            <StyledButton
              onClick={() => {
                onClickHeaderAction?.();
              }}
              sx={{
                height: 36,
                bgcolor: "common.white",
                color: "common.black",

                "&:hover": {
                  bgcolor: "common.white",
                  color: "common.black",
                },
              }}
            >
              <FontAwesomeIcon icon={faDownload} size="lg" />
              {headerActionText}
            </StyledButton>
          )}
        </Box>

        <Typography variant="h6">{text}</Typography>

        <Grid
          container
          spacing={2}
          sx={{
            ...(!timer && { mb: 2 }),
          }}
        >
          <Grid size={{ xs: 12 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                justifyContent: "space-between",

                "& .MuiButton-root": {
                  minWidth: 180,
                },
              }}
            >
              {showCancelButton && (
                <StyledButton
                  color="error"
                  onClick={() =>
                    onCancel(new Error("Cancelado por el usuario"))
                  }
                >
                  {cancelButtonText}
                </StyledButton>
              )}

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                {showDenyButton && (
                  <StyledButton
                    color="info"
                    onClick={() =>
                      confirmAction({
                        isDenied: true,
                      })
                    }
                  >
                    {denyButtonText}
                  </StyledButton>
                )}

                {showConfirmButton && (
                  <StyledButton
                    sx={{
                      minWidth: `240px !important`,
                    }}
                    onClick={() =>
                      confirmAction({
                        isConfirmed: true,
                      })
                    }
                  >
                    {confirmButtonText}
                    <FontAwesomeIcon icon={faArrowRight} size="lg" />
                  </StyledButton>
                )}
              </Box>
            </Box>
          </Grid>

          {timer && (
            <Grid size={{ xs: 12 }}>
              <CountdownProgress
                duration={timer}
                variant={variant}
                onFinish={() =>
                  confirmAction({
                    isDismissed: true,
                  })
                }
              />
            </Grid>
          )}
        </Grid>
      </CustomPaper>
    </Drawer>
  );
};

export default async function EventHandler({
  variant = "info",
  timer,
  title,
  text,
  showCancelButton = true,
  cancelButtonText = "Cancelar",
  showDenyButton = false,
  denyButtonText = "Denegar",
  showConfirmButton = true,
  confirmButtonText = "Continuar",
  headerAction = false,
  headerActionText = "Acción superior",
  onClickHeaderAction,
  allowOutsideClick = false,
}: HandlerProps) {
  const res = await CreateDrawer((rejected, resolve) => (
    <EventHandlerComponent
      onConfirm={(res) => resolve(res)}
      onCancel={(error) => rejected(error)}
      variant={variant}
      timer={timer}
      title={title}
      text={text}
      showCancelButton={showCancelButton}
      cancelButtonText={cancelButtonText}
      showDenyButton={showDenyButton}
      denyButtonText={denyButtonText}
      showConfirmButton={showConfirmButton}
      confirmButtonText={confirmButtonText}
      headerAction={headerAction}
      headerActionText={headerActionText}
      onClickHeaderAction={onClickHeaderAction}
      allowOutsideClick={allowOutsideClick}
    />
  ));

  return res;
}
