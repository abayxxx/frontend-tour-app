import React, { useState, useEffect } from "react";
import "./App.css";
import "./assets/stylesheet.css";
import Home from "./Components/Home";
import Profile from "./Components/Profile";
import Detail from "./Components/Detail";
import UserHome from "./Components/UserHome";
import Payment from "./Components/Payment";
import { ContextUser } from "./Components/Context/ContextUser";
import { ContextAdmin } from "./Components/Context/ContextAdmin";
import TableAdmin from "./Components/Admin/TableAdmin";
import LoginAdmin from "./Components/Admin/LoginForm";
import Add from "./Components/Admin/Add";
import FormAdmin from "./Components/Admin/FormAdmin";
import PaymentConfirmed from "./Components/PaymentConfirmed";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

export default function App() {
  const [contextUser, setContextUser] = useState(null);
  const [contextAdmin, setContextAdmin] = useState(null);
  console.log(contextAdmin);

  useEffect(() => {
    if (localStorage.token) {
      setContextUser(true);
    }
  });
  useEffect(() => {
    if (localStorage.admintoken) {
      setContextAdmin(true);
    }
  });

  function PrivateRouteAdmin({ children, ...rest }) {
    return (
      <Route
        {...rest}
        render={({ location }) =>
          contextAdmin ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/admin-login",
                state: { from: location },
              }}
            />
          )
        }
      />
    );
  }

  function PrivateRoute({ children, ...rest }) {
    return (
      <Route
        {...rest}
        render={({ location }) =>
          contextUser ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/",
                state: { from: location },
              }}
            />
          )
        }
      />
    );
  }
  return (
    <div>
      <ContextUser.Provider value={{ contextUser, setContextUser }}>
        <ContextAdmin.Provider value={{ contextAdmin, setContextAdmin }}>
          <Router>
            <Switch>
              <Route exact path="/admin-login">
                {contextAdmin ? <Redirect to="/table-admin" /> : <LoginAdmin />}
              </Route>
              <Route exact path="/detail/:id" children={<Detail />} />

              <PrivateRouteAdmin exact path="/table-admin">
                <TableAdmin />
              </PrivateRouteAdmin>
              <PrivateRouteAdmin exact path="/form-admin">
                <FormAdmin />
              </PrivateRouteAdmin>
              <PrivateRouteAdmin path="/trip">
                <Add />
              </PrivateRouteAdmin>

              <PrivateRoute exact path="/user-home">
                <UserHome />
              </PrivateRoute>
              <PrivateRoute exact path="/profile">
                <Profile />
              </PrivateRoute>
              <PrivateRoute exact path="/payment-confirmed">
                <PaymentConfirmed />
              </PrivateRoute>
              <PrivateRoute exact path="/payment-method/:id/:qty">
                <Payment />
              </PrivateRoute>
              <Route exact path="/">
                {contextUser ? <Redirect to="/user-home" /> : <Home />}
              </Route>
            </Switch>
          </Router>
        </ContextAdmin.Provider>
      </ContextUser.Provider>
    </div>
  );
}
