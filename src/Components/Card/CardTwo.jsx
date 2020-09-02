import React from "react";

import { Link, Route, useParams } from "react-router-dom";
import { Row, Col, Card } from "react-bootstrap";
import axios from "axios";
import { useQuery } from "react-query";

export default function CardTwo() {
  const getTrip = async () => {
    const response = await axios.get(`http://localhost:5000/api/v1/trip`);

    return response.data.data.trip;
  };

  const { isLoading, isError, data, error } = useQuery("trip", getTrip);

  if (isLoading) {
    return <p>Loading.....</p>;
  }

  return (
    <Row>
      {data.map((dest, key) => (
        <Col sm={4} key={key}>
          <Card style={{ width: 300, height: 350 }} className="layout-card">
            <Route>
              <Link to={`/detail/${dest.id}`}>
                <Card.Img
                  className="text-center"
                  style={{ width: 280, height: 230, marginLeft: 9 }}
                  variant="top"
                  src={process.env.PUBLIC_URL + `${dest.image}`}
                  key={key}
                />
              </Link>
            </Route>

            <Card.Body key={key}>
              <Card.Title>{dest.title}</Card.Title>

              <Row>
                <Col>
                  <span className="text-danger">Rp. {dest.price}</span>
                </Col>
                <Col>
                  <span className="text-secondary">{dest.country.name}</span>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}
