import {
  Box,
  Button,
  ButtonProps,
  Paper,
  styled,
  Tooltip,
  tooltipClasses,
  TooltipProps,
} from "@mui/material";

export const CustomPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1.25),
  borderRadius: theme.spacing(1),
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1.25),
}));

export const CustomTooltip = styled(
  ({
    className,
    title,
    dark = false,
    ...props
  }: TooltipProps & {
    dark?: boolean;
  }) => (
    <Tooltip
      {...props}
      classes={{ popper: className }}
      followCursor
      title={
        title ? (
          <Box
            sx={{
              bgcolor: dark ? "common.black" : "common.white",
              display: "flex",
              gap: 1,
              alignItems: "center",
              width: "100%",
            }}
          >
            {title}
          </Box>
        ) : undefined
      }
      arrow
    />
  )
)(({ dark, theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common[dark ? "black" : "white"],
    marginRight: "-9px !important",
    marginLeft: "-9px !important",
  },
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: "none",
    backgroundColor: theme.palette.common[dark ? "black" : "white"],
    color: theme.palette.common[dark ? "white" : "black"],
    fontWeight: 600,
    fontSize: theme.typography.body1.fontSize,
    borderRadius: 50,
    padding: theme.spacing(0.5, 3),
  },
}));

export const StyledButton = styled(
  ({
    color = "success",
    variant = "contained",
    ...props
  }: ButtonProps & {
    variantcolor?: "dark" | "main" | "light";
    titletooltip?: string;
    tooltipplacement?: TooltipProps["placement"];
  }) => (
    <CustomTooltip
      title={props.titletooltip ?? ""}
      placement={props.tooltipplacement}
    >
      <Button variant={variant} disableElevation color={color} {...props} />
    </CustomTooltip>
  )
)(({ variantcolor = "dark", color = "success", theme }) => ({
  display: "flex",
  gap: theme.spacing(1),
  borderRadius: theme.spacing(1),
  height: theme.spacing(5),
  ...(color !== "inherit" && {
    backgroundColor:
      theme.palette[color][
        color === "warning" ? "main" : variantcolor ?? "main"
      ],
    ...(color === "warning" && {
      color: theme.palette.grey[900],
    }),
  }),

  "& .MuiTypography-root": {
    display: "inline-flex",
  },

  "&.Mui-disabled": {
    color: theme.palette.grey[700],

    "& .MuiTypography-root": {
      color: theme.palette.grey[700],
    },
  },

  "&:hover": {
    border: "none",
    boxShadow: "none",
  },

  "&.MuiButton-contained": {
    border: "none",
  },

  [theme.breakpoints.down("sm")]: {
    height: theme.spacing(4.5),

    "& .MuiTypography-root": {
      display: "none",
    },
  },
}));
