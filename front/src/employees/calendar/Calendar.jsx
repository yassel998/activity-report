import "./calendar.css";
import { useState, useEffect } from "react";
import Select from "react-select";
import Axios from "axios";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

export default function Calendar() {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const [valideData, setValideData] = useState([]);
  console.log(valideData);

  // let id = document.cookie.replace(
  //   /(?:(?:^|.*;\s*)userId\s*\=\s*([^;]*).*$)|^.*$/,
  //   "$1"
  // );
  // let x = document.cookie.replace(
  //   /(?:(?:^|.*;\s*)firstName\s*\=\s*([^;]*).*$)|^.*$/,
  //   "$1"
  // );
  // let y = document.cookie.replace(
  //   /(?:(?:^|.*;\s*)lastName\s*\=\s*([^;]*).*$)|^.*$/,
  //   "$1"
  // );
  // let fullName = x.concat(" ", y);
  //get fname & lname of the collab
  let x = userInfo.firstName;
  let y = userInfo.lastName;
  let fullName = x.concat(" ", y); //concat fname & lname

  // get the id from the cookie to use it in the request link to bring project name's
  let id = userInfo.id;
  //get the project's to diplay them in select
  const [projectsList, setProjectsList] = useState([]);
  console.log(projectsList);
  useEffect(() => {
    Axios.get(`http://localhost:3001/projectsName/${id}`).then((response) => {
      setProjectsList(response.data);
    });
  }, [id]);

  //stock the project's in select
  const selOptions = [];
  // var test = [...new Set(projectsList)];
  // console.log("after: " + test);

  const ids = projectsList.map((o) => o.projectName);
  const filtered = projectsList.filter(
    ({ projectName }, index) => !ids.includes(projectName, index + 1)
  );

  for (var i = 0; i < filtered.length; i++) {
    var obj = {};
    if (filtered.length > 0) {
      obj["id"] = filtered[i].id;
      obj["tjm"] = filtered[i].tjm;
      // obj["date"] = projectsList[i].date;
      obj["value"] = filtered[i].projectName;
      obj["label"] = filtered[i].projectName;
    }
    selOptions.push(obj);
  }

  //catch the selected project (id)
  const [prId, setPrId] = useState(projectsList.id);
  const [tjm, setTjm] = useState(projectsList.tjm);
  const [prName, setPrName] = useState(projectsList.projectName);
  // const [dateTosend, setDateTosend] = useState(projectsList.date);
  const handle = (e) => {
    setPrId(e.id);
    setTjm(e.tjm);
    setPrName(e.label);
  };
  useEffect(() => {
    Axios.get(`http://localhost:3001/IfValide/${userInfo.id}/${prId}`).then(
      (response) => {
        setValideData(response.data);
      }
    );
  }, [prId]);

  //fetch the validated date from the admin (if he select 04/2022 we display 05/2022)
  //always we increase with 1 month
  const [dateVal, setDateVal] = useState("");
  console.log(dateVal);

  useEffect(() => {
    let mounted = true;
    Axios.get("http://localhost:3001/lastDate").then((response) => {
      if (mounted) {
        setDateVal(response.data[0].date_valide);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  var year = parseInt(dateVal.slice(0, 4)); //get the validate date
  var month = parseInt(dateVal.slice(5, 7)); //get the validate month

  var monthTosend;
  var yearTosend = year;
  //Increase with 1 month
  if (month === 12) {
    month = 1;
    year = year + 1;
  } else {
    month += 1;
  }

  monthTosend = ("0" + month).slice(-2);

  const dateTosend = yearTosend + "-" + monthTosend;

  //get the number of day's in the increased month
  function daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
  }
  //get number of columns in a month and fill them with 1,2,3,4,.......,28,29,30 or 31
  const renderDay = () => {
    let td = [];
    for (let i = 1; i <= daysInMonth(month, year); i++) {
      td.push(<td key={i}>{i}</td>);
    }
    return td;
  };

  //get day names in french accordind to the days in current month
  var getDaysArray = function (year, month) {
    var monthIndex = month - 1; // 0..11 instead of 1..12
    var names = ["dim", "lun", "mar", "mer", "jeu", "ven", "sam"];
    var date = new Date(year, monthIndex, 1);
    var result = [];
    while (date.getMonth() === monthIndex) {
      result.push(names[date.getDay()]);
      date.setDate(date.getDate() + 1);
    }
    return result;
  };

  const renderDayNames = () => {
    let td = [];
    for (let i = 0; i < daysInMonth(month, year); i++) {
      td.push(<td key={i}>{getDaysArray(year, month)[i]}</td>);
    }
    return td;
  };

  //get the number of collumns (inputs) according to day numbers & calc the SUM
  var arr = [];
  for (let i = 1; i <= daysInMonth(month, year); i++) {
    arr[i] = [i];
  }
  //get day numbers of sat & sun in the current month
  let days = []; //stock all indexes
  var date = new Date();

  for (let i = 1; i <= daysInMonth(month, year); i++) {
    days[i] = new Date(date.getFullYear(), date.getMonth(), i);
  }

  var sat_sun = []; //to stock the index's of saturday's and sunday's
  satANDsun();
  //get sunday's and saturday's
  function satANDsun() {
    for (let i = 0; i < daysInMonth(month, year); i++) {
      if (
        getDaysArray(year, month)[i] === "sam" ||
        getDaysArray(year, month)[i] === "dim"
      ) {
        sat_sun.push(i);
      }
    }
  }

  // holidays;
  var size;
  if (year) {
    var xhReq = new XMLHttpRequest();
    xhReq.open(
      "GET",
      "https://calendrier.api.gouv.fr/jours-feries/metropole/" + year + ".json",
      false
    );
    xhReq.send(null);
    var jsonObject = JSON.parse(xhReq.responseText);
    //size number of hoiday's days,how much of hollidays in this year
    size = Object.keys(jsonObject).length;
  }
  holidayDays();

  function holidayDays() {
    for (let i = 0; i < size; i++) {
      if (parseInt(Object.keys(jsonObject)[i].slice(5, 7)) === month) {
        sat_sun.push(parseInt(Object.keys(jsonObject)[i].slice(8, 10)) - 1);
      }
    }
  }

  //remove duplicates values from sat_sun
  function removeDuplicates(arr) {
    return [...new Set(arr)];
  }
  //Ascending order the values in sat_sun
  sat_sun.sort(function (a, b) {
    return a - b;
  });

  const sumAll = (numList) => numList.reduce((acc, num = 0) => acc + num, 0);
  const handleInputChange = (inputIndex, setValues) => (event) => {
    const value = parseFloat(event.target.value);
    if (!isNaN(value)) {
      setValues((previous) => {
        const copy = previous.slice();
        copy[inputIndex] = value;
        return copy;
      });
    } else {
      setValues((previous) => {
        const copy = previous.slice();
        copy[inputIndex] = 0;
        document.getElementById(inputIndex).value = 0;
        return copy;
      });
    }
  };

  var total; //total of working day's
  var [values, setValues] = useState([]);

  function Inputs() {
    total = sumAll(values);
    let counter = 0; //increment index in sat_Sun_holidays arrays
    return (
      <div>
        <table className="inptd">
          <tbody>
            <tr>
              {arr.map((id, index) => {
                const onChange = handleInputChange(index, setValues);
                if (index - 1 === removeDuplicates(sat_sun)[counter]) {
                  //index begin with 1 while sat_sun with 0
                  counter++;
                  return (
                    <td key={index}>
                      <input
                        onChange={onChange}
                        type="text"
                        defaultValue="0"
                        id={id}
                        className="notAllowed"
                        readOnly
                      />
                    </td>
                  );
                } else {
                  return (
                    <td key={index}>
                      <input
                        className="example"
                        onChange={onChange}
                        type="text"
                        defaultValue="0"
                        id={id}
                      />
                    </td>
                  );
                }
              })}
              <td>
                <input id="total" type="text" value={total} readOnly />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  //
  const addwork = () => {
    const d = new Date();
    let dy = d.getDay();
    if (projectsList.length !== 0) {
      const data = {
        id_emp: userInfo.id,
        status: "Inacheve",
        projectName: prName,
        jrs_travaille: total,
        date_valide: dateTosend.concat("-", dy),
        PrID: prId,
        tjm: tjm,
      };
      if (valideData.length !== 0) {
        Axios.post("http://localhost:3001/updateProjectByCol", data).then(
          (res) => {
            console.log(res.data);
            //   history.push("/home")
          }
        );
      } else if (valideData.length === 0) {
        Axios.post("http://localhost:3001/createProjectByCol", data).then(
          (res) => {
            console.log(res.data);
            //   history.push("/home")
          }
        );
      }
    }
  };

  //message to collab that he has enter jour_tr

  const notify = () => {
    toast.success(
      "vous avez bien insérer le nombre de jour travailles dans : " +
        dateTosend +
        ", concerant le projet : " +
        prName
    );
  };

  return (
    <div className="calendar">
      <div className="fullname">
        <span className="name">Salut {fullName}</span>
      </div>
      <div className="dateVal">
        <span className="month">Mois : </span>
        <button disabled className="btmnonth">
          {month + "/" + year}
        </button>
      </div>

      <div className="projects">
        <span className="prj">Votre projets :</span>
        <Select className="selOptions" options={selOptions} onChange={handle} />
      </div>
      <div className="tableInser">
        <table className="inptd">
          <tbody>
            <tr>
              {renderDay()}
              <td></td>
            </tr>
            <tr>
              {renderDayNames()}
              <td></td>
            </tr>
          </tbody>
        </table>
        {Inputs()}
        {/* {console.log("test : " + total)} */}
      </div>
      <div className="confirmation">
        <button
          className="save"
          onClick={() => {
            addwork();
            notify();
          }}
        >
          Enregistrer
        </button>
        <button className="cancel" onClick={() => window.location.reload()}>
          Annuler
        </button>
      </div>
      <ToastContainer />
    </div>
  );
}
