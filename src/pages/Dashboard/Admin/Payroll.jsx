import React from "react";

const Payroll = () => {
  return (
    <div>
      <div className="overflow-hidden shadow-md rounded-lg">
        <table className="table-fixed w-full text-left border border-gray-300">
          {/* head */}
          <thead className="uppercase bg-[#f55353] text-[#e5e7eb]">
            <tr className="border border-gray-300">
              <td className="py-6 text-center font-bold lg:p-4 lg:block hidden">
                Si
              </td>
              <td className="py-6 text-center font-bold lg:p-4">Name</td>
              <td className="py-6 text-center font-bold lg:p-4">Email</td>
              <td className="py-6 text-center font-bold lg:p-4">Designation</td>
              <td className="py-6 text-center font-bold lg:p-4">
                Month & Years
              </td>
              <td className="py-6 text-center font-bold lg:p-4">Amount</td>
              <td className="py-6 text-center font-bold lg:p-4">
                Transaction Id
              </td>
              <td className="py-6 text-center font-bold lg:p-4">Pay</td>
              <td className="py-6 text-center font-bold lg:p-4">Pay Date</td>
              <td className="py-6 text-center font-bold lg:p-4 lg:block hidden">
                Stock Status
              </td>
              <td className="py-6 text-center font-bold lg:p-4">Action</td>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <th>{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.designation}</td>

                <div className="flex flex-col justify-center items-center">
                  {user.role === "admin" ? (
                    "Admin"
                  ) : (
                    <td>
                      {user.role === "hr" ? (
                        "HR"
                      ) : (
                        <button
                          onClick={() => handleMakeHr(user)}
                          className="btn btn-lg bg-orange-500"
                        >
                          Make HR
                        </button>
                      )}
                    </td>
                  )}
                </div>

                <td>
                  {user.role === "admin" ? (
                    ""
                  ) : (
                    <button
                      onClick={() => handleDeleteUser(user)}
                      className="btn btn-ghost btn-lg"
                    >
                      <FaTrashAlt className="text-red-600"></FaTrashAlt>
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Payroll;
