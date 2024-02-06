import "./projList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline, AddCircle, InsertEmoticonOutlined } from "@material-ui/icons";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import Axios from "axios";
import Sidebar from "../../components/sidebar/Sidebar";
import { detailsColab } from "../../../actions/userActions";
import {  useDispatch } from "react-redux";


export default function ProjList() {

  //grab data from the DB & display them in our page
  const [projectsList, setProjectList] = useState([]);
  console.log(projectsList)
  //fetch data from the server to display them in our page
  useEffect(() => {
    let mounted = true;
    Axios.get("http://localhost:3001/projects").then((response) => {
      if (mounted) {
        setProjectList(response.data);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);
  const dispatch = useDispatch();
  //POP-UP delete confirmation!
  const deleteProject = (id,Empid) => {
    Axios.delete(`http://localhost:3001/deleteWk/${id}/${Empid}`).then(() => {
      Axios.get("http://localhost:3001/projects").then((response) => {
        setProjectList(response.data);
      });
    });
  };

  function popup(id,Empid, pname) {
    Swal.fire({
      title: "Êtes vous sûr?",
      text: "Vous ne pourrez pas revenir en arrière!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Annuler",
      confirmButtonText: "Oui, supprimez " + pname,
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProject(id,Empid);
        Swal.fire("Supprimé!", "Le projet a été supprimé.", "success");
      }
    });
  }

  const columns = [
    { field: "projectName", headerName: "Projet", width: 200 },
    { field: "tjm", headerName: "TJM", width: 120 },
    { field: "status", headerName: "Statut", width: 140 },
    { field: "fname", headerName: "Collab concerné", width: 230 },
    {
      field: "modification",
      headerName: "Modifications",
      width: 180,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/project/" + params.row.id}>
              <button className="projectListEdit">Éditer</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => {
                popup(params.row.id, params.row.projectName);
              }}
            />
            <Link to={"/addemp/" + params.row.id}>
              <AddCircle className="projectListAdd" />
            </Link>
          </>
        );
      },
    },
  ];

  //eliminate duplcate
  var filtred = projectsList.reduce((accumulator, current) => {
    if (checkIfAlreadyExist(current)) {
      return accumulator;
    } else {
      return [...accumulator, current];
    }

    function checkIfAlreadyExist(currentVal) {
      return accumulator.some((item) => {
        return (
          item.projectName === currentVal.projectName &&
          item.fname === currentVal.fname
        );
      });
    }
  }, []);

  return (
    <>
      <div className="productList">
        <Link to="newProject">
          <button className="addnewCollab">Ajouter un projet</button>
        </Link>
        <table className="customers">
          <tbody>
            <tr>
              <th>Projet</th>
              <th>TJM</th>
              <th>Statut</th>
              <th>Collab concerné</th>
              <th>Modifications</th>
            </tr>
            {projectsList.map((item, i) => {
              return (
                <tr key={i}>
                <td className="col-1" ><textarea cols="70" rows="5" defaultValue={item.projectName}></textarea></td>
                  <td>{item.tjm}</td>
                  <td>{item.status}</td>
                  <td>{item.fname}</td>
                  <td>
                    <Link to={"/project/" + item.PrId}>
                      <button className="projectListEdit" onClick={() => {dispatch(detailsColab(item))}}>Éditer</button>
                    </Link>
                    <DeleteOutline
                      className="productListDelete"
                      onClick={() => {
                        popup(item.PrId,item.EmpID, InsertEmoticonOutlined.projectName);
                      }}
                    />
                    <Link to={"/addemp/" + item.PrId}>
                      <AddCircle className="projectListAdd" />
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
