import React, { FC } from "react";
import { Formik } from "formik";
import "./Register.css";
import { UserCallback } from "../../shared/shared-types";
import { User } from "../../model/user.model";

interface Props {
  handleRegister: UserCallback;
}

export const Register: FC<Props> = ({ handleRegister }) => {
  return (
    <Formik
      initialValues={{
          firstName: "",
          lastName: "",
          username: "",
          password: "",
          imageUrl: "",
          email: "",
      }}
      onSubmit={(values, actions) => {
        actions.setSubmitting(false);
        console.log(values);
        const user = {
            firstName: values.firstName,
            lastName: values.lastName,
            username: values.username,
            password: values.password,
            email: values.email,
            imageUrl: values.imageUrl
        } as User;
        handleRegister(user);
      }}
    >
      {(props) => (
        <div className="Register-form">
          <form className="form" onSubmit={props.handleSubmit}>
            <div className="control">
              <h1>Register</h1>
            </div>
            <div className="control block-cube block-input">
              <input
                className="fancy-input"
                placeholder="First Name"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                type="text"
                style={{}}
                autoComplete="off"
                name="firstName"
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
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                className="fancy-input"
                name="lastName"
                placeholder="Last Name"
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
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                className="fancy-input"
                name="username"
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
                onChange={props.handleChange}
                onBlur={props.handleBlur}
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

            <div className="control block-cube block-input">
              <input
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                className="fancy-input"
                name="email"
                placeholder="E-mail"
                type="email"
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
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                className="fancy-input"
                name="imageUrl"
                placeholder="Profile Picture"
                type="text"
                style={{}}
                autoComplete="off"
                value={props.values.imageUrl}
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
              <div className="text">Submit</div>
            </button>
          </form>
        </div>
      )}
    </Formik>
  );
};

// <div className="Register-form">
//   <form autoComplete="off" className="form">
// <div className="control">
//   <h1>Register</h1>
// </div>
// <div className="control block-cube block-input">
//   <input
//     className="fancy-input"
//     placeholder="First Name"
//     type="text"
//     style={{}}
//     autoComplete="off"
//   />
//   <div className="bg-top">
//     <div className="bg-inner"></div>
//   </div>
//   <div className="bg-right">
//     <div className="bg-inner"></div>
//   </div>
//   <div className="bg">
//     <div className="bg-inner"></div>
//   </div>
// </div>

// <div className="control block-cube block-input">
//   <input
//     className="fancy-input"
//     name="Last Name"
//     placeholder="Last Name"
//     type="text"
//     style={{}}
//     autoComplete="off"
//   />
//   <div className="bg-top">
//     <div className="bg-inner"></div>
//   </div>
//   <div className="bg-right">
//     <div className="bg-inner"></div>
//   </div>
//   <div className="bg">
//     <div className="bg-inner"></div>
//   </div>
// </div>

// <div className="control block-cube block-input">
//   <input
//     className="fancy-input"
//     name="Username"
//     placeholder="Username"
//     type="text"
//     style={{}}
//     autoComplete="off"
//   />
//   <div className="bg-top">
//     <div className="bg-inner"></div>
//   </div>
//   <div className="bg-right">
//     <div className="bg-inner"></div>
//   </div>
//   <div className="bg">
//     <div className="bg-inner"></div>
//   </div>
// </div>

// <div className="control block-cube block-input">
//   <input
//     className="fancy-input"
//     name="password"
//     placeholder="Password"
//     type="password"
//     style={{}}
//     autoComplete="off"
//   />
//   <div className="bg-top">
//     <div className="bg-inner"></div>
//   </div>
//   <div className="bg-right">
//     <div className="bg-inner"></div>
//   </div>
//   <div className="bg">
//     <div className="bg-inner"></div>
//   </div>
// </div>

// <div className="control block-cube block-input">
//   <input
//     className="fancy-input"
//     name="password"
//     placeholder="E-mail"
//     type="text"
//     style={{}}
//     autoComplete="off"
//   />
//   <div className="bg-top">
//     <div className="bg-inner"></div>
//   </div>
//   <div className="bg-right">
//     <div className="bg-inner"></div>
//   </div>
//   <div className="bg">
//     <div className="bg-inner"></div>
//   </div>
// </div>

// <button onClick={handleRegister}className="btn block-cube block-cube-hover" type="button">
//   <div className="bg-top">
//     <div className="bg-inner"></div>
//   </div>
//   <div className="bg-right">
//     <div className="bg-inner"></div>
//   </div>
//   <div className="bg">
//     <div className="bg-inner"></div>
//   </div>
//   <div className="text">Submit</div>
// </button>
//   </form>
// </div>
