import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../Layouts/Dashboard";
import Root from "../Layouts/Root";
import CreateShop from "../Pages/CreateShop/CreateShop";
import AddProduct from "../Pages/Dashboard/AddProduct/AddProduct";
import AdminSalesData from "../Pages/Dashboard/AdminSalesData/AdminSalesData";
import ManageShops from "../Pages/Dashboard/ManageShops/ManageShops";
import Payment from "../Pages/Dashboard/Payment/Payment";
import PaymentHistory from "../Pages/Dashboard/PaymentHistory/PaymentHistory";
import SalesCollection from "../Pages/Dashboard/SalesCollection/SalesCollection";
import ShopCart from "../Pages/Dashboard/ShopCart/ShopCart";
import Subscription from "../Pages/Dashboard/Subscription/Subscription";
import UpdateProduct from "../Pages/Dashboard/UpdateProduct/UpdateProduct";
import ProductManagement from "../Pages/Dashboard/productManagement/productManagement";
import Demo from "../Pages/Demo";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import AdminRoutes from "./AdminRoutes";
import ManagerRoutes from "./ManagerRoutes";
import PrivateRoutes from "./PrivateRoutes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "watchDemo",
        element: <Demo />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "createStore",
        element: (
          <PrivateRoutes>
            <CreateShop />
          </PrivateRoutes>
        ),
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoutes>
        <Dashboard></Dashboard>
      </PrivateRoutes>
    ),
    children: [
      {
        path: "productManagement",
        element: (
          <ManagerRoutes>
            <ProductManagement />
          </ManagerRoutes>
        ),
      },
      {
        path: "addProduct",
        element: (
          <ManagerRoutes>
            <AddProduct />
          </ManagerRoutes>
        ),
      },
      {
        path: "salesCollection",
        element: (
          <ManagerRoutes>
            <SalesCollection />
          </ManagerRoutes>
        ),
      },
      {
        path: "payment",
        element: (
          <ManagerRoutes>
            <Payment />
          </ManagerRoutes>
        ),
      },
      {
        path: "shopCart",
        element: (
          <ManagerRoutes>
            <ShopCart />
          </ManagerRoutes>
        ),
      },
      {
        path: "salesSummary",
        element: (
          <ManagerRoutes>
            <PaymentHistory />
          </ManagerRoutes>
        ),
      },
      {
        path: "subscription",
        element: (
          <ManagerRoutes>
            <Subscription />
          </ManagerRoutes>
        ),
      },
      {
        path: "updateProduct/:id",
        element: (
          <ManagerRoutes>
            <UpdateProduct />
          </ManagerRoutes>
        ),
      },
      {
        path: "manageShops",
        element: (
          <AdminRoutes>
            <ManageShops />
          </AdminRoutes>
        ),
      },
      {
        path: "adminSalesSummary",
        element: (
          <AdminRoutes>
            <AdminSalesData />
          </AdminRoutes>
        ),
      },
    ],
  },
]);

export default router;
