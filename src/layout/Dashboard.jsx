import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const Dashboard = () => {
  // Drawer toggle function
  const toggleDrawer = () => {
    const drawerCheckbox = document.getElementById("my-drawer-3");
    if (drawerCheckbox) {
      drawerCheckbox.checked = !drawerCheckbox.checked;
    }
  };

  const links = (
    <>
      <li>
        <NavLink
          to="all-employee"
          onClick={toggleDrawer} // Close drawer on link click
          className={({ isActive }) =>
            isActive
              ? "text-primaryColor font-bold text-lg"
              : "font-bold text-lg"
          }
        >
          All Employee
        </NavLink>
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
            <button
              onClick={toggleDrawer} // Open drawer on button click
              aria-label="Open Sidebar"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </button>
          </div>
          <div className="flex-1 text-center font-bold text-xl">
            Dashboard
          </div>
        </div>
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </div>

      {/* Drawer */}
      <div className="drawer-side">
        <label htmlFor="my-drawer-3" aria-label="Close Sidebar"></label>
        <ul className="menu min-h-full w-60 mt-16 p-4 rounded-r-xl bg-teal-400">
          {links}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
