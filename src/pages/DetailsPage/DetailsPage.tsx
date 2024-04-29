import React, { Suspense } from "react";
import CircularIndeterminate from "../../components/spinner/CircularIndeterminate";
const WebSocketMarketStream = React.lazy(
  () => import("../../components/WebSocketMarketStream")
);

const DetailsPage = () => {
  return (
    <div>
      <Suspense
        fallback={
          <div>
            <CircularIndeterminate />
          </div>
        }
      >
        <WebSocketMarketStream />
      </Suspense>
    </div>
  );
};

export default DetailsPage;
