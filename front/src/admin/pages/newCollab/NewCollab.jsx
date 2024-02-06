import "./newCollab.css";
import { useState } from "react";
import Axios from "axios";

export default function NewCollab() {
  //grab data & send it to the database
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAdresse] = useState("");

  //add new Collab
  const addCollab = () => {
    Axios.post("http://localhost:3001/createEmp", {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      phone: phone,
      address: address,
      IsAdmin: "noadmin"
    }).then(() => {
      console.log("success!");
    });
  };
  return (
    <div className="newUser">
      <h1 className="newUserTitle">Nouveau collaborateur</h1>
      <form className="newUserForm">
        <div className="newUserItem">
          <label>Prénom</label>
          <input
            type="text"
            placeholder="john"
            onChange={(event) => {
              setFirstname(event.target.value);
            }}
          />
        </div>
        <div className="newUserItem">
          <label>Nom</label>
          <input
            type="text"
            placeholder="Smith"
            onChange={(event) => {
              setLastname(event.target.value);
            }}
          />
        </div>
        <div className="newUserItem">
          <label>Email</label>
          <input
            type="email"
            placeholder="john@gmail.com"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
        </div>
        <div className="newUserItem">
          <label>Password</label>
          <input
            type="password"
            placeholder="password"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
        </div>
        <div className="newUserItem">
          <label>Téléphoner</label>
          <input
            type="text"
            placeholder="+1 123 456 78"
            onChange={(event) => {
              setPhone(event.target.value);
            }}
          />
        </div>
        <div className="newUserItem">
          <label>Adresse</label>
          <input
            type="text"
            placeholder="New York | USA"
            onChange={(event) => {
              setAdresse(event.target.value);
            }}
          />
        </div>
        <button className="newUserButton" onClick={addCollab}>
          Créer
        </button>
      </form>
    </div>
  );
}
