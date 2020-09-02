import React, { useState } from "react";
import iconHeader from "../assets/headericon.png";
import ModalLogReg from "./Modal/ModalLogReg";
import CardOne from "./Card/CardOne";
import Footer from "./Layout/Footer";
import CardTwo from "./Card/CardTwo";
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

export default function Home() {
  const [login, setLogin] = useState(false);

  const handleLogin = () => setLogin(true);
  return (
    <Container className="container">
      <Jumbotron>
        <Row>
          <Col xs={3}>
            <Route>
              <Link to="/">
                <img src={iconHeader} className="HeadI"></img>
              </Link>
            </Route>
          </Col>
          <Col xs={{ span: 3, offset: 6 }}>
            <div className="btn-home">
              <ModalLogReg />
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
              placeholder="Search dulu sob..."
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
            />
            <InputGroup.Append>
              <Button variant="warning">Search</Button>
            </InputGroup.Append>
          </InputGroup>
        </div>
      </Jumbotron>
      <div>
        <CardOne />
      </div>

      <div className="text-mid text-center">
        <p>Group Tour</p>
      </div>
      <div>
        <CardTwo />
      </div>

      <Footer />
    </Container>
  );
}
