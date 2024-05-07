/* eslint-disable @typescript-eslint/no-unused-vars */
// ** React Imports
import { Fragment } from "react";
import { Icon } from "@iconify/react";

// ** MUI Imports
import Card from "@mui/material/Card";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import CardHeader from "@mui/material/CardHeader";
import { Box, Button, Typography } from "@mui/material";

// ** Custom Components
import CustomChip from "./chip/CustomeChip";
import { Error500 } from "../pages";
import CircularIndeterminate from "./spinner/CircularIndeterminate";

// ** interface
import { ExchangeResponseRow, OptionsContractResponse } from "../interfaces";

// ** Hooks
import { useGetListOptionsContract } from "../services/hooks/useGetListOptionsContract";

const OptionsContractTable = () => {
  //** fetching data from the API with react query hook
  const { data, isLoading, error } = useGetListOptionsContract();

  const statusValue = data?.status ? "success" : "error";

  // ** handle next URL
  const handleCheckUrl = () => {
    if (data?.next_url) {
      window.location.href = data?.next_url; // Navigate to the URL
    }
  };

  // ** render data
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

    //** data grid
    return (
      <Card>
        <CardHeader title="List of Exchange coins rates" />

        <Box
          sx={{
            mb: 8,
            px: 5,
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Use the same CustomAutocomplete component here */}
          <Box
            display="flex"
            alignItems="flex-start"
            justifyContent="space-between"
            sx={{ marginRight: "20px", gap: "20px" }}
          >
            <Button
              variant="contained"
              onClick={handleCheckUrl}
              endIcon={<Icon icon="carbon:link" />}
            >
              Check URL
            </Button>
          </Box>
        </Box>

        <DataGrid
          pagination
          rows={data?.results || []}
          rowCount={5} // ** if we had a count to pass then it would be better, but for now static is fine
          columns={columns}
          autoHeight={true}
          loading={isLoading}
          paginationMode="server"
          disableRowSelectionOnClick
          pageSizeOptions={[5]}
          paginationModel={{ page: 1, pageSize: 5 }}
          getRowId={(row: OptionsContractResponse) =>
            `${row.cfi}-${row.ticker}`
          }
        />
      </Card>
    );
  };

  // ** show spinner if data is not yet fetched
  if (isLoading || !data) return <CircularIndeterminate />;

  // ** show error message if there is an error
  if (error) return <Error500 />;

  return renderData();
};

export default OptionsContractTable;
