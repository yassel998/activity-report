import React from 'react';
import "./topbar.css"
import {  useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { logout } from '../../../actions/userActions';
export default function Topbar() {
  const dispatch = useDispatch();

  let history = useHistory();
  const logoutHandler = () => {
    dispatch(logout());
    history.push("/");
  }

  return (
    <div className="topbar">
        <div className="topbarWrapper">
            <div className="topLeft">
                <span className="logoSpan">
                    <img src={require('./capture.png')} className="logo" alt="" />
                </span>
            </div>
            <div className="topRight">
                 <button className="logout" onClick={logoutHandler}>Se déconnecter</button>
            </div>
        </div>
    </div>
  ) 
}
