// ** React Imports
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";

// ** Styles
import "./index.css";
import { ReactQueryProvider } from "./pages";
import router from "./routes/BrowserRouter";
import { WebSocketProvider } from "./context";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ReactQueryProvider>
      <WebSocketProvider>
        <RouterProvider router={router} />
      </WebSocketProvider>
    </ReactQueryProvider>
  </React.StrictMode>
);
