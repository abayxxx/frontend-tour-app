import React from "react";
import Header from "./Layout/Header";
import Footer from "./Layout/Footer";
import logo from "../assets/iconPay.png";
import { Row, Col, Container } from "react-bootstrap";

import { useQuery } from "react-query";
import axios from "axios";
import jwt from "jsonwebtoken";

export default function PaymentConfirmed() {
  const user = jwt.decode(localStorage.getItem("token"));

  const fetchTransaction = async () => {
    const response = await axios.get(
      `http://localhost:5000/api/v1/transaction/${user.id}`
    );

    return response.data.data.transaction;
  };

  const { isLoading, isError, data, error } = useQuery(
    "waiting",
    fetchTransaction
  );

  if (isLoading) {
    return <p>Loading.....</p>;
  }

  if (error) {
    return <p>error</p>;
  }

  return (
    <div>
      <Header />

      <Container>
        <Row>
          {data
            .filter((data) => data.status === "Waiting Approve")
            .map((trans) => (
              <Col xs={{ span: 11, offset: 1 }} key={trans.id}>
                <div className="container-payment">
                  <img src={logo} className="img-payment" />
                  <div className="text-pay" style={{ marginLeft: 170 }}>
                    Booking
                    <p className="text-secondary text-pay2">
                      Saturday, 22 Juy 2020
                    </p>
                  </div>
                  {console.log(trans)}
                  <div className="text-pay3">
                    {trans.trip.title}
                    <p className="text-pay2">{trans.trip.country.name}</p>
                  </div>
                  <div
                    className="text-pay3"
                    style={{ left: 500, fontSize: 20 }}
                  >
                    Date Trip
                    <p className="text-pay2">{trans.trip.dateTrip}</p>
                  </div>
                  <div
                    className="text-pay3"
                    style={{ left: 700, fontSize: 20 }}
                  >
                    Duration
                    <p className="text-pay2">{`${trans.trip.day} Day ${trans.trip.night} Night`}</p>
                  </div>
                  <img
                    src={process.env.PUBLIC_URL + `${trans.attachment}`}
                    className="text-pay3"
                    style={{
                      left: 1060,
                      fontSize: 20,
                      width: 180,
                      height: 180,
                    }}
                  />
                  <p className="text-pay3 text-sec" style={{ top: 290 }}>
                    {trans.status}
                  </p>
                  <div
                    className="text-pay3"
                    style={{ left: 500, fontSize: 20, top: 290 }}
                  >
                    Accomodation
                    <p className="text-pay2">{trans.trip.accomodation}</p>
                  </div>
                  <div
                    className="text-pay3"
                    style={{ left: 700, fontSize: 20, top: 290 }}
                  >
                    Transportation
                    <p className="text-pay2">{trans.trip.transportation}</p>
                  </div>

                  <p
                    className="text-pay3"
                    style={{ left: 600, fontSize: 20, top: 400 }}
                  >
                    Phone
                  </p>
                  <p
                    className="text-pay3"
                    style={{ left: 330, fontSize: 20, top: 400 }}
                  >
                    Email
                  </p>
                  <p
                    className="text-pay3"
                    style={{ left: 150, fontSize: 20, top: 400 }}
                  >
                    Full Name
                  </p>
                  <p
                    className="text-pay3"
                    style={{ left: 60, fontSize: 20, top: 400 }}
                  >
                    No
                  </p>
                  <hr
                    className="line2 line"
                    style={{ left: 19, top: 420, width: 1240 }}
                  />

                  <p
                    className="text-pay3 text-secondary"
                    style={{
                      left: 600,
                      fontSize: 20,
                      top: 440,
                      fontWeight: "normal",
                    }}
                  >
                    {trans.user.phone}
                  </p>

                  <p
                    className="text-pay3 text-secondary"
                    style={{
                      left: 330,
                      fontSize: 20,
                      top: 440,
                      fontWeight: "normal",
                    }}
                  >
                    {trans.user.email}
                  </p>
                  <p
                    className="text-pay3 text-secondary"
                    style={{
                      left: 150,
                      fontSize: 20,
                      top: 440,
                      fontWeight: "normal",
                    }}
                  >
                    {trans.user.fullName}
                  </p>
                  <p
                    className="text-pay3 text-secondary"
                    style={{
                      left: 60,
                      fontSize: 20,
                      top: 440,
                      fontWeight: "normal",
                    }}
                  >
                    1
                  </p>
                  <hr
                    className="line2 line"
                    style={{ left: 19, top: 460, width: 1240 }}
                  />

                  <p
                    className="text-pay3"
                    style={{ left: 920, fontSize: 20, top: 440 }}
                  >
                    Qty
                  </p>
                  <p
                    className="text-pay3"
                    style={{ left: 920, fontSize: 20, top: 490 }}
                  >
                    Total
                  </p>
                  <p
                    className="text-pay3"
                    style={{ left: 1120, fontSize: 20, top: 440 }}
                  >
                    :{trans.counterQty}
                  </p>
                  <p
                    className="text-pay3"
                    style={{
                      left: 1120,
                      fontSize: 20,
                      top: 490,
                      color: "red",
                    }}
                  >
                    {`:${trans.total}`}
                  </p>
                </div>
              </Col>
            ))}
        </Row>
      </Container>

      <Footer />
    </div>
  );
}
