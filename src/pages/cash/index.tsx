import { Fragment } from "react";

import SearchProducts from "@components/cash/search-products";
import { Box } from "@mui/material";
import ProductsTable from "@components/cash/products-table";

const CashPage = () => {
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
        <SearchProducts />

        <ProductsTable />
      </Box>
    </Fragment>
  );
};

export default CashPage;
