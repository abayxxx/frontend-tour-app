import React, { useContext, useState, useEffect } from "react";
import logo from "../../assets/headericon.png";
import luffy from "../../assets/luffy.jpg";
import headerPict from "../../assets/header.png";
import { ContextUser } from "../Context/ContextUser";
import { ContextAdmin } from "../Context/ContextAdmin";
import Register from "../Modal/Register";
import Login from "../Modal/Login";
import Dropdown from "../Modal/Dropdown";
import DropdownAdmin from "../Modal/DropdownAdmin";
import "../../assets/stylesheet.css";
import { Row, Col, Container } from "react-bootstrap";
import { Link, Route } from "react-router-dom";

export default function Header() {
  const { contextUser } = useContext(ContextUser);
  const { contextAdmin } = useContext(ContextAdmin);
  const [modal, setModal] = useState(false);

  const modalToggle = () => setModal(!modal);

  // useEffect(() => {
  //   cekAdminUser();
  // }, [modal]);

  const cekAdminUser = () => {
    let adminUser;

    if (contextUser) {
      adminUser = (
        <div className="btn-header">
          <img
            src={luffy}
            className="rounded-circle"
            style={{ width: 50, marginTop: 20, marginLeft: 250 }}
            onClick={modalToggle}
          ></img>
          <Dropdown toggle={modal} />
        </div>
      );
    } else if (contextAdmin) {
      adminUser = (
        <div className="btn-header">
          <img
            src={luffy}
            className="rounded-circle"
            style={{ width: 50, marginTop: 20, marginLeft: 250 }}
            onClick={modalToggle}
          ></img>
          <DropdownAdmin toggle={modal} />
        </div>
      );
    } else {
      adminUser = (
        <div className="btn-header">
          <Login />
          <Register />
        </div>
      );
    }

    return adminUser;
  };

  const cekLogin = () => {
    let layout;

    contextUser
      ? (layout = (
          <Route>
            <Link to="/user-home">
              <img src={logo} className="header-h"></img>
            </Link>
          </Route>
        ))
      : (layout = (
          <Route>
            <Link to="/">
              <img src={logo} className="header-h"></img>
            </Link>
          </Route>
        ));

    return layout;
  };

  return (
    <Container>
      <nav>
        <div>
          <img src={headerPict} className="header"></img>
        </div>
        <Row>
          <Col xs={4}>{cekLogin()}</Col>
          <Col xs={{ span: 3, offset: 5 }}>{cekAdminUser()}</Col>
        </Row>
      </nav>
    </Container>
  );
}
