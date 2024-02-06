import "./newProject.css";
import Select from "react-select";
import { useState, useEffect } from "react";
import { logout } from "../../../actions/userActions";
import { useSelector, useDispatch } from "react-redux";

import Axios from "axios";
import { useHistory } from "react-router-dom";

export default function NewCollab() {
  const [projectName, setProjectName] = useState("");
  const [tjm, setTjm] = useState("");
  const dispatch = useDispatch();

  let history = useHistory();


  // fetch (id, fname, lname ) from DB display them in select
  const [employeeList, setEmployeeList] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/employeesName").then((response) => {
      setEmployeeList(response.data);
    });
  }, []);

  const options = [];
  for (var i = 0; i < employeeList.length; i++) {
    var obj = {};
    if (employeeList.length > 0) {
      obj["id"] = employeeList[i].id;
      obj["value"] = employeeList[i].firstname + " " + employeeList[i].lastname;
      obj["label"] = employeeList[i].firstname + " " + employeeList[i].lastname;
    }
    options.push(obj);
  }

  //catch the selected item (id)
  const [getId, setgetId] = useState();
  const handle = (e) => {
    setgetId(e.id);
  };

  //add new project
  const addProject = () => {
    Axios.post("http://localhost:3001/createProject", {
      projectName: projectName,
      status: "Inachevé", //Uncomplete
      EmpID: getId,
      tjm: tjm,
    }).then(() => {
      console.log("success!");
    });
  };


  return (
    <div className="newUser">
      <h1 className="newUserTitle">Nouveau projet</h1>
      <form className="newUserForm">
        <div className="newUserItem">
          <label>Nom du projet</label>
          <input
            type="text"
            placeholder="john"
            onChange={(event) => {
              setProjectName(event.target.value);
            }}
          />
        </div>
        <div className="newUserItem">
          <label>TJM</label>
          <input
            type="text"
            placeholder="....."
            onChange={(event) => {
              setTjm(event.target.value);
            }}
          />
        </div>
        <div className="newUserItem">
          <label>Employé concerné</label>
          <Select options={options} onChange={handle} />
          {getId && console.log(getId)}
        </div>
        <button className="newUserButton" onClick={addProject}>
          Créer
        </button>
      </form>
    </div>
  );
}
