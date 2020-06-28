import React, { FC } from "react";
import "./EditUser.css";
import { User } from "../../model/user.model";
import { UserCallback } from "../../shared/shared-types";
import { Formik } from "formik";

interface Props {
  user: User | undefined;
  onEditUser: UserCallback;
}

export const EditUser: FC<Props> = ({ user, onEditUser }) => {
  return (
    <Formik
      initialValues={{
          firstName: user?.firstName,
          lastName: user?.lastName,
          imageUrl: user?.imageUrl,
          email: user?.email,
          id: user?.id,
          username: user?.username
      }}
      onSubmit={(values, actions) => {
        actions.setSubmitting(false);
        const user = {
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            imageUrl: values.imageUrl,
            id: values.id,
            username: values.username
        } as User;
       onEditUser(user);
      }}
    >
      {(props) => (
        <div className="Register-form">
          <form className="form" onSubmit={props.handleSubmit}>
            <div className="control">
              <h1>Edit User</h1>
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
                value={props.values.firstName}
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
                value={props.values.lastName}
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
                value={props.values.email}
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
