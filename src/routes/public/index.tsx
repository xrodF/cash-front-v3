import { Navigate } from "react-router-dom";

//Pages
import LoginPage from "@pages/login";

export default function PublicRoutes() {
  return [
    {
      path: "/login",
      element: <LoginPage />,
    },

    {
      path: "*",
      element: <Navigate to="/login" replace />,
    },
  ];
}
