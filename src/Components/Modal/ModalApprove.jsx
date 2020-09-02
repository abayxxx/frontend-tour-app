import React, { useState } from "react";
import logo from "../../assets/palm.png";
import avector from "../../assets/vector/avector.png";
import axios from "axios";
import { useMutation } from "react-query";

import { Button, Modal, ModalBody } from "react-bootstrap";

export default function ModalApprove({ dataTrans }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [statusPayment, setStatusPayment] = useState({
    status: "",
  });

  const updateStatus = async () => {
    const token = localStorage.getItem("admintoken");

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.patch(
      `http://localhost:5000/api/v1/transaction/${dataTrans.id}`,
      {
        status: statusPayment,
      },
      config
    );

    return response;
  };

  const [handleUpdate, { status: statusSuccess, data }] = useMutation(
    updateStatus,
    {
      onSuccess: () => {
        handleClose();
      },
    }
  );

  console.log(data);
  const handleSubmit = (e) => {
    setStatusPayment("Approved");
    handleUpdate();
  };

  const color = (status) => {
    let layout;

    if (status == "Approved") {
      layout = "green";
    } else if (status == "Waiting Approve") {
      layout = "orange";
    } else {
      layout = "red";
    }

    return layout;
  };

  return (
    <>
      <div onClick={handleShow}>
        <img src={avector} onClick={handleShow} alt="avector" />
      </div>

      <Modal show={show} onHide={handleClose} scrollable size="xl">
        <ModalBody style={{ height: 600 }}>
          <img
            alt="logo1"
            src={logo}
            className="img-payment"
            style={{ position: "absolute", left: 0, top: 0 }}
          />
          <div
            className="text-pay"
            style={{ position: "absolute", left: 30, top: 50 }}
          >
            Booking
            <p className="text-secondary text-pay2">Saturday, 22 Juy 2020</p>
          </div>
          <div
            style={{
              position: "relative",
              left: 10,
            }}
          >
            <div className="text-pay3" style={{ left: 0 }}>
              {dataTrans.trip.title}
              <p className="text-pay2">{dataTrans.trip.country.name}</p>
            </div>
            <div className="text-pay3" style={{ left: 380, fontSize: 20 }}>
              Date Trip
              <p className="text-pay2">{dataTrans.trip.dateTrip}</p>
            </div>
            <div className="text-pay3" style={{ left: 580, fontSize: 20 }}>
              Duration
              <p className="text-pay2">{`${dataTrans.trip.day} Day ${dataTrans.trip.night} Night`}</p>
            </div>
            <img
              alt="struk"
              src={process.env.PUBLIC_URL + `${dataTrans.attachment}`}
              className="text-pay3"
              style={{ left: 860, fontSize: 20, width: 180, height: 180 }}
            />
            <p
              className="text-pay3 text-sec"
              style={{ top: 250, left: 0, background: color(dataTrans.status) }}
            >
              {dataTrans.status}
            </p>
            <div
              className="text-pay3"
              style={{ left: 380, fontSize: 20, top: 230 }}
            >
              Accomodation
              <p className="text-pay2">{dataTrans.trip.accomodation}</p>
            </div>
            <div
              className="text-pay3"
              style={{ left: 580, fontSize: 20, top: 230 }}
            >
              Transporartion
              <p className="text-pay2">{dataTrans.trip.transportation}</p>
            </div>

            <p
              className="text-pay3"
              style={{ left: 520, fontSize: 20, top: 330 }}
            >
              Phone
            </p>
            <p
              className="text-pay3"
              style={{ left: 260, fontSize: 20, top: 330 }}
            >
              Email
            </p>
            <p
              className="text-pay3"
              style={{ left: 100, fontSize: 20, top: 330 }}
            >
              Full Name
            </p>
            <p
              className="text-pay3"
              style={{ left: 0, fontSize: 20, top: 330 }}
            >
              No
            </p>
            <hr
              className="line2 line"
              style={{ left: 0, top: 350, width: 1040 }}
            />

            <p
              className="text-pay3 text-secondary"
              style={{
                left: 520,
                fontSize: 20,
                top: 370,
                fontWeight: "normal",
              }}
            >
              {dataTrans.user.phone}
            </p>

            <p
              className="text-pay3 text-secondary"
              style={{
                left: 260,
                fontSize: 20,
                top: 370,
                fontWeight: "normal",
              }}
            >
              {dataTrans.user.email}
            </p>
            <p
              className="text-pay3 text-secondary"
              style={{
                left: 100,
                fontSize: 20,
                top: 370,
                fontWeight: "normal",
              }}
            >
              {dataTrans.user.fullName}
            </p>
            <p
              className="text-pay3 text-secondary"
              style={{
                left: 0,
                fontSize: 20,
                top: 370,
                fontWeight: "normal",
              }}
            >
              1
            </p>
            <hr
              className="line2 line"
              style={{ left: 0, top: 390, width: 1040 }}
            />

            <p
              className="text-pay3"
              style={{ left: 720, fontSize: 20, top: 370 }}
            >
              Qty
            </p>
            <p
              className="text-pay3"
              style={{ left: 720, fontSize: 20, top: 420 }}
            >
              Total
            </p>
            <p
              className="text-pay3"
              style={{ left: 920, fontSize: 20, top: 370 }}
            >
              : {dataTrans.counterQty}
            </p>
            <p
              className="text-pay3"
              style={{ left: 920, fontSize: 15, top: 420, color: "red" }}
            >
              : IDR. {dataTrans.total}
            </p>
            <div
              style={{
                position: "absolute",
                left: 800,
                top: 500,
              }}
            >
              <Button variant="danger" onClick={handleClose} className="Btn3">
                Cancel
              </Button>
              <Button
                variant="success"
                className="Btn3"
                onClick={(e) => handleSubmit(e)}
              >
                Approve
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
}
