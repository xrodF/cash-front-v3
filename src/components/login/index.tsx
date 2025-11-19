import { FC, Fragment } from "react";

import { Grid, IconButton } from "@mui/material";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TextFieldCustom from "@components/shared/custom-textfield/TextFieldComponent";

interface LoginProps {
  loginData: [LoginData, React.Dispatch<React.SetStateAction<LoginData>>];
  isPasswordVisible: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
}

const LoginForm: FC<LoginProps> = ({ isPasswordVisible, loginData }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    loginData[1]((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Fragment>
      <Grid container spacing={1}>
        <Grid size={{ xs: 12 }}>
          <TextFieldCustom
            fullWidth
            type="email"
            id="email"
            name="email"
            label="Correo"
            value={loginData[0].email}
            onChange={handleInputChange}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <div className="password-wrapper">
            <TextFieldCustom
              fullWidth
              type={isPasswordVisible[0] ? "text" : "password"}
              id="password"
              name="password"
              label="Contraseña"
              value={loginData[0].password}
              onChange={handleInputChange}
              slotProps={{
                input: {
                  endAdornment: (
                    <IconButton
                      type="button"
                      sx={{ color: "common.white" }}
                      onClick={() => {
                        isPasswordVisible[1]((prev) => !prev);
                      }}
                    >
                      <FontAwesomeIcon
                        icon={isPasswordVisible[0] ? faEyeSlash : faEye}
                        size="sm"
                      />
                    </IconButton>
                  ),
                },
              }}
            />
          </div>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default LoginForm;
