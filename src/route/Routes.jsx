import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import PaymentConfirmPage from "../pages/PaymentConfirmPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/payment-confirm",
    element: <PaymentConfirmPage />,
  },
]);
