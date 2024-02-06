const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const path = require("path")
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors("*"))
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    key: ["userId", "firstName", "lastName"], //the name of the cookie u'r gonna create
    secret: "Azghenghan",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 24, //in secondes ~ 24 hours
    },
  })
);
app.use(express.static(path.join(__dirname + "/public")))
const db = mysql.createConnection({
  user: "root",
  host: "127.0.0.1",
  password: "123456789",
  database: "activitymanagement",
  dateStrings: true,
  insecureAuth: true,
});
//create a new employee
app.post("/createEmp", (req, res) => {
  console.log(req.body);
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const password = req.body.password;
  const phone = req.body.phone;
  const address = req.body.address;
  const IsAdmin = req.body.IsAdmin;
  db.query(
    "INSERT INTO employees (firstName, lastName, email, password, phone, address,IsAdmin) VALUES (?,?,?,?,?,?,?)",
    [firstName, lastName, email, password, phone, address, IsAdmin],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

//display all Collabs
app.get("/employees", (req, res) => {
  db.query("SELECT * FROM employees", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

//delete a Collab
app.delete("/deleteEmp/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM employees WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

//update a collab
app.get("/collab/:id", (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM employees WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.put("/updateCollab", (req, res) => {
  const id = req.body.id;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const phone = req.body.phone;
  const address = req.body.address;
  const password = req.body.password;
  db.query(
    "UPDATE employees SET firstName = ?, lastName = ?, email = ?, phone = ?, address = ?, password = ? WHERE id = ?",
    [firstName, lastName, email, phone, address, password, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

// ******************************************************************************************

//create a new project
app.post("/createProjectByCol", async (req, res) => {
  const id_emp = Number(req.body.id_emp);
  const projectName = req.body.projectName;
  const status = req.body.status;
  const jrs_travaille = Number(req.body.jrs_travaille);
  const date_valide = req.body.date_valide;
  const PrID = req.body.PrID;
  const tjm = req.body.tjm;

  db.query(
    "INSERT INTO work (EmpID,PrID,tjm,jrs_travaille,date_valide) VALUES (?,?,?,?,?)",
    [id_emp, PrID, tjm, jrs_travaille, date_valide],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("data inserted");
      }
    }
  );
});

app.post("/updateProjectByCol", async (req, res) => {
  const id_emp = Number(req.body.id_emp);
  const jrs_travaille = Number(req.body.jrs_travaille);
  const date_valide = req.body.date_valide;
  const PrID = req.body.PrID;

  await db.query(
    "UPDATE work SET jrs_travaille = ?, date_valide = ? WHERE (jrs_travaille IS NULL AND date_valide IS NULL) AND EmpID=? AND PrID=?",
    [jrs_travaille, date_valide, id_emp, PrID],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
        console.log(result);
      }
    }
  );
});

app.get("/IfValide/:id_emp/:prId", (req, res) => {
  console.log(req.params.id_emp, req.params.prId);
  const idEmp = req.params.id_emp;
  const idPr = req.params.prId;

  db.query(
    "SELECT EmpID,PrID,tjm,id_work,jrs_travaille FROM work WHERE (EmpID=? AND PrID=?) AND  (jrs_travaille IS  NULL AND date_valide IS NULL)",
    [idEmp, idPr],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});
app.post("/createProject", (req, res) => {
  const projectName = req.body.projectName;
  const status = req.body.status;
  db.query(
    "INSERT INTO projects (projectName, status) VALUES (?,?)",
    [projectName, status],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        const PrID = result.insertId;
        const tjm = req.body.tjm;
        const EmpID = req.body.EmpID;
        db.query(
          "INSERT INTO work (tjm, PrID,EmpID) VALUES (?,?,?)",
          [tjm, PrID, EmpID],
          (err, result) => {
            if (err) {
              console.log(err);
            } else {
              res.send("Values Inserted");
            }
          }
        );
      }
    }
  );
});

// valide date by Admin
app.post("/valideDate", (req, res) => {
  console.log(req.body)
  console.log(Object.keys(req.body)[0]);
  const dateVl = Object.keys(req.body)[0];
  db.query(
    "INSERT INTO datevalideadmin (date_valide) VALUES (?)",
    [dateVl],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Date Inserted");
      }
    }
  );
});

app.get("/lastDate", (req, res) => {
  db.query(
    "SELECT date_valide FROM datevalideadmin ORDER BY id DESC LIMIT 1",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});
//affect the full name of Collab to the created project
app.get("/employeesName", (req, res) => {
  db.query("SELECT id,  firstname, lastname FROM employees", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

//display all projects & employees who are working on it
app.get("/projects", (req, res) => {
  db.query(
    "SELECT p.id as PrId,w.id_work,w.EmpID as EmpID,p.projectName,p.status,w.jrs_travaille,LEFT(w.date_valide , 7) as date_valide,w.tjm, CONCAT(e.firstName, ' ', e.lastName) AS fname FROM `projects` p INNER JOIN `work` w ON p.id = w.PrID  INNER JOIN `employees` e ON w.EmpID=e.id",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

//delete a project
app.delete("/deletePr/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM projects WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

//delete a project
app.delete("/deleteWk/:id/:Empid", (req, res) => {
  const idEmp = req.params.Empid;
  const idPr = req.params.id;
  db.query("DELETE FROM work WHERE (EmpID = ? AND PrID = ?)", [idEmp,idPr], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

// ****************************************************************************

//Assign a collaborator to a project
app.post("/createWork", (req, res) => {
  const EmpID = req.body.EmpID;
  const PrID = req.body.PrID;
  const tjm = req.body.tjm;
  db.query(
    "INSERT INTO work (EmpID, PrID, tjm) VALUES (?,?,?)",
    [EmpID, PrID, tjm],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

//get all project name's to select in frontend
app.get("/projectsName/:id", (req, res) => {
  console.log(req.params.id);
  const id = req.params.id;
  db.query(
    "SELECT id,projectName,tjm FROM projects p INNER JOIN work w ON w.PrID = p.id WHERE EmpID=?",
    id,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

//*************************************************** */

//Try to Login
app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  db.query(
    "SELECT * FROM employees WHERE email = ? AND password = ?",
    [email, password],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      if (result.length > 0) {
        // req.session.user = result; //create a session
        // console.log(req.session.user);
        console.log(result[0].password);

        res.cookie("firstName", result[0].firstName);
        res.cookie("lastName", result[0].lastName);
        res.cookie("userId", result[0].id);
        res.send(result);
      } else {
        res.status(401).send({ message: "Invalid Email or Password." });
      }
    }
  );
});

app.put("/updateWk/:PrId/:EmpID",(req,res) => {
  const idEmp = req.params.EmpID;
  console.log(idEmp)
  const idPr = req.params.PrId;
  const projectName = req.body.projectName;
  const tjm = req.body.tjm;
  const status = req.body.status

  db.query(
    "UPDATE projects SET projectName= ?, status= ? WHERE id=?",
    [projectName, status, idPr],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
         db.query("UPDATE work SET tjm = ? where EmpID=? AND PrID=?",[tjm,idEmp,idPr],
         (err, result) => {
          if (err) {
            console.log(err);
          } else {
            console.log("Data updated !")
          }   
        } 
         )
      }
    }
  );


})
const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log("server is running ...");
});

