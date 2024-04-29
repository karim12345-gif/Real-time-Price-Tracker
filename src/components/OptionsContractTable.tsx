/* eslint-disable @typescript-eslint/no-unused-vars */
// ** React Imports
import { Fragment, useEffect, useState } from "react";

// ** MUI Imports
import Card from "@mui/material/Card";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import CardHeader from "@mui/material/CardHeader";
import CustomChip from "./chip/CustomeChip";

// ** Utils Import
import { Error500 } from "../pages";
import { OptionsContractResponse } from "../interfaces";
import { Box, Typography } from "@mui/material";
import { useGetListOptionsContract } from "../services/hooks/useGetListOptionsContract";
import CircularIndeterminate from "./spinner/CircularIndeterminate";
import { Icon } from "@iconify/react";

interface ExchangeResponseRow {
  row: OptionsContractResponse;
}

const OptionsContractTable = () => {
  //** states */
  const [rows, setRows] = useState<OptionsContractResponse[]>([]);
  const [total, setTotal] = useState(0);
  const [paginationModel, setPaginationModel] = useState({
    page: 1,
    pageSize: 5,
  });

  const { data, isLoading, error } = useGetListOptionsContract();

  useEffect(() => {
    setTotal(5 || 0);
    setRows(data?.results || []);
  }, [data]);

  const statusValue = data?.status ? "success" : "error";

  const renderData = () => {
    const columns: GridColDef[] = [
      {
        flex: 0.175,
        minWidth: 210,
        field: "statusValue",
        headerName: "Status",
        renderCell: () => {
          return (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <CustomChip
                icon={
                  <Icon
                    icon={
                      statusValue
                        ? "fluent:presence-available-10-filled"
                        : "line-md:remove"
                    }
                    style={{ color: statusValue ? "green" : "red" }}
                  />
                }
                rounded
                size="small"
                skin="light"
                color={statusValue ? "success" : "error"}
                label={statusValue ? "Okay" : "Not Okay"}
              />
            </Box>
          );
        },
      },

      {
        flex: 0.175,
        minWidth: 210,
        field: "price",
        headerName: "Price",
        renderCell: ({ row }: ExchangeResponseRow) => {
          return (
            <Fragment>
              <Typography variant="body2" sx={{ color: "text.primary" }}>
                {row.strike_price}
              </Typography>
            </Fragment>
          );
        },
      },
      {
        flex: 0.175,
        minWidth: 210,
        field: "shares",
        headerName: "Shares",
        renderCell: ({ row }: ExchangeResponseRow) => {
          return (
            <Fragment>
              <Typography variant="body2" sx={{ color: "text.primary" }}>
                {row.shares_per_contract}
              </Typography>
            </Fragment>
          );
        },
      },
      {
        flex: 0.175,
        minWidth: 210,
        field: "exchange",
        headerName: "Exchange",
        renderCell: ({ row }: ExchangeResponseRow) => {
          return (
            <Fragment>
              <Typography variant="body2" sx={{ color: "text.primary" }}>
                {row.primary_exchange}
              </Typography>
            </Fragment>
          );
        },
      },
      {
        flex: 0.175,
        minWidth: 210,
        field: "cfi",
        headerName: "CFI",
        renderCell: ({ row }: ExchangeResponseRow) => {
          return (
            <Fragment>
              <Typography variant="body2" sx={{ color: "text.primary" }}>
                {row.cfi}
              </Typography>
            </Fragment>
          );
        },
      },
      {
        flex: 0.175,
        minWidth: 210,
        field: "exerciseStyle",
        headerName: "ExerciseStyle",
        renderCell: ({ row }: ExchangeResponseRow) => {
          return (
            <Fragment>
              <Typography variant="body2" sx={{ color: "text.primary" }}>
                {row.exercise_style}
              </Typography>
            </Fragment>
          );
        },
      },
      {
        flex: 0.175,
        minWidth: 210,
        field: "date",
        headerName: "Date",
        renderCell: ({ row }: ExchangeResponseRow) => {
          return (
            <Fragment>
              <Typography variant="body2" sx={{ color: "text.primary" }}>
                {row.expiration_date}
              </Typography>
            </Fragment>
          );
        },
      },
    ];

    // data grid
    return (
      <Card>
        <CardHeader title="List of Exchange coins rates" />

        <DataGrid
          pagination
          rows={rows}
          rowCount={total}
          columns={columns}
          autoHeight={true}
          loading={isLoading}
          paginationMode="server"
          disableRowSelectionOnClick
          pageSizeOptions={[5]}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          getRowId={(row: OptionsContractResponse) =>
            `${row.cfi}-${row.ticker}`
          }
        />
      </Card>
    );
  };

  if (isLoading || !data) return <CircularIndeterminate />;

  if (error) return <Error500 />;

  return renderData();
};

export default OptionsContractTable;
