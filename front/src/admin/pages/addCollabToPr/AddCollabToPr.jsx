import "./addCollabToPr.css";
import Select from "react-select";
import { useState, useEffect } from "react";
import Axios from "axios";

export default function NewCollab() {
  //get project id from url
  const ProjectID = window.location.pathname.slice(8);
  //get collab id from select
  const [EmpId, setEmpId] = useState();
  const [tjm, setTjm] = useState("");


  const addWork = () => {
    Axios.post("http://localhost:3001/createWork", {
      EmpID: EmpId,
      PrID: ProjectID,
      tjm: tjm,
    }).then(() => {
      console.log("success");
    });
  };

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
  const handle = (e) => {
    setEmpId(e.id);
  };

  return (
    <div className="newUser">
      <h1 className="newUserTitle">Affecter un collaborateur à un projet</h1>
      <form className="newUserForm">
        <div className="newUserItem">
          <label>Employé concerné</label>
          <Select options={options} onChange={handle} />
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


        <button className="newUserButton" onClick={addWork}>
          Créer
        </button>
      </form>
    </div>
  );
}
