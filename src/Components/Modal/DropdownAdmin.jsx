import React, { useContext } from "react";
import { ContextUser } from "../Context/ContextUser";
import journey from "../../assets/vector/journey.png";
import { ContextAdmin } from "../Context/ContextAdmin";
import logout from "../../assets/vector/logout.png";
import { Route, Link } from "react-router-dom";

export default function DropdownAdmin(props) {
  const { setContextUser } = useContext(ContextUser);
  const { setContextAdmin } = useContext(ContextAdmin);
  const handelLogout = () => {
    localStorage.removeItem("admintoken");
    setContextAdmin(false);
  };
  const toggle = () => {
    let modalDropdown;
    props.toggle
      ? (modalDropdown = (
          <div className="dropdown" style={{ display: "block", height: 120 }}>
            <Route>
              <Link to="/trip">
                <img src={journey} className="img-dd" style={{ top: 20 }}></img>
                <p className="text-dd" style={{ top: 20 }}>
                  Trip
                </p>
              </Link>
              <hr
                className="line"
                style={{ position: "absolute", top: 50, width: 150 }}
              />
              <Link to="/admin-login" onClick={handelLogout}>
                <img src={logout} className="img-dd" style={{ top: 80 }}></img>
                <p className="text-dd" style={{ top: 80 }}>
                  Logout
                </p>
              </Link>
            </Route>
          </div>
        ))
      : (modalDropdown = (
          <div className="dropdown" style={{ display: "none" }}>
            <img src={journey} className="img-dd" style={{ top: 20 }}></img>
            <p className="text-dd" style={{ top: 20 }}>
              Trip
            </p>
            <hr
              className="line"
              style={{ position: "absolute", top: 75, width: 140 }}
            />
            <img src={logout} className="img-dd" style={{ top: 80 }}></img>
            <p className="text-dd" style={{ top: 80, color: "red" }}>
              Logout
            </p>
          </div>
        ));

    return modalDropdown;
  };

  return <div>{toggle()}</div>;
}
