import "./collab.css";
import {
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
} from "@material-ui/icons";
import { useState, useEffect } from "react";
import Axios from "axios";
import { useParams } from "react-router-dom";
export default function User() {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

   const id = useParams();
   const {CollabId} = id;
   console.log(CollabId)
  // const id = window.location.pathname.slice(8);

  //fetch data from the server to display them in our page
  useEffect(() => {
    let mounted = true;
    Axios.get(`http://localhost:3001/collab/${CollabId}`).then((response) => {
      if (mounted) {
        setFname(response.data[0].firstName);
        setLname(response.data[0].lastName);
        setEmail(response.data[0].email);
        setAddress(response.data[0].address);
        setPhone(response.data[0].phone);
        setPassword(response.data[0].password);
      }
    });
    return () => {
      mounted = false;
    };
  }, [CollabId]);

  //update a collab
  const updateCollab = (id) => {
    Axios.put("http://localhost:3001/updateCollab", {
      firstName: fname,
      lastName: lname,
      email: email,
      phone: phone,
      address: address,
      password: password,
      id: CollabId,
    }).then((response) => {
      alert("updated");
    });
  };
  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Éditer Collaborateur</h1>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <div className="userShowTopTitle">
              <span className="userShowUsername">{fname + " " + lname}</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Détails du compte</span>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">{fname}</span>
            </div>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">{lname}</span>
            </div>
            <span className="userShowTitle">Détails du contact</span>
            <div className="userShowInfo">
              <PhoneAndroid className="userShowIcon" />
              <span className="userShowInfoTitle">{phone}</span>
            </div>
            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">{email}</span>
            </div>
            <div className="userShowInfo">
              <LocationSearching className="userShowIcon" />
              <span className="userShowInfoTitle">{address}</span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Éditer</span>
          <form className="userUpdateForm">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Nom</label>
                <input
                  type="text"
                  placeholder="nom"
                  className="userUpdateInput"
                  defaultValue={fname}
                  onChange={(event) => {
                    setFname(event.target.value);
                  }}
                />
              </div>
              <div className="userUpdateItem">
                <label>Prénom</label>
                <input
                  type="text"
                  placeholder="prénom"
                  className="userUpdateInput"
                  defaultValue={lname}
                  onChange={(event) => {
                    setLname(event.target.value);
                  }}
                />
              </div>
              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  type="text"
                  placeholder="email@gmail.com"
                  className="userUpdateInput"
                  defaultValue={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                />
              </div>
              <div className="userUpdateItem">
                <label>Téléphone</label>
                <input
                  type="text"
                  placeholder="##########"
                  className="userUpdateInput"
                  defaultValue={phone}
                  onChange={(event) => {
                    setPhone(event.target.value);
                  }}
                />
              </div>
              <div className="userUpdateItem">
                <label>Addresse</label>
                <input
                  type="text"
                  placeholder="New York | USA"
                  className="userUpdateInput"
                  defaultValue={address}
                  onChange={(event) => {
                    setAddress(event.target.value);
                  }}
                />
              </div>
              <div className="userUpdateItem">
                <label>Mot de passe</label>
                <input
                  type="text"
                  placeholder="password"
                  className="userUpdateInput"
                  defaultValue={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                />
              </div>
            </div>
            <div className="userUpdateRight">
              <button
                className="userUpdateButton"
                onClick={() => {
                  updateCollab(CollabId);
                  console.log("test");
                }}
              >
                Mettre à jour
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
