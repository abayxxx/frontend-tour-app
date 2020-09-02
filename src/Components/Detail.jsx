import React, { useState, useEffect } from "react";
import Header from "./Layout/Header";
import Footer from "./Layout/Footer";

import bg1 from "../assets/bg1.png";
import bg2 from "../assets/bg2.png";
import bg3 from "../assets/bg3.png";
import icon1 from "../assets/vector/vector1.png";
import icon2 from "../assets/vector/vector2.png";
import icon3 from "../assets/vector/vector3.png";
import icon4 from "../assets/vector/vector4.png";
import icon5 from "../assets/vector/vector5.png";
import { Button, Row, Col } from "react-bootstrap";
import { Route, Link, useParams } from "react-router-dom";
import axios from "axios";
import { useQuery } from "react-query";

export default function Detail() {
  const [count, setCount] = useState(1);
  const [price, setPrice] = useState(0);

  const handleCountPlus = () => {
    if (count === detailTrip.quota) {
      return false;
    } else {
      setCount(count + 1);
      setPrice(price + detailTrip.price);
    }
  };

  const handleCountMinus = () => {
    if (count === 1) {
      return false;
    } else {
      setCount(count - 1);
      setPrice(price - detailTrip.price);
    }
  };

  let { id } = useParams();

  const getDetailTrip = async () => {
    const response = await axios.get(`http://localhost:5000/api/v1/trip/${id}`);
    setPrice(response.data.data.trip.price);
    return response.data.data.trip;
  };

  const { isLoading, isError, data: detailTrip, error } = useQuery(
    "detailTrip",
    getDetailTrip
  );

  useEffect(() => {
    window.scroll(0, 0);
  }, [isLoading]);

  if (isLoading) {
    return <p>Loading.....</p>;
  }

  console.log(detailTrip.quota);
  const data = [
    {
      id: 1,
      title: detailTrip.accomodation,
      pict: icon1,
    },
    {
      id: 2,
      title: detailTrip.transportation,
      pict: icon2,
    },
    {
      id: 3,
      title: detailTrip.eat,
      pict: icon3,
    },
    {
      id: 4,
      title: `${detailTrip.day} Day ${detailTrip.night} Night`,
      pict: icon4,
    },
    {
      id: 5,
      title: detailTrip.dateTrip,
      pict: icon5,
    },
  ];

  return (
    <div>
      <Header />
      <div className="text-detail" style={{ marginLeft: 200 }}>
        <p className="text">{detailTrip.title}</p>
        <span className="text-secondary text-s">{detailTrip.country.name}</span>
      </div>

      <div className="container-detail">
        <Row>
          <Col xs={{ span: 11, ofsset: 1 }}>
            <img
              src={process.env.PUBLIC_URL + `${detailTrip.image}`}
              style={{ width: 1000, height: 400, marginLeft: 200 }}
            ></img>
          </Col>
        </Row>
        <div className="i-detail">
          <img src={bg3} style={{ width: 330, marginRight: 5 }}></img>
          <img src={bg2} style={{ width: 330, marginRight: 5 }}></img>
          <img src={bg1} style={{ width: 330, marginRight: 5 }}></img>
        </div>
      </div>
      <div className="text-ds">
        <p className="text-d">Information Trip</p>

        <div className="text-center container-icon">
          {data.map((data) => (
            <>
              <img src={data.pict} style={{ height: 25 }} />
              <p style={{ marginRight: 75, marginLeft: 6 }}>{data.title}</p>
            </>
          ))}
        </div>

        <div>
          <p className="text-d">Description</p>
          <p
            className="text-d text-secondary"
            style={{ marginTop: 0, width: 1000 }}
          >
            {detailTrip.description}
          </p>
        </div>
        <div className="text-p">
          <Row>
            <Col xs={9}>
              <p className="text-d" style={{ color: "#FFAF00" }}>
                IDR. {detailTrip.price}
                <span className="text-d" style={{ marginLeft: 10 }}>
                  / Person
                </span>
              </p>
            </Col>
            <Col xs={3}>
              <div className="btn-k">
                <Button
                  className="btn btn-md btn-warning"
                  style={{ marginTop: 30, marginLeft: 45 }}
                  onClick={handleCountMinus}
                >
                  -
                </Button>
                <span style={{ marginTop: 35, marginLeft: 5, marginRight: 5 }}>
                  {count}
                </span>
                <Button
                  className="btn btn-md btn-warning"
                  style={{ marginTop: 30 }}
                  onClick={handleCountPlus}
                >
                  +
                </Button>
              </div>
            </Col>
          </Row>
        </div>
        <hr className="text-d line" style={{ marginTop: 0, width: 1000 }} />
        <Row>
          <Col xs={9}>
            <p className="text-d " style={{ marginTop: 0 }}>
              Total :
            </p>
          </Col>
          <Col xs={3}>
            <div className="btn-k">
              <p
                className="text-d"
                style={{
                  color: "#FFAF00",
                  marginLeft: 0,
                  marginTop: 0,
                  display: "inline",
                }}
              >
                IDR. {price}
              </p>
            </div>
          </Col>
        </Row>
        <hr className="text-d line" style={{ marginTop: 0, width: 1000 }} />
        <Row>
          <Col xs={{ span: 3, offset: 9 }}>
            <Route>
              <Link to={`/payment-method/${id}/${count}`}>
                <Button
                  variant="warning"
                  className="text-d"
                  style={{
                    color: "white",
                    marginTop: 0,
                    marginLeft: 0,
                  }}
                >
                  BOOK NOW
                </Button>
              </Link>
            </Route>
          </Col>
        </Row>
      </div>

      <Footer />
    </div>
  );
}
