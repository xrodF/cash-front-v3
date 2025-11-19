import { RouteObject } from "react-router-dom";

import LayoutComponent from "@components/layout";

// pages
import PrivateRoutes from "./private";
import PublicRoutes from "./public";

interface RoutesProps {
  auth: boolean;
}

export const routes = ({ auth }: RoutesProps): RouteObject[] => [
  {
    element: <LayoutComponent auth={auth} />,
    children: auth ? PrivateRoutes() : PublicRoutes(),
  },
];
