import React, { Fragment } from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRouteCol = ({ IsAdmin, component: Component, ...rest }) => {
  const { loading } = useSelector((state) => state.userSignin);

  return (
    <Fragment>
     {loading === false && (

        <Route
          {...rest}
          render={(props) => {
            if (loading === true) {
              return <Redirect to="/login" />;
            }
            if (IsAdmin !== "noadmin") {
              return <Redirect to="/" />;
            }
            return <Component {...props} />;
          }}
        />
     )}
    </Fragment>
  );
};

export default ProtectedRouteCol;
