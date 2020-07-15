import React from "react";
import "./Home.css";
import {
  Typography,
  Button,
  useMediaQuery,
  makeStyles,
} from "@material-ui/core";
import { NavLink } from "react-router-dom";

// styles and classes for materialUI
const useStyles = makeStyles((theme) => ({
  imageContainer: {
    textAlign: "center",
    margin: "3rem",
  },
  image: {
    maxWidth: "100%",
    margin: theme.spacing(1),
  },
}));

// Home component
export const Home = () => {
  const classes = useStyles();
  const matches = useMediaQuery("(min-width:600px)");
  return (
    <div style={{ margin: "1rem" }}>
      <Typography
        style={{ textAlign: "center" }}
        variant={matches ? "h2" : "h4"}
      >
        Grab a Coffee and <br></br> Chat with Friends
      </Typography>
      <div className={classes.imageContainer}>
        <img
          alt="coffee mug"
          className={classes.image}
          src="https://i.imgur.com/3LSKpAm.png"
        />
      </div>
      {/* https://www.clipartmax.com/middle/m2i8i8N4m2G6b1H7_add-a-tea-bag-and-itd-be-perfect-coffee-cup-with-heart/ */}
      <br></br>
      <br></br>
      <div style={{ width: "100%", margin: "0 auto", textAlign: "center" }}>
        <NavLink to="/register">
          <Button variant="contained" color="primary">
            Get Started
          </Button>
        </NavLink>
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
