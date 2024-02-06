import "./home.css";
import { useEffect, useState } from "react";
import Axios from "axios";
export default function Home() {
  //grab data from the DB & display them in our page
  const [projectsList, setProjectList] = useState([]);
  const [dateCreated, setDateValide] = useState(new Date());
  const [date, setDate] = useState(new Date());
  console.log(dateCreated);

  console.log(projectsList);
  //fetch data from the server to display them in our page
  useEffect(() => {
    Axios.get("http://localhost:3001/projects").then((response) => {
      setProjectList(response.data);
    });
  }, []);

  const datedata = {
    dateCreated: dateCreated,
  };

  const onSubmit1 = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:8080/api/v1/valideDate", datedata).then(
      (res) => console.log(res.data)
    );
  };

  const filterDate = () => {
    if (projectsList.length > 0) {
      const newFilter = projectsList.filter(
        (colab) => colab.date_valide === date
      );
      setProjectList(newFilter);
    }
  };

  //get the choosen date to display statistics
  return (
    <div className="productList">
      <div className="date">
        <div>
          <label>Choisir une date a afficher: </label>
          <input
            type="month"
            onChange={(event) => {
              setDate(event.target.value);
            }}
          />
          <button onClick={filterDate} className="btn-date">
            afficher
          </button>
        </div>
        <form onSubmit={onSubmit1}>
          <label>valider la date: </label>
          <input
            type="date"
            defaultValue={dateCreated}
            onChange={(e) => setDateValide(e.target.value)}
          />
          <button type="submit" className="btn-date">
            valider
          </button>
        </form>
      </div>

      <table className="customers">
        <tbody>
          <tr>
            <th>Projet</th>
            <th>TJM</th>
            <th>Statut</th>
            <th>Collab concerné</th>
            <th>Jours Travaillées</th>
            <th>Dates Valides</th>
          </tr>
          {projectsList.length !== 0 &&
            projectsList.map((item, i) => {
              return (
                <tr key={i}>
                  <td className="col-1">
                    <textarea
                      cols="70"
                      rows="5"
                      defaultValue={item.projectName}
                    ></textarea>
                  </td>
                  <td>{item.tjm}</td>
                  <td>{item.status}</td>
                  <td>{item.fname}</td>
                  <td>{item.jrs_travaille}</td>
                  <td>{item.date_valide}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
