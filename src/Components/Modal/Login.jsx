import React, { useState, useContext } from "react";
import logo from "../../assets/palm.png";
import logo2 from "../../assets/hibiscus.png";
import { ContextUser } from "../Context/ContextUser";

import axios from "axios";
import { useMutation } from "react-query";
import { Button, Modal, Form, Alert } from "react-bootstrap";

export default function Login() {
  const [show, setShow] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const { setContextUser } = useContext(ContextUser);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const checkUser = async () => {
    const response = await axios.post("http://localhost:5000/api/v1/login", {
      email: user.email,
      password: user.password,
    });
    localStorage.setItem("token", response.data.data.token);
    return response;
  };

  const [handleLogin, { status }] = useMutation(checkUser, {
    onSuccess: () => {
      setContextUser(true);
      localStorage.removeItem("admintoken");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin();
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="light" onClick={handleShow} className="Btn3">
        Login
      </Button>

      <Modal show={show} onHide={handleClose} keyboard={false}>
        <Modal.Body>
          <img src={logo} className="leaf" />
          <img src={logo2} className="hibiscus" />
          <div className="text text-center">
            <p>Login</p>
          </div>
          {status === "error" ? (
            <Alert variant="warning">Check your email or password!!</Alert>
          ) : (
            ""
          )}
          <Form>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label className="TextF">Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email"
                value={user.email}
                onChange={(e) => handleChange(e)}
                name="email"
              />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlInput2">
              <Form.Label className="TextF">Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={user.password}
                onChange={(e) => handleChange(e)}
                name="password"
              />
            </Form.Group>
            <div className="text-center mt-5">
              <Button
                type="submit"
                variant="warning"
                className="btn-form"
                onClick={(e) => handleSubmit(e)}
              >
                Login
              </Button>
            </div>
          </Form>
        </Modal.Body>
        <div className="text-center mb-4">Don't have an account? Here</div>
      </Modal>
    </>
  );
}
