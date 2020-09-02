import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Link, Route } from "react-router-dom";

export default function ModalPayment(status) {
  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      \
      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          Your payment will be confirmed within 1 x 24 hours To see orders
          <Route>
            <Link to="/payment-confirmed"> click Here </Link>
          </Route>
          thank you
        </Modal.Body>
      </Modal>
    </>
  );
}
