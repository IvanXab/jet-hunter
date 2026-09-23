import { createBrowserRouter, Navigate } from "react-router";
import { AppLayout } from "@/layout/app-layout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <Navigate to="/resume" replace /> },
      {
        path: "resume",
        lazy: {
          Component: async () => {
            const { ResumePage } = await import("@/pages/resume/resume-page");
            return ResumePage;
          },
        },
      },
    ],
  },
]);
