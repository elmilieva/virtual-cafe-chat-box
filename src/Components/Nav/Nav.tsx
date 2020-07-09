import React from "react";
import "./Nav.css";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../app/rootReducer";

export const Nav = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.loggedUser
  );
  return (
    <React.Fragment>
      <div className="topnav" id="myTopnav">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/admin">Admin</NavLink>
        {isAuthenticated ? <NavLink to="/add-room">Create Room</NavLink> : ""}
        <NavLink to="/chatroom">Chat Room</NavLink>
        <NavLink className="pull-right" to="/register">
          Register
        </NavLink>
        <NavLink className="pull-right" to="/login">
          Login
        </NavLink>
        <a href="/#" className="icon" onClick={myFunction}>
          <i className="fa fa-bars"></i>
        </a>
        <script>{}</script>
      </div>
    </React.Fragment>
  );
  function myFunction(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    e.preventDefault();
    var x = document.getElementById("myTopnav");
    if (x === null) {
      x = document.createElement("div");
    }
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }
};
