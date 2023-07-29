import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const AppDashboard = () => {
  const params = useParams();
  const param = params.param;
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem(param)) || {}
  );
  const allUsers = JSON.parse(localStorage.getItem("all-users")) || [];

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem(param)) || {});
  }, [param]);

  const AdminDashboard = () => {
    return (
      <div>
        <h2>Admin</h2>
        <p>{"Name  :  " + user.firstName + " " + user.lastName}</p>
        <p>{"Phone  :  " + user.phoneNo}</p>
        <p>{"Type  :  " + user.type}</p>
        <table>
          <thead>
            <tr>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {allUsers.map((ele) => (
              <tr>
                <td>{ele.firstName + " " + ele.lastName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const UserDashboard = () => {
    return (
      <div>
        <h2>User</h2>
        <p>{"Name  :  " + user.firstName + " " + user.lastName}</p>
        <p>{"Phone  :  " + user.phoneNo}</p>
        <p>{"Type  :  " + user.type}</p>
      </div>
    );
  };

  return (
    <div>{user.type === "Admin" ? <AdminDashboard /> : <UserDashboard />}</div>
  );
};

export default AppDashboard;
