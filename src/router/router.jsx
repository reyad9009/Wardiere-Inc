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

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
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
    ],
  },
  {
    path: "dashboard",
    element: <Dashboard></Dashboard>,
    children: [
      {
        path: "work-sheet",
        element: <WorkSheet></WorkSheet>,
      },
      // HR only
      {
        path: "employee-list",
        element: <EmployeeList></EmployeeList>,
      },
      {
        path: "progress",
        element: <Progress></Progress>,
      },
      {
        path: "slug",
        element: <Slug></Slug>,
      },

      // Admin only
      {
        path: "all-employee",
        element: (
          <AdminRoute>
            <AllEmployee></AllEmployee>
          </AdminRoute>
        ),
      },
    ],
  },
]);
