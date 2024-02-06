import "./collabList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";
import Axios from "axios";

export default function CollabList() {
  //grab data from the DB & display them in our page
  const [employeeList, setEmployeeList] = useState([]);

  //fetch data from the server to display them in our page
  useEffect(() => {
    let mounted = true;
    Axios.get("http://localhost:3001/employees").then((response) => {
      if (mounted) {
        setEmployeeList(response.data);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  //POP-UP delete confirmation!
  const deleteEmployee = (id) => {
    Axios.delete(`http://localhost:3001/deleteEmp/${id}`).then(() => {
      Axios.get("http://localhost:3001/employees").then((response) => {
        setEmployeeList(response.data); //Updating the list just after deleting a collab
      });
    });
  };

  function popup(id, fname, lname) {
    Swal.fire({
      title: "Êtes vous sûr?",
      text: "Vous ne pourrez pas revenir en arrière!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Annuler",
      confirmButtonText: "Oui, supprimez " + fname + " " + lname,
    }).then((result) => {
      if (result.isConfirmed) {
        deleteEmployee(id);
        Swal.fire("Supprimé!", "Le collaborateur a été supprimé.", "success");
      }
    });
  }

  const columns = [
    { field: "firstName", headerName: "Prénom", width: 130 },
    { field: "lastName", headerName: "Nom", width: 130 },
    { field: "email", headerName: "Email", width: 220 },
    { field: "phone", headerName: "Tél", width: 120 },
    { field: "address", headerName: "Adr", width: 120 },
    {
      field: "modification",
      headerName: "Modifications",
      width: 160,
      renderCell: (params) => {
        return (
          <>
            {/* update data of collabs */}
            <Link to={"/collab/" + params.row.id}>
              <button className="collabListEdit">Éditer</button>
            </Link>
            {/* delete a collab */}
            <DeleteOutline
              className="collabListDelete"
              onClick={() => {
                popup(params.row.id, params.row.firstName, params.row.lastName);
              }}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="collabList">
      <Link to="newCollab">
        <button className="addnewCollab">Ajouter un collaborateur</button>
      </Link>
      <DataGrid
        disableSelectionOnClick
        rows={employeeList}
        columns={columns}
        pageSize={50}
        checkboxSelection
      />
    </div>
  );
}
