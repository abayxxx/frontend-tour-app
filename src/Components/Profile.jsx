import React from "react";
import ivector1 from "../assets/vector/ivector1.png";
import ivector2 from "../assets/vector/ivector2.png";
import ivector3 from "../assets/vector/ivector3.png";
import ivector4 from "../assets/vector/ivector4.png";
import luffy2 from "../assets/luffy2.jpg";
import Header from "./Layout/Header";
import Footer from "./Layout/Footer";
import logo from "../assets/iconPay.png";

import { Row, Col, Container, Button } from "react-bootstrap";
import jwt from "jsonwebtoken";
import Axios from "axios";
import { useQuery } from "react-query";

export default function Profile() {
  const user = jwt.decode(localStorage.getItem("token"));

  const fetchUser = async () => {
    const response = await Axios.get(
      `http://localhost:5000/api/v1/user/${user.id}`
    );

    return response.data.data.users;
  };

  const { isLoading, data } = useQuery("user", fetchUser);

  const fetchTrip = async () => {
    const response = await Axios.get(
      `http://localhost:5000/api/v1/transaction/${user.id}`
    );

    return response.data.data.transaction;
  };

  const { isLoading: loadTrans, data: transData } = useQuery(
    "approved",
    fetchTrip
  );

  if (!transData && loadTrans) {
    return <p>Loading.....</p>;
  }

  if (isLoading && !data) {
    return <p>Loading.....</p>;
  }

  return (
    <>
      <Header />
      <Container>
        <Row>
          <Col xs={{ span: 10, offset: 2 }}>
            <div className="container-profile">
              <div style={{ marginLeft: 35 }} className="text-pay">
                Personal info
              </div>

              <div
                className="text-prof text-pay"
                style={{
                  fontSize: 20,
                  lineHeight: 1,
                  top: 20,
                  left: 50,
                  marginBottom: 30,
                }}
              >
                <img
                  src={ivector1}
                  style={{ height: 30, marginRight: 10, width: 30 }}
                ></img>
                {data.fullName}
                <p
                  className="text-secondary"
                  style={{ marginLeft: 40, marginTop: -5, fontSize: 15 }}
                >
                  Full Name
                </p>
              </div>

              <div
                className="text-prof text-pay"
                style={{
                  fontSize: 20,
                  lineHeight: 1,
                  top: 20,
                  left: 50,
                  marginBottom: 30,
                }}
              >
                <img
                  src={ivector2}
                  style={{ height: 30, marginRight: 10, width: 30 }}
                ></img>
                {data.email}
                <p
                  className="text-secondary"
                  style={{ marginLeft: 40, marginTop: -5, fontSize: 15 }}
                >
                  Email
                </p>
              </div>

              <div
                className="text-prof text-pay"
                style={{
                  fontSize: 20,
                  lineHeight: 1,
                  top: 20,
                  left: 50,
                  marginBottom: 30,
                }}
              >
                <img
                  src={ivector3}
                  style={{ height: 30, marginRight: 10, width: 30 }}
                ></img>
                {data.phone}
                <p
                  className="text-secondary"
                  style={{ marginLeft: 40, marginTop: -5, fontSize: 15 }}
                >
                  Mobile Phone
                </p>
              </div>

              <div
                className="text-prof text-pay"
                style={{
                  fontSize: 20,
                  lineHeight: 1,
                  top: 20,
                  left: 50,
                  marginBottom: 30,
                }}
              >
                <img
                  src={ivector4}
                  style={{ height: 30, marginRight: 10, width: 30 }}
                ></img>
                {data.address}
                <p
                  className="text-secondary"
                  style={{ marginLeft: 40, marginTop: -5, fontSize: 15 }}
                >
                  Address
                </p>
              </div>
              <div>
                <img
                  src={luffy2}
                  className="img-profile"
                  style={{ height: 350, left: 470, top: -330, width: 300 }}
                ></img>
                <Button
                  variant="warning"
                  className="btn-form img-profile"
                  style={{ top: -120, width: 300, left: 170 }}
                >
                  Change Photo Profile
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      <p
        className="text-pay"
        style={{
          position: "absolute",
          left: 100,
          top: 680,
        }}
      >
        History Trip
      </p>
      <Container>
        <Row>
          {transData
            .filter((stat) => stat.status === "Approved")
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
                  <p
                    className="text-pay3 text-sec"
                    style={{ top: 290, background: "green" }}
                  >
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
    </>
  );
}
