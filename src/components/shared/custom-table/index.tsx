import { Box, SxProps, Table, TableBody, TableContainer } from "@mui/material";
import React, { FC } from "react";

interface TableProps {
  children: React.ReactNode;
}

const CustomTable: FC<TableProps> = ({ children }) => {
  return (
    <TableContainer component={Box} sx={style}>
      <Table sx={{ width: "100%" }}>
        <TableBody>{children}</TableBody>
      </Table>
    </TableContainer>
  );
};

export default CustomTable;

const style: SxProps = {
  boxSizing: "border-box",

  // separadores laterales
  th: {
    fontWeight: 600,
  },
  td: {
    overflowWrap: "anywhere",
  },
};
