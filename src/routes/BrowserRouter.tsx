import { createBrowserRouter } from "react-router-dom";
import { DetailsPage, Error500, HomePage, NotFoundPage } from "../pages";

// ** Router configuration
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/detailsPage",
    element: <DetailsPage />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/500",
    element: <Error500 />,
    errorElement: <Error500 />,
  },
  {
    path: "/404",
    element: <NotFoundPage />,
    errorElement: <NotFoundPage />,
  },
]);

export default router;
