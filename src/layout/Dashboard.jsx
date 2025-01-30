import React, { useContext } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import useAdmin from "../hook/useAdmin";
import useHr from "../hook/useHr";
import useEmployee from "../hook/useEmployee";

const Dashboard = () => {
  // Drawer toggle function
  const toggleDrawer = () => {
    const drawerCheckbox = document.getElementById("my-drawer-3");
    if (drawerCheckbox) {
      drawerCheckbox.checked = !drawerCheckbox.checked;
    }
  };
  const { user } = useContext(AuthContext);
  const [isAdmin] = useAdmin();
  const [isHr] = useHr();
  const [isEmployee] = useEmployee();

  const links = (
    <>
      {/* Is Admin */}
      {user && isAdmin && (
        <li>
          <Link onClick={toggleDrawer} to="/dashboard/all-employee">
            All Employee
          </Link>
        </li>
      )}
      {user && isAdmin && (
        <li>
          <Link onClick={toggleDrawer} to="/dashboard/payroll">
            Payroll
          </Link>
        </li>
      )}
      {user && isAdmin && (
        <li>
          <Link onClick={toggleDrawer} to="/dashboard/messages">
            Messages
          </Link>
        </li>
      )}

      {/* Is HR */}
      {user && isHr && (
        <li>
          <Link onClick={toggleDrawer} to="/dashboard/employee-list">
            Employee List
          </Link>
        </li>
      )}
      {user && isHr && (
        <li>
          <Link onClick={toggleDrawer} to="/dashboard/progress">
            Progress
          </Link>
        </li>
      )}

      {/* Is Employee */}
      {user && isEmployee && (
        <li>
          <Link onClick={toggleDrawer} to="/dashboard/work-sheet">
            Work Sheet
          </Link>
        </li>
      )}
      {user && isEmployee && (
        <li>
          <Link onClick={toggleDrawer} to="/dashboard/payment-history">
            Payment History
          </Link>
        </li>
      )}

      <li>
        <Link to="/">Home</Link>
      </li>
    </>
  );

  return (
    <div className="drawer">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="navbar w-full bg-gray-100 px-4 shadow-md">
          <div className="flex-none">
            <label
              htmlFor="my-drawer-3"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="flex-1 text-center font-bold text-xl">Dashboard</div>
        </div>
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </div>

      {/* Drawer */}
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-3"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 min-h-full w-60 p-4 rounded-r-xl">
          {links}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
