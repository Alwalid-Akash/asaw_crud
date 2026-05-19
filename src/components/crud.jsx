import { useState, useEffect } from "react";

export default function Crud() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [editId, setEditId] = useState(null);

  // fetch users
  const fetchUsers = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await res.json();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);


  //add users

  const addUser = async () => {
    if (!name) return;

    const res = await fetch("https://jsonplaceholder.typicode.com/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });

    const data = await res.json();

    setUsers([...users, { id: Date.now(), name: data.name }]);
    setName("");
  };

  // delete 

  const deleteUser = async (id) => {
    await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
      method: "DELETE",
    });

    setUsers(users.filter((user) => user.id !== id));
  };


  // edit user  update users

  const startEdit = (user) => {
    setEditId(user.id);
    setName(user.name);
  };




  const updateUser = async () => {
    await fetch(
      `https://jsonplaceholder.typicode.com/users/${editId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      }
    );

    setUsers(
      users.map((user) =>
        user.id === editId ? { ...user, name } : user
      )
    );

    setEditId(null);
    setName("");
  };

  return (
    <div>
      <h3>CRUD Component</h3>

      {/* INPUT */}
      <input
        type="text"
        placeholder="Enter name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      {/* ADD / UPDATE BUTTON */}
      {editId ? (
        <button onClick={updateUser}>Update</button>
      ) : (
        <button onClick={addUser}>Add</button>
      )}

      {/* LIST */}
      <ul style={{ padding: 0 }}>
        {users.map((user) => (
          <li
            key={user.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "10px",
            }}
          >
            <span>{user.name}</span>

            <div>
              <button onClick={() => startEdit(user)}>
                Edit
              </button>

              <button onClick={() => deleteUser(user.id)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}