import ProductsTable from "@components/cash/products-table";
import { Box } from "@mui/material";
import { Fragment } from "react";

const CustomerDisplay = () => {
  return (
    <Fragment>
      <Box
        sx={{
          height: "100%",
          gap: 1,
          display: "flex",
          flexDirection: "column  ",
        }}
      >
        <ProductsTable />
      </Box>
    </Fragment>
  );
};

export default CustomerDisplay;
