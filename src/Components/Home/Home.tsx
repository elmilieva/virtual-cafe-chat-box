import React from "react";
import "./Home.css";
import { Typography, Button } from "@material-ui/core";
import { NavLink } from "react-router-dom";

export const Home = () => {
  return (
    <div>
        <Typography
          style={{ marginTop: "6rem", marginLeft: "6rem" }}
          variant="h2"
        >
          Grab a Coffee and <br></br> Chat with Friends
        </Typography>
      <br></br>
      <br></br>
      <div style={{width: "100%", margin: "0 auto", textAlign: "center"}}>
      <NavLink to="/register"><Button variant="contained" color="primary">Get Started</Button></NavLink>
      </div>
      <br></br>
      <br></br>
      <Typography
        style={{ textAlign: "center", width: "70%", margin: "0 auto" }}
        variant="h5"
      >
        The Virtual Cafe Chat-Box gives you the opportunity to grab a snak or a
        coffee with your colleagues or friends while having a very nice
        conversation.
      </Typography>
    </div>
  );
};
