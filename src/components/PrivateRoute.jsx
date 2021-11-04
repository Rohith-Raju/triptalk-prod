import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../contexts/Authcontext';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { currentuser } = useAuth();
  return (
    <Route
      {...rest}
      render={(props) => {
        return currentuser ? (
          <Component {...props} />
        ) : (
          <Redirect to="signin" />
        );
      }}
    ></Route>
  );
};

export default PrivateRoute;
