import React, { Suspense } from "react";
import Grid from "@mui/material/Grid";
import CircularIndeterminate from "../../components/spinner/CircularIndeterminate";
import BackArrowButton from "../../components/BackArrowButton";

const StatisticsCards = React.lazy(
  () => import("../../components/websocket/StatisticsCards")
);

const DetailsPage = () => {
  return (
    <>
      <BackArrowButton />
      <Grid container spacing={3} justifyContent="center">
        <Grid
          item
          xs={8}
          style={{
            minHeight: "30vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Suspense
            fallback={
              <div>
                <CircularIndeterminate />
              </div>
            }
          >
            <StatisticsCards />
          </Suspense>
        </Grid>
      </Grid>
    </>
  );
};

export default DetailsPage;
