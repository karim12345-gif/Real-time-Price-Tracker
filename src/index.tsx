// ** React Imports
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";

// ** Styles
import "./index.css";

// ** Custom Components
import { ReactQueryProvider } from "./pages";
// ** Router
import router from "./routes";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ReactQueryProvider>
      <RouterProvider router={router} />
    </ReactQueryProvider>
  </React.StrictMode>
);
