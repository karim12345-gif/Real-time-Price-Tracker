import React from "react";
import Grid from "@mui/material/Grid";
import { Header } from "../../components";
import CircularProgress from "@mui/material/CircularProgress";
import { Suspense } from "react";
import LivePricesButton from "../../components/LivePricesButton";

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
          <LivePricesButton />

          <Suspense fallback={<CircularProgress />}>
            <LazyOptionsContractTable />
          </Suspense>
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
