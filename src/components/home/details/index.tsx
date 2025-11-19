import { Fragment } from "react";

import { useGlobalContext } from "@/context/global";

import { Avatar, Box, Typography } from "@mui/material";

import { stringAvatar } from "@utils/string-tratament";

import { CustomPaper } from "@components/shared/styled";
import CustomTable from "@components/shared/custom-table";
import { CustomTableRow } from "@components/shared/custom-table/styled";
import { DateFormat } from "@utils/date_format";

const CashDetails = () => {
  const { global_context } = useGlobalContext();

  return (
    <CustomPaper
      sx={{
        width: "100%",
        height: "100%",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Avatar
          {...stringAvatar({
            name: global_context.userData?.name || "Desarrollo",
            styles: {
              width: {
                xs: 52,
                md: 64,
              },
              height: {
                xs: 52,
                md: 64,
              },
              fontSize: {
                xs: 20,
                md: 24,
              },
            },
          })}
        />

        <Box
          component={"div"}
          sx={{ display: "flex", flexDirection: "column" }}
        >
          <Typography
            textAlign="left"
            variant="h5"
            sx={{
              fontSize: {
                xs: 20,
                md: 24,
              },
            }}
          >
            {global_context.userData?.name || "Desarrollo"}
          </Typography>
          <Typography
            textAlign="left"
            variant="h6"
            sx={{
              fontSize: {
                xs: 16,
                md: 20,
              },
            }}
          >
            {global_context.userData?.email || "dev@desarrollo.com"}
          </Typography>
        </Box>
      </Box>

      <CustomTable>
        <Fragment>
          <CustomTableRow header={"Nro. de caja"} value={"01"} />
          <CustomTableRow
            header={"Fecha de apertura"}
            value={`${DateFormat(new Date())}`}
          />
        </Fragment>
      </CustomTable>
    </CustomPaper>
  );
};

export default CashDetails;
