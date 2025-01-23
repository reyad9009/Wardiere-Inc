import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Auth/UserAuth/Login";
import Register from "../pages/Auth/UserAuth/Register";
import Dashboard from "../layout/Dashboard";
import AllEmployee from "../pages/Dashboard/AllEmployee";

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
    path: 'dashboard',
    element: <Dashboard></Dashboard>,
    children: [
      {
        path: 'all-employee',
        element: <AllEmployee></AllEmployee>
      }
    ]
  }
]);
