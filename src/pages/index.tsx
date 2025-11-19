import CashPage from "./cash";
import CustomerDisplay from "./customer-display";

export const AppPages: IPage[] = [
  {
    title: "Inicio",
    path: "/",
    component: <CashPage />,
    noList: true,
  },
  {
    title: "Pantalla cliente",
    path: "/customer-display",
    component: <CustomerDisplay />,
    noList: true,
  },
];
