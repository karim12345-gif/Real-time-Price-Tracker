import { createBrowserRouter } from "react-router-dom";
import { DetailsPage, HomePage, NotFoundPage } from "../pages";

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
]);

export default router;
