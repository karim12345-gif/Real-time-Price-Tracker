import React from "react";
import Grid from "@mui/material/Grid";
import { Header } from "../../components";
import CircularProgress from "@mui/material/CircularProgress";
import { Suspense } from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import { Icon } from "@iconify/react";

// Lazy loading for OptionsContractTable component
const LazyOptionsContractTable = React.lazy(
  () => import("../../components/OptionsContractTable")
);

const Home = () => {
  return (
    <>
      <Header />
      <Grid container spacing={3} justifyContent="center">
        <Grid
          item
          xs={12}
          style={{
            minHeight: "60vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Link
            to="/detailsPage"
            style={{ textDecoration: "none", marginBottom: "20px" }}
          >
            <Button
              variant="contained"
              endIcon={<Icon icon="fa6-solid:chart-line" />}
            >
              Check Live Prices
            </Button>
          </Link>

          <Suspense fallback={<CircularProgress />}>
            <LazyOptionsContractTable />
          </Suspense>
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
