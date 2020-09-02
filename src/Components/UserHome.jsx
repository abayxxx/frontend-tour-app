import React, { useState, useContext } from "react";
import iconHeader from "../assets/headericon.png";
import luffy from "../assets/luffy.jpg";
import Footer from "./Layout/Footer";
import CardOne from "./Card/CardOne";
import CardTwo from "./Card/CardTwo";
import Dropdown from "./Modal/Dropdown";
import { ContextUser } from "./Context/ContextUser";
import { Link, Route } from "react-router-dom";
import "../assets/stylesheet.css";
import {
  Button,
  InputGroup,
  FormControl,
  Row,
  Col,
  Jumbotron,
  Container,
} from "react-bootstrap";

export default function UserHome() {
  const [modal, setModal] = useState(false);

  const { contextUser } = useContext(ContextUser);

  const modalToggle = () => setModal(!modal);

  return (
    <Container className="container">
      <Jumbotron>
        <Row>
          <Col xs={4}>
            <Route>
              <Link to="/user-home">
                <img src={iconHeader} className="HeadI"></img>
              </Link>
            </Route>
          </Col>
          <Col xs={{ span: 3, offset: 5 }}>
            <div className="btn-home">
              <img
                src={luffy}
                className="rounded-circle"
                style={{ width: 50, marginTop: 20, marginLeft: 150 }}
                onClick={modalToggle}
              ></img>
              <div style={{ position: "absolute", top: 0, left: -100 }}>
                <Dropdown toggle={modal} />
              </div>
            </div>
          </Col>
        </Row>
        <div>
          <p className="TextHome">Explore</p>
          <p className="TextHome2">your amazing city together</p>
        </div>
        <div className="search-content">
          <p className="text-sm">Find great places to holliday</p>
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Recipient's username"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
            />
            <InputGroup.Append>
              <Button variant="warning">Search</Button>
            </InputGroup.Append>
          </InputGroup>
        </div>
      </Jumbotron>

      <CardOne />

      <div className="text-mid text-center">
        <p>Group Tour</p>
      </div>
      <CardTwo />
      <Footer />
    </Container>
  );
}
