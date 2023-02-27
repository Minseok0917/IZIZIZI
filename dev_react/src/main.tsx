import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>MINSEOK</div>,
  },
]);

const $root: HTMLElement = document.getElementById("root");
ReactDOM.createRoot($root).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
