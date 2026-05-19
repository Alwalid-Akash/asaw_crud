import { useState, useEffect } from "react";

export default function Crud() {
  let [users, setUsers] = useState([]);
  let [name, setName] = useState("");

  //fetch users
  const fetchUsers = async () => {
    const res = await fetch(
      "https://jsonplaceholder.typicode.com/users"
    );

    const data = await res.json();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  //add user

  const addUser = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name
      })
    });

    const data = await res.json();


    setUsers([...users, { id: Date.now(), name: data.name }]);

    setName("");
  };


  return (
    <>
      <h3>CRUD Component</h3>

      <ul>
        {users.map((user) => {
          return (
            <li
              key={user.id}
              style={{
                marginBottom: "10px",
                listStyleType: "none",
              }}
            >
              {user.name}
            </li>
          );
        })}
      </ul>

      <input
        type="text"
        placeholder="Enter name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <button value={name} onClick={() => addUser()}>
        Add
      </button>
      <button>Edit</button>
    </>
  );
}