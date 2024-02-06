import "./project.css";
import { LaptopWindows, Euro, DoneOutline } from "@material-ui/icons";
import Select from "react-select";
import { useState, useEffect } from "react";
import Axios from "axios";
import { useSelector, useDispatch } from "react-redux";

export default function User() {
  const Colab = useSelector((state) => state.Colab);
  const { Col } = Colab;
  //status of the project
  const options = [
    { value: "achevé", label: "Achevé" },
    { value: "inachevé", label: "Inachevé" },
  ];
  const [projectName, setProjectName] = useState(Col.projectName);
  const [tjm, setTjm] = useState(Col.tjm);
  const [status, setStatus] = useState(Col.status);
  console.log(status);
  const handleSelectChange = (evt) => {
    const value = evt.target.value;
    setStatus(value);
  };
  //update a collab
  const updateWork = (PrId, EmpID) => {
    Axios.put(`http://localhost:3001/updateWk/${PrId}/${EmpID}`, {
      projectName: projectName,
      tjm: tjm,
      status: status,
    }).then((response) => {
      alert("updated");
    });
  };

  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Éditer Projet</h1>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <div className="userShowTopTitle">
              <span className="userShowUsername">{Col.projectName}</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Détails du projet</span>
            <div className="userShowInfo">
              <LaptopWindows className="userShowIcon" />
              <span className="userShowInfoTitle">{Col.projectName}</span>
            </div>
            <div className="userShowInfo">
              <Euro className="userShowIcon" />
              <span className="userShowInfoTitle">{Col.tjm}</span>
            </div>
            <div className="userShowInfo">
              <DoneOutline className="userShowIcon" />
              <span className="userShowInfoTitle">{Col.status}</span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Éditer</span>
          <form className="userUpdateForm">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Projet</label>
                <input
                  type="text"
                  defaultValue={Col.projectName}
                  placeholder={Col.projectName}
                  className="userUpdateInput"
                  onChange={(event) => {
                    setProjectName(event.target.value);
                  }}
                />
              </div>
              <div className="userUpdateItem">
                <label>TJM</label>
                <input
                  type="text"
                  placeholder={Col.tjm}
                  defaultValue={Col.tjm}
                  className="userUpdateInput"
                  onChange={(event) => {
                    setTjm(event.target.value);
                  }}
                />
              </div>
              <div className="userUpdateItem">
                <label>Statut du projet</label>
                <select onChange={handleSelectChange}>
                  <option value="Inachevé">Staus</option>

                  <option value="Inachevé">Inachevé</option>
                  <option value="Achevé">Achevé</option>
                </select>
              </div>
            </div>
            <div className="userUpdateRight">
              <button
                className="userUpdateButton"
                onClick={() => updateWork(Col.PrId, Col.EmpID)}
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
