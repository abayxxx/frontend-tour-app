import React, { useState, useEffect } from "react";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
import axios from "axios";
import { useQuery, useMutation } from "react-query";
import { Container, Row, Col, Form, Alert, Button } from "react-bootstrap";

export default function FormAdmin() {
  //Handle Add Trip
  const [trip, setTrip] = useState({
    title: "",
    accomodation: "",
    transportation: "",
    eat: "",
    day: 0,
    night: 0,
    dateTrip: "",
    price: 0,
    quota: 0,
    description: "",
    image: null,
    countryId: 0,
  });
  const [option, setOption] = useState(0);

  const handleChangeOption = (e) => {
    setOption(e.target.value);
  };

  const addTrip = async () => {
    const result = await axios.post("http://localhost:5000/api/v1/trip", {
      title: trip.title,
      accomodation: trip.accomodation,
      transportation: trip.transportation,
      eat: trip.eat,
      day: trip.day,
      night: trip.night,
      dateTrip: trip.dateTrip,
      price: trip.price,
      quota: trip.quota,
      description: trip.description,
      image: filePath,
      countryId: option,
    });

    return result;
  };

  const [handleAddTrip, { status, data: tripData, errorData }] = useMutation(
    addTrip,
    {
      onSuccess: () => {
        setFileName("");
        setSuccessFile("");
        setTrip({
          title: "",
          accomodation: "",
          transportation: "",
          eat: "",
          day: 0,
          night: 0,
          dateTrip: "",
          price: 0,
          quota: 0,
          description: "",
          image: null,
          countryId: "",
        });
      },
    }
  );

  useEffect(() => {
    window.scroll(0, 0);
  }, [status]);

  const handleChangeTrip = (e) => {
    setTrip({ ...trip, [e.target.name]: e.target.value });
  };

  const handleSubmitTrip = (e) => {
    e.preventDefault();
    handleAddTrip();
  };

  //Handle Countries
  const fetchCountry = async () => {
    const response = await axios.get(`http://localhost:5000/api/v1/country`);

    return response.data.data.country;
  };

  const { isLoading, isError, data, error } = useQuery("user", fetchCountry);

  //Handle File Upload
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

  if (isLoading) {
    return <p>Loading.....</p>;
  }

  return (
    <div>
      <Header />
      <Container>
        <Row>
          <div className="text con-add" style={{ top: 100, left: 130 }}>
            <p>Add Trip</p>
          </div>
          {status === "success" ? (
            <Alert
              variant="success"
              style={{
                position: "absolute",
                left: 270,
                top: 110,
              }}
            >
              Success Added Trip !!
            </Alert>
          ) : (
            ""
          )}

          <Col xs={{ span: 10, offset: 2 }} style={{ marginTop: 50 }}>
            <Form>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label className="text-form">Title Trip</Form.Label>
                <Form.Control
                  type="text"
                  value={trip.title}
                  onChange={(e) => handleChangeTrip(e)}
                  name="title"
                />
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label className="text-form">Country</Form.Label>
                <Form.Control
                  as="select"
                  onChange={(e) => handleChangeOption(e)}
                >
                  <option value="" disabled>
                    Select Country
                  </option>
                  {data.map((country, key) => (
                    <option key={key} value={country.id}>
                      {country.name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label className="text-form">Acomodation</Form.Label>
                <Form.Control
                  type="text"
                  value={trip.accomodation}
                  onChange={(e) => handleChangeTrip(e)}
                  name="accomodation"
                />
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label className="text-form">Transportation</Form.Label>
                <Form.Control
                  type="text"
                  value={trip.transportation}
                  onChange={(e) => handleChangeTrip(e)}
                  name="transportation"
                />
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label className="text-form">Eat</Form.Label>
                <Form.Control
                  type="text"
                  value={trip.eat}
                  onChange={(e) => handleChangeTrip(e)}
                  name="eat"
                />
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label className="text-form">Duration</Form.Label>

                <Form.Control
                  type="text"
                  style={{ width: 200 }}
                  value={trip.day}
                  onChange={(e) => handleChangeTrip(e)}
                  name="day"
                />
                <p
                  style={{ position: "absolute", left: 230, top: 500 }}
                  className="text-form"
                >
                  Day
                </p>
                <Form.Control
                  type="text"
                  style={{
                    width: 200,
                    position: "absolute",
                    left: 300,
                    top: 496,
                  }}
                  value={trip.night}
                  onChange={(e) => handleChangeTrip(e)}
                  name="night"
                />
                <p
                  style={{ position: "absolute", left: 510, top: 500 }}
                  className="text-form"
                >
                  Night
                </p>
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label className="text-form">Date Trip</Form.Label>
                <Form.Control
                  type="date"
                  value={trip.dateTrip}
                  onChange={(e) => handleChangeTrip(e)}
                  name="dateTrip"
                />
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label className="text-form">Price</Form.Label>
                <Form.Control
                  type="number"
                  value={trip.price}
                  onChange={(e) => handleChangeTrip(e)}
                  name="price"
                />
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label className="text-form">Quota</Form.Label>
                <Form.Control
                  type="number"
                  value={trip.quota}
                  onChange={(e) => handleChangeTrip(e)}
                  name="quota"
                />
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label className="text-form">Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows="3"
                  value={trip.description}
                  onChange={(e) => handleChangeTrip(e)}
                  name="description"
                />
              </Form.Group>
              <Form.Group>
                <p className="text-form">Image</p>

                <Form.File id="formcheck-api-regular">
                  <Form.File.Label>
                    <img
                      src="https://icon-library.net/images/upload-photo-icon/upload-photo-icon-21.jpg"
                      style={{ width: 100, height: 80 }}
                    />
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
                  style={{
                    position: "absolute",
                    top: 1045,
                    left: 150,
                  }}
                  onClick={(e) => onSubmitFile(e)}
                >
                  Upload
                </button>
              </Form.Group>
              <Button
                variant="warning"
                type="submit"
                className="btn-form"
                style={{
                  width: 200,
                  position: "absolute",
                  left: 410,
                  marginTop: 80,
                }}
                onClick={(e) => handleSubmitTrip(e)}
              >
                Add Trip
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
}
