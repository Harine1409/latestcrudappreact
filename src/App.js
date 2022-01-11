import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [listOfUsers, setListOfUsers] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [username, setUsername] = useState("");
 
  useEffect(() => {
    axios.get("https://latestcrudapp.herokuapp.com/product/getUsers").then((response) => {
      setListOfUsers(response.data);
    });
  }, []);

  const createUser = () => {
    axios.post("https://latestcrudapp.herokuapp.com/product/createUser", {
      name,
      age,
      username,
    }).then((response) => {
      alert("user created!")
      setListOfUsers([
        ...listOfUsers,
        {
          name,
          age,
          username,
        },
      ]);
    });
  };

  return (
    <div className="App">
      <div className="usersDisplay">
        <h1><u>User Data</u></h1>
        {listOfUsers.map((user) => {
          return (
            <div className="maincontainer">
             <table>
          <thead>
            <tr className="tdd">
              <td> Name </td>
              <td> Age </td>
              <td> Username </td>
            </tr>
          </thead>
          <tbody>
          <tr key={user.id}>
                <td> {user.name} </td>
                <td> {user.age} </td>
                <td> {user.username} </td>
              </tr>
            </tbody>
          </table>
            </div>
          );
        })}
      </div>

      <div>
        <input
          type="text"
          placeholder="Name..."
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <input
          type="number"
          placeholder="Age..."
          onChange={(event) => {
            setAge(event.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Username..."
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <button onClick={createUser} > Create User </button>
      </div>
    </div>
  );
}

export default App;