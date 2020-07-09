import React, { ReactElement, useRef } from "react";
import "./Login.css";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { submitLogin } from "../../features/auth/authSlice";

export default function Login(): ReactElement {
  const dispatch = useDispatch();
  const history = useHistory();

  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  function login(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    dispatch(
      submitLogin(
        {
          username: usernameRef.current?.value || "",
          password: passwordRef.current?.value || "",
        },
        history
      )
    );
  }
  return (
    <form autoComplete="off" onSubmit={login} className="form">
      <div className="control">
        <h1>Sign In</h1>
      </div>
      <div className="control block-cube block-input">
        <input
          ref={usernameRef}
          className="fancy-input"
          placeholder="Username"
          type="text"
          style={{}}
          autoComplete="off"
        />
        <div className="bg-top">
          <div className="bg-inner"></div>
        </div>
        <div className="bg-right">
          <div className="bg-inner"></div>
        </div>
        <div className="bg">
          <div className="bg-inner"></div>
        </div>
      </div>
      <div className="control block-cube block-input">
        <input
          ref={passwordRef}
          className="fancy-input"
          name="password"
          placeholder="Password"
          type="password"
          style={{}}
          autoComplete="off"
        />
        <div className="bg-top">
          <div className="bg-inner"></div>
        </div>
        <div className="bg-right">
          <div className="bg-inner"></div>
        </div>
        <div className="bg">
          <div className="bg-inner"></div>
        </div>
      </div>
      <button className="btn block-cube block-cube-hover" type="submit">
        <div className="bg-top">
          <div className="bg-inner"></div>
        </div>
        <div className="bg-right">
          <div className="bg-inner"></div>
        </div>
        <div className="bg">
          <div className="bg-inner"></div>
        </div>
        <div className="text">Log In</div>
      </button>
    </form>
  );
}
