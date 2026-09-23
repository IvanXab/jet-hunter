import { createBrowserRouter } from "react-router";
import { App } from "./app";
import { AppLayout } from "./layout/app-layout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [{ index: true, element: <App /> }],
  },
]);
