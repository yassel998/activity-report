import React, { Fragment } from "react";

import "./sidebar.css";
import { Home, Person, Computer } from "@material-ui/icons";
import { useSelector } from "react-redux";

import { Link } from "react-router-dom";

export default function Sidebar() {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  return (
    <Fragment>
      {userInfo && userInfo.IsAdmin && userInfo.IsAdmin === "admin" && (
        <div className="sidebar">
          <div className="sidebarWrapper">
            <h3 className="sidebarTitle">Menu</h3>
            <ul className="sidebarList">
              <Link to="/home" className="link">
                <li className="sidebarListItem">
                  <Home className="sidebarIcon" />
                  Home
                </li>
              </Link>

              <Link to="/collabs" className="link">
                <li className="sidebarListItem">
                  <Person className="sidebarIcon" />
                  Collaborateurs
                </li>
              </Link>

              <Link to="/projects" className="link">
                <li className="sidebarListItem">
                  <Computer className="sidebarIcon" />
                  Projets
                </li>
              </Link>
            </ul>
          </div>
        </div>
      )}
    </Fragment>
  );
}
