/* eslint-disable react/jsx-key */
import { useEffect, useState } from "react";
import axios from "axios";
import { User } from "./User";

export const Users = () => {
  // Replace with backend call
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/user/bulk?filter=" + filter)
      .then((response) => {
        setUsers(response.data.users);
      });
  }, [filter]);

  return (
    <>
      <div className="font-bold mt-6 text-lg mb-5">Users</div>
      <div className="my-2">
        <input
          onChange={(e) => {
            setFilter(e.target.value);
          }}
          type="text"
          placeholder="Search users..."
          className="w-full px-2 py-1 border rounded border-slate-200 mb-2"
        ></input>
      </div>
      {users ? (
        <div>
          {users.map((user) => (
            <User user={user} />
          ))}
        </div>
      ) : null}
    </>
  );
};
