import React from "react";
import icon1 from "../../assets/guarante.png";
import icon2 from "../../assets/heart.png";
import icon3 from "../../assets/agent.png";
import icon4 from "../../assets/support.png";
import { Row, Col, Card } from "react-bootstrap";

export default function CardOne() {
  const features = [
    {
      id: 1,
      logo: icon1,
      title: "Best Price Guarantee",
      desc: "A small river named Duren flows by their place and supplies",
    },
    {
      id: 2,
      logo: icon2,
      title: "Travellers Love Us",
      desc: " ver named Duren flows by their place and supplies",
    },
    {
      id: 3,
      logo: icon3,
      title: "Best Travel Agent",
      desc: "A small river named Duren flows by their place and supplies",
    },
    {
      id: 4,
      logo: icon4,
      title: "Our Dedicated Support",
      desc: "A small river named Duren flows by their place and supplies",
    },
  ];

  return (
    <Row>
      {features.map((feature) => (
        <Col sm={3} className="mb-3" key={feature.id}>
          <Card
            style={{ width: "16rem", height: 250 }}
            className="text-center align-card"
          >
            <Card.Body>
              <img src={feature.logo} />
              <Card.Title>{feature.title}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                {feature.desc}
              </Card.Subtitle>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}
