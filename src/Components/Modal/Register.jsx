import React, { useState, useContext } from "react";
import logo from "../../assets/palm.png";
import logo2 from "../../assets/hibiscus.png";
import { Button, Modal, Form, Alert } from "react-bootstrap";
import { ContextUser } from "../Context/ContextUser";
import axios from "axios";
import { useMutation } from "react-query";

export default function Register() {
  const { setContextUser } = useContext(ContextUser);
  const [show, setShow] = useState(false);
  const [register, setRegister] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: null,
    address: "",
  });

  const registerUser = async () => {
    const data = await axios.post("http://localhost:5000/api/v1/register", {
      fullName: register.fullName,
      email: register.email,
      password: register.password,
      phone: register.phone,
      address: register.address,
    });
    localStorage.setItem("token", data.data.data.token);
    return data;
  };

  const [handleRegister, { status, data, error }] = useMutation(registerUser, {
    onSuccess: () => {
      setRegister({
        fullName: "",
        email: "",
        password: "",
        phone: "",
        address: "",
      });
      setContextUser(true);
    },
  });

  const handleChange = (e) => {
    setRegister({ ...register, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegister();
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="warning" onClick={handleShow} className="Btn3">
        Register
      </Button>

      <Modal show={show} onHide={handleClose} scrollable={true}>
        <Modal.Body>
          <img src={logo} className="leaf" />
          <img src={logo2} className="hibiscus" />
          <div className="text-center text">
            <p>Register</p>
          </div>
          {status === "success" ? (
            <Alert variant="success" className="text-center">
              Success Register
            </Alert>
          ) : (
            ""
          )}
          <Form onSubmit={(e) => handleSubmit(e)}>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label className="TextF">Full Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Full Name"
                value={register.fullName}
                onChange={(e) => handleChange(e)}
                name="fullName"
              />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlInput2">
              <Form.Label className="TextF">Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email"
                value={register.email}
                onChange={(e) => handleChange(e)}
                name="email"
              />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlInput3">
              <Form.Label className="TextF">Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={register.password}
                onChange={(e) => handleChange(e)}
                name="password"
              />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlInput4">
              <Form.Label className="TextF">Phone</Form.Label>
              <Form.Control
                type="number"
                placeholder="Phone Number"
                value={register.phone}
                onChange={(e) => handleChange(e)}
                name="phone"
              />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlTextarea5">
              <Form.Label className="TextF">Address</Form.Label>
              <Form.Control
                as="textarea"
                rows="3"
                value={register.address}
                onChange={(e) => handleChange(e)}
                name="address"
              />
            </Form.Group>
            <div className="text-center mt-4 mb-2">
              <Button type="submit" variant="warning" className="btn-form">
                Register
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
