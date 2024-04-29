import React, { Suspense } from "react";
import CircularIndeterminate from "../../components/spinner/CircularIndeterminate";
const WebSocketComponent = React.lazy(
  () => import("../../components/WebSocketComponent")
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
        <WebSocketComponent />
      </Suspense>
    </div>
  );
};

export default DetailsPage;
