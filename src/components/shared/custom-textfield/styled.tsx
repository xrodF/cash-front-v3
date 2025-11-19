import { alpha, styled, TextField, TextFieldProps } from "@mui/material";

export const CustomTextField = styled((props: TextFieldProps) => (
  <TextField {...props} />
))(({ theme }) => ({
  "& .MuiInputLabel-root": {
    color: theme.palette.secondary.main,
  },

  "& .MuiFilledInput-root": {
    overflow: "hidden",
    borderRadius: theme.spacing(1),
    border: "1px solid",
    backgroundColor: theme.palette.divider,
    borderColor: `${alpha(theme.palette.grey[500], 0.5)} !important`,
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),
    "&:hover": {
      backgroundColor: alpha(theme.palette.grey[500], 0.25),
    },
    "&.Mui-focused": {
      backgroundColor: "transparent",
      boxShadow: `${alpha(theme.palette.secondary.main, 0.25)} 0 0 0 2px`,
      borderColor: theme.palette.secondary.main,
    },
  },

  "& .MuiOutlinedInput-root": {
    overflow: "hidden",
    borderRadius: theme.spacing(1),
    backgroundColor: theme.palette.divider,
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),

    "&:hover": {
      backgroundColor: alpha(theme.palette.grey[500], 0.25),
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: alpha(theme.palette.grey[700], 0.8),
      },
    },

    "&.Mui-focused": {
      backgroundColor: "transparent",
      boxShadow: `${alpha(theme.palette.secondary.main, 0.25)} 0 0 0 2px`,
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: theme.palette.secondary.main,
        borderWidth: 1.5, // opcional
      },
    },

    // Aquí es donde realmente se aplica el borde base
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: `${alpha(theme.palette.grey[500], 0.5)} !important`,
    },
  },
}));
