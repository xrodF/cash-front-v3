import { Navigate } from "react-router-dom";

//Pages
import { AppPages } from "@pages/index";

export default function PrivateRoutes() {
  return [
    ...(AppPages || []).map((x) => {
      return {
        path: x.path,
        element: x.component,
      };
    }),

    {
      path: "*",
      element: <Navigate to="/" replace />,
    },
  ];
}
