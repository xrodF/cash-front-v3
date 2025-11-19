import { useRef, useState } from "react";

import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";

import { Box, Grid, Typography } from "@mui/material";
import { CustomPaper, StyledButton } from "@components/shared/styled";
import { InfoItem, MoreItemsIndicator } from "./styled";

import { useVerticalScrollObserver } from "@utils/UseVerticalScrollObserver";

type Item = {
  id: number;
  name: string;
  quantity: number;
};

const ProductsTable = () => {
  const data = useState<Item[]>([]);

  const columns: MRT_ColumnDef<Item>[] = [
    { accessorKey: "id", header: "COD", size: 10 },
    { accessorKey: "name", header: "Producto", minSize: 240, grow: 1 },
    { accessorKey: "quantity", header: "Cantidad", size: 10 },
    { accessorKey: "price", header: "Precio", size: 10 },
  ];

  const tableContainerRef = useRef<HTMLDivElement | null>(null);

  const { hasScroll, showChip } = useVerticalScrollObserver(tableContainerRef);

  const handleAddRow = () => {
    data[1]((prev) => [
      {
        id: prev.length + 1,
        name: `Item ${prev.length + 1}`,
        quantity: Math.floor(Math.random() * 100),
        price: Math.floor(Math.random() * 1000),
      },
      ...prev,
    ]);
  };

  const table = useMaterialReactTable({
    columns,
    data: data[0],
    enablePagination: false,
    enableBottomToolbar: false,
    enableTopToolbar: false,
    enableSorting: false,
    enableColumnFilters: false,
    enableColumnActions: false,
    enableStickyHeader: true,
    enableColumnResizing: false,
    enableTableHead: data[0].length > 0,

    renderEmptyRowsFallback: () => (
      <Box
        sx={{
          textAlign: "center",

          height: "100%",

          "& .MuiTypogrphy-root": {
            color: "grey.600",
            fontWeight: 600,
          },
        }}
      >
        <Typography variant="body1">No hay registros disponibles</Typography>
      </Box>
    ),

    muiTablePaperProps: {
      sx: {
        height: "100% !important",
      },
    },

    muiTableContainerProps: {
      ref: tableContainerRef,
      sx: {
        height: "100%",

        ...(data[0].length > 0
          ? {
              flex: 1,
              overflowY: "auto",
            }
          : {
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }),

        "& .Muitypography-root": {
          my: "auto",
        },
      },
    },

    muiTableHeadCellProps: {
      sx: {
        bgcolor: "divider",
      },
    },

    muiTableBodyCellProps: {
      sx: {
        overflow: "hidden",
        py: 1,
        px: 2,
      },
    },
  });

  return (
    <CustomPaper
      sx={{
        overflowY: "auto",
        height: "100%",
      }}
    >
      <StyledButton onClick={handleAddRow}>Agregar</StyledButton>

      <Box
        sx={{
          flexGrow: 1,
          overflowY: "auto",
          position: "relative",
        }}
      >
        <MaterialReactTable table={table} />
        <MoreItemsIndicator open={hasScroll && showChip} />
      </Box>

      <Grid container spacing={1.25}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <InfoItem>{`Total productos: ${data[0].length}`}</InfoItem>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <InfoItem>{`Total items: ${data[0].reduce(
            (acc, x) => acc + x.quantity,
            0
          )}`}</InfoItem>
        </Grid>
      </Grid>
    </CustomPaper>
  );
};

export default ProductsTable;
