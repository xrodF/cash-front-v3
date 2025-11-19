import { FC } from "react";
import { TextFieldProps } from "@mui/material";

import { CustomTextField } from "./styled";

const TextFieldCustom: FC<TextFieldProps> = (props) => {
  const {
    inputRef,
    name,
    id,
    slotProps,
    fullWidth = true,
    variant = "filled",
    ...rest
  } = props;

  return (
    <CustomTextField
      {...rest}
      inputRef={inputRef}
      autoComplete="off"
      name={name}
      id={id || name}
      fullWidth={fullWidth}
      variant={variant}
      slotProps={{
        ...slotProps,
        input: {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ...(variant === "filled" && ({ disableUnderline: true } as any)),
          ...slotProps?.input,
        },
      }}
    />
  );
};

export default TextFieldCustom;
