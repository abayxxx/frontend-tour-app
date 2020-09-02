import React, { useState, useContext } from "react";
import { Modal, Form, Button, Alert } from "react-bootstrap";
import logo from "../../assets/palm.png";
import logo2 from "../../assets/hibiscus.png";
import { ContextAdmin } from "../Context/ContextAdmin";
import axios from "axios";
import { useMutation } from "react-query";

export default function LoginForm() {
  const { setContextAdmin } = useContext(ContextAdmin);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const checkAdmin = async () => {
    const response = await axios.post("http://localhost:5000/api/v1/admin", {
      email: user.email,
      password: user.password,
    });
    localStorage.setItem("admintoken", response.data.data.token);
    return response;
  };

  const [handleLogin, { status }] = useMutation(checkAdmin, {
    onSuccess: () => {
      setContextAdmin(true);
      localStorage.removeItem("token");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin();
  };
  return (
    <div>
      <Modal show={true} keyboard={false}>
        <Modal.Body>
          <img src={logo} className="leaf" />
          <img src={logo2} className="hibiscus" />
          <div className="text text-center">
            <p>Admin Login</p>
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
        <div className="text-center mb-4"></div>
      </Modal>
    </div>
  );
}
