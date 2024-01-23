import { CanceledError } from "axios";
import { useEffect, useState } from "react";
import { User } from "../services/api-client";
import userService from "../services/user-service";

const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // https://jsonplaceholder.typicode.com/users

  useEffect(() => {
    const controller = new AbortController();

    setLoading(true);

    userService
      .getUsers()
      .then((response) => {
        console.log(response.data);
        setUsers(response.data);
        setError("");
        setLoading(false);
      })
      .catch((error) => {
        if (error instanceof CanceledError) return;
        console.log("Error", error.message);
        setError(error.message);
        setUsers([]);
        setLoading(false);
      });

    return () => controller.abort();
  }, []);

  const delUser = (user: User) => {
    const originalUsers = { ...users };

    setUsers(users.filter((u) => u.id != user.id));
    userService.deluser(user).catch((error) => {
      console.log(error.message);
      setError(error.message);
      setUsers(originalUsers);
    });
  };

  const addItem = () => {
    const originalUsers = [...users];
    const newUser = { id: 0, name: "Saravana" };
    setUsers([newUser, ...users]);

    userService
      .addUser(newUser)
      .then((res) => {
        setUsers([res.data, ...users]);
      })
      .catch((error) => {
        setUsers(originalUsers);
        setError(error.message);
      });
  };

  const updateUser = (user: User) => {
    const originalUsers = [...users];

    const updatedUser = { ...user, name: user.name + "!" };

    setUsers(
      users.map((u) => (u.id == user.id ? { ...u, name: u.name + "!" } : u))
    );

    userService.updateuser(updatedUser).catch((error) => {
      setError(error.message);
      setUsers(originalUsers);
    });
  };

  return (
    <>
      <div className="container">
        <h2>User List</h2>

        {loading && <div className="spinner-border"></div>}

        {error && <p className="text-danger">{error}</p>}

        <button className="btn btn-success mb-3" onClick={() => addItem()}>
          Add Item
        </button>
        <ul className="list-group">
          {users.map((user) => (
            <li className="list-group-item d-flex justify-content-between">
              <span>
                {user.id} - {user.name}
              </span>

              <div>
                <button
                  className="btn btn-danger me-3"
                  onClick={() => delUser(user)}
                >
                  Delete
                </button>

                <button
                  className="btn btn-danger"
                  onClick={() => updateUser(user)}
                >
                  Update
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default UserList;
