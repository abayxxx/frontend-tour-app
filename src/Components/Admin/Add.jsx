import React from "react";
import CardTwo from "../Card/CardTwo";
import Footer from "../Layout/Footer";
import Header from "../Layout/Header";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Route, Link } from "react-router-dom";
export default function Add() {
  return (
    <div>
      <Header />
      <Container className="container" style={{ marginTop: -100 }}>
        <Row>
          <Col xs={{ span: 6 }}>
            <div className="text con-add">
              <p>Income Trip</p>
            </div>
          </Col>
          <Col xs={{ span: 2, offset: 4 }}>
            <div className="btn-add">
              <Route>
                <Link to="/form-admin">
                  <Button
                    className="btn-form"
                    variant="warning"
                    style={{ width: 150 }}
                  >
                    Add Trip
                  </Button>
                </Link>
              </Route>
            </div>
          </Col>
        </Row>

        <CardTwo />
      </Container>
      <Footer />
    </div>
  );
}
