import React, { useContext } from "react";
import { ContextUser } from "../Context/ContextUser";
import user from "../../assets/vector/user.png";
import bill from "../../assets/vector/bill.png";
import logout from "../../assets/vector/logout.png";
import { Route, Link } from "react-router-dom";

export default function Dropdown(props) {
  const { setContextUser } = useContext(ContextUser);

  const handelLogout = () => {
    localStorage.removeItem("token");
    setContextUser(false);
  };
  const toggle = () => {
    let modalDropdown;
    props.toggle
      ? (modalDropdown = (
          <div className="dropdown" style={{ display: "block" }}>
            <Route>
              <Link to="/profile">
                <img src={user} className="img-dd"></img>
                <p className="text-dd">Profile</p>
              </Link>

              <Link to="/payment-confirmed">
                <img src={bill} className="img-dd" style={{ top: 50 }}></img>
                <p className="text-dd" style={{ top: 50 }}>
                  Pay
                </p>
              </Link>
              <hr
                className="line"
                style={{ position: "absolute", top: 75, width: 145 }}
              />
              <Link to="/" onClick={handelLogout}>
                <img src={logout} className="img-dd" style={{ top: 110 }}></img>
                <p className="text-dd" style={{ top: 110 }}>
                  Logout
                </p>
              </Link>
            </Route>
          </div>
        ))
      : (modalDropdown = (
          <div className="dropdown" style={{ display: "none" }}>
            <img src={user} className="img-dd"></img>
            <p className="text-dd">Profile</p>
            <img src={bill} className="img-dd" style={{ top: 50 }}></img>
            <p className="text-dd" style={{ top: 50 }}>
              Pay
            </p>
            <hr
              className="line"
              style={{ position: "absolute", top: 75, width: 150 }}
            />
            <img src={logout} className="img-dd" style={{ top: 110 }}></img>
            <p className="text-dd" style={{ top: 110 }}>
              Logout
            </p>
          </div>
        ));

    return modalDropdown;
  };

  return <div>{toggle()}</div>;
}
