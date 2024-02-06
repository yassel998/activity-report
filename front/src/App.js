import Sidebar from "./admin/components/sidebar/Sidebar";
import Topbar from "./admin/components/topbar/Topbar";
import Home from "./admin/pages/home/Home";
import "./app.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CollabList from "./admin/pages/collabList/CollabList";
import Collab from "./admin/pages/collab/Collab";
import NewCollab from "./admin/pages/newCollab/NewCollab";
import ProjList from "./admin/pages/projList/ProjList";
import Project from "./admin/pages/project/Project";
import NewProject from "./admin/pages/newProject/NewProject";
import AddCollabToPr from "./admin/pages/addCollabToPr/AddCollabToPr";
import Calendar from "./employees/calendar/Calendar";
import Login from "./login/Login";
import ProtectedRoute from "./admin/components/route/ProtectedRoute";
import { useSelector } from "react-redux";
import ProtectedRouteCol from "./employees/route/ProtectedRouteCol";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  return (
    <Router>
      <Topbar />
      <div className="container">
        <Sidebar />

        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <ProtectedRouteCol
            IsAdmin={userInfo && userInfo.IsAdmin}
            path="/calendar"
            component={Calendar}
            exact
          />
          {/*    <Route path="/calendar">
            <Calendar />
          </Route> */}
          <ProtectedRoute
            IsAdmin={userInfo && userInfo.IsAdmin}
            path="/home"
            component={Home}
            exact
          />
          {/* <Route exact path="/home">
            <Home />
          </Route>*/}
          <ProtectedRoute
            IsAdmin={userInfo && userInfo.IsAdmin}
            path="/collabs"
            component={CollabList}
            exact
          />
          {/* <Route path="/collabs">
            <CollabList />
          </Route>*/}
          <ProtectedRoute
            IsAdmin={userInfo && userInfo.IsAdmin}
            path="/collab/:CollabId"
            component={Collab}
            exact
          />
          {/*   <Route path="/collab/:CollabId">
            <Collab />
          </Route>*/}
          <ProtectedRoute
            IsAdmin={userInfo && userInfo.IsAdmin}
            path="/project"
            component={NewCollab}
            exact
          />
           <ProtectedRoute
            IsAdmin={userInfo && userInfo.IsAdmin}
            path="/newCollab"
            component={NewCollab}
            exact
          />

          <ProtectedRoute
            IsAdmin={userInfo && userInfo.IsAdmin}
            path="/projects"
            component={ProjList}
            exact
          />
          <ProtectedRoute
            IsAdmin={userInfo && userInfo.IsAdmin}
            path="/project/:CollabId"
            component={Project}
            exact
          />
          {/*   <Route path="/project/:CollabId">
            <Project />
          </Route>*/}
          <ProtectedRoute
            IsAdmin={userInfo && userInfo.IsAdmin}
            path="/newProject"
            component={NewProject}
            exact
          />
          {/* <Route path="/newProject">
            <NewProject />
          </Route>*/}
          <ProtectedRoute
            IsAdmin={userInfo && userInfo.IsAdmin}
            path="/addemp/:ProjectId"
            component={AddCollabToPr}
            exact
          />
          {/* <Route path="/addemp/:ProjectId">
            <AddCollabToPr />
          </Route>*/}
        </Switch>
        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;
