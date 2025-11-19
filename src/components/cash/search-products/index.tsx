import { Box } from "@mui/material";

import { CustomPaper } from "@components/shared/styled";
import TextFieldCustom from "@components/shared/custom-textfield/TextFieldComponent";
import { ReturnIconPlaceholder } from "./styled";

import OptionsMenu from "./components/OptionsMenu";

const SearchProducts = () => {
  return (
    <CustomPaper
      sx={{
        flexDirection: "row",
      }}
    >
      <OptionsMenu />

      <Box sx={{ position: "relative", width: "100%" }}>
        <TextFieldCustom
          fullWidth
          variant="outlined"
          placeholder="Ingrese un identificador"
          slotProps={{
            htmlInput: {
              autocomplete: "off",
            },
          }}
        />

        <ReturnIconPlaceholder />
      </Box>
    </CustomPaper>
  );
};

export default SearchProducts;
