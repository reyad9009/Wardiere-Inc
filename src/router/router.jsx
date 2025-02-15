import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Auth/UserAuth/Login";
import Register from "../pages/Auth/UserAuth/Register";
import Dashboard from "../layout/Dashboard";
import AllEmployee from "../pages/Dashboard/Admin/AllEmployee";
import AdminRoute from "./AdminRoute";
import EmployeeList from "../pages/Dashboard/Hr/EmployeeList";
import WorkSheet from "../pages/Dashboard/Employee/WorkSheet";
import Progress from "../pages/Dashboard/Hr/Progress";
import Slug from "../pages/Dashboard/Hr/Slug";
import Payroll from "../pages/Dashboard/Admin/Payroll";
import Contact from "../pages/Contact/Contact";
import PaymentHistory from "../pages/Dashboard/Employee/PaymentHistory";
import Messages from "../pages/Dashboard/Admin/Messages";
import HrRoute from "./HrRoute";
import EmployeeRoute from "./EmployeeRoute";
import Error from "../pages/Error/Error";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <Error></Error>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "register",
        element: <Register></Register>,
      },
      {
        path: "contact",
        element: <Contact></Contact>,
      },
    ],
  },
  {
    path: "dashboard",
    element: <Dashboard></Dashboard>,
    children: [
      // Employee Only
      {
        path: "work-sheet",
        element: (
          <EmployeeRoute>
            <WorkSheet></WorkSheet>
          </EmployeeRoute>
        ),
      },
      {
        path: "payment-history",
        element: (
          <EmployeeRoute>
            <PaymentHistory></PaymentHistory>
          </EmployeeRoute>
        ),
      },

      // HR only
      {
        path: "employee-list",
        element: (
          <HrRoute>
            <EmployeeList></EmployeeList>
          </HrRoute>
        ),
      },
      {
        path: "messages",
        element: (
          <HrRoute>
            <Messages></Messages>
          </HrRoute>
        ),
      },
      {
        path: "progress",
        element: (
          <HrRoute>
            <Progress></Progress>
          </HrRoute>
        ),
      },
      {
        path: "/dashboard/payment-details/:userId",
        element: (
          <HrRoute>
            <Slug></Slug>
          </HrRoute>
        ),
        loader: ({ params }) =>
          fetch(
            `https://b10a12-server-side-reyad9009.vercel.app/dashboard/payment-details/${params.userId}`
          ),
      },

      //Admin only
      {
        path: "all-employee",
        element: (
          <AdminRoute>
            <AllEmployee></AllEmployee>
          </AdminRoute>
        ),
      },
      {
        path: "payroll",
        element: (
          <AdminRoute>
            <Payroll></Payroll>
          </AdminRoute>
        ),
      },
    ],
  },
]);
