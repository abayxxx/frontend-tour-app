import React, { useState } from "react";
import Header from "./Layout/Header";
import Footer from "./Layout/Footer";
import ModalPayment from "./Modal/ModalPayment";
import logo from "../assets/iconPay.png";
import { Row, Col, Container, Form, Button, Alert } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "axios";
import jwt from "jsonwebtoken";
import { useQuery, useMutation } from "react-query";

export default function Payment() {
  const { id, qty } = useParams();
  const [price, setPrice] = useState(0);

  const user = jwt.decode(localStorage.getItem("token"));

  //Handle Transaction
  const addTransaction = async () => {
    const token = localStorage.getItem("token");

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const data = await axios.post(
      "http://localhost:5000/api/v1/transaction",
      {
        counterQty: qty,
        total: price,
        status: "Waiting Approve",
        attachment: filePath,
        tripId: id,
        userId: user.id,
      },
      config
    );

    return data;
  };

  const [
    handleTransaction,
    { status: statusTrans, data: dataTrans, error: transError },
  ] = useMutation(addTransaction, {
    onSuccess: () => {},
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    handleTransaction();
  };

  //Hanlde User
  const fetchUser = async () => {
    const response = await axios.get(
      `http://localhost:5000/api/v1/user/${user.id}`
    );

    return response.data.data.users;
  };

  const { isLoading: userLoad, data: userData } = useQuery("user", fetchUser);

  //Handle Detail Trip
  const getDetailTrip = async () => {
    const response = await axios.get(`http://localhost:5000/api/v1/trip/${id}`);

    const totalPrice = response.data.data.trip.price * qty;
    setPrice(totalPrice);
    return response.data.data.trip;
  };

  const { isLoading, isError, data: detailTrip, error } = useQuery(
    "detailTrip",
    getDetailTrip
  );

  //Handle Upload File Payment
  const [file, setFile] = useState("");
  const [fileName, setFileName] = useState("");
  const [filePath, setFilePath] = useState("");
  const [successFile, setSuccessFile] = useState("");

  const onChangeFile = async (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  const onSubmitFile = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("trip", file);

    try {
      const data = await axios.post(
        "http://localhost:5000/api/v1/upload-image",
        formData,
        {
          "Content-Type": "multipart/form-data",
        }
      );

      setFilePath(data.data.filePath);
      if (data.status === 200) {
        setSuccessFile("Success Upload");
      } else {
        setSuccessFile("Failed Upload");
      }
    } catch (err) {}
  };

  if (userLoad) {
    return <p>Loading....</p>;
  }

  return (
    <div>
      <Header />
      {transError ? (
        <Alert variant="danger">Please insert your payment proof !!</Alert>
      ) : (
        ""
      )}
      <Container>
        <Row>
          <Col xs={{ span: 11, offset: 1 }}>
            <div className="container-payment">
              <img src={logo} className="img-payment" />
              <div className="text-pay" style={{ marginLeft: 170 }}>
                Booking
                <p className="text-secondary text-pay2">
                  Saturday, 22 Juy 2020
                </p>
              </div>

              <div className="text-pay3">
                {detailTrip.title}
                <p className="text-pay2">{detailTrip.country.name}</p>
              </div>
              <div className="text-pay3" style={{ left: 500, fontSize: 20 }}>
                Date Trip
                <p className="text-pay2">{detailTrip.dateTrip}</p>
              </div>
              <div className="text-pay3" style={{ left: 700, fontSize: 20 }}>
                Duration
                <p className="text-pay2">{`${detailTrip.day} Day ${detailTrip.night} Night`}</p>
              </div>

              <p
                className="text-pay3 text-sec"
                style={{ top: 290, background: "red" }}
              >
                Waiting Payment
              </p>
              <div
                className="text-pay3"
                style={{ left: 500, fontSize: 20, top: 290 }}
              >
                Accomodation
                <p className="text-pay2">{detailTrip.accomodation}</p>
              </div>
              <div
                className="text-pay3"
                style={{ left: 700, fontSize: 20, top: 290 }}
              >
                Transporartion
                <p className="text-pay2">{detailTrip.transportation}</p>
              </div>

              <div
                className="text-pay3 text-pay2"
                style={{ left: 1060, fontSize: 15, top: 180 }}
              >
                <Form.Group>
                  <Form.File id="formcheck-api-regular">
                    <Form.File.Label>
                      {successFile ? (
                        <img
                          src={process.env.PUBLIC_URL + `${filePath}`}
                          style={{ width: 180, height: 160 }}
                        />
                      ) : (
                        <img
                          src="https://icon-library.net/images/upload-photo-icon/upload-photo-icon-21.jpg"
                          style={{ width: 200, height: 170 }}
                        />
                      )}
                    </Form.File.Label>
                    <Form.File.Input
                      style={{ display: "none" }}
                      onChange={onChangeFile}
                    />
                  </Form.File>
                  {fileName}
                  {<p className="text-success">{successFile}</p>}
                  <button
                    type="submit"
                    className="btn badge badge-warning"
                    style={{ marginLeft: 35, marginTop: 0 }}
                    onClick={(e) => onSubmitFile(e)}
                  >
                    upload payment proof
                  </button>
                </Form.Group>
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
                {userData.phone}
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
                {userData.email}
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
                {userData.fullName}
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
                :{qty}
              </p>
              <p
                className="text-pay3"
                style={{ left: 1120, fontSize: 15, top: 490, color: "red" }}
              >
                :IDR.{price}
              </p>
            </div>

            <Button
              variant="warning"
              type="submit"
              className="text-pay3s"
              style={{
                position: "relative",
                left: 1050,
                fontSize: 17,
                top: 10,
                width: 200,
                color: "white",
              }}
              onClick={(e) => handleSubmit(e)}
            >
              PAY
            </Button>

            {statusTrans === "success" ? <ModalPayment /> : ""}
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
}
