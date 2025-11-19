import { Box, TableCell, TableRow } from "@mui/material";

interface TableRowProps {
  header: React.ReactNode;
  value: React.ReactNode;
}

export const CustomTableRow = ({ header, value }: TableRowProps) => (
  <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
    <TableCell
      component="th"
      scope="row"
      sx={{
        color: "white",
      }}
    >
      <Box display="flex" alignItems="center" gap={2}>
        {header}
      </Box>
    </TableCell>

    <TableCell align="right" sx={{ color: "white" }}>
      {value}
    </TableCell>
  </TableRow>
);
