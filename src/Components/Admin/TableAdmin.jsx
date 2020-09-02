import React from "react";
import { Table, Container } from "react-bootstrap";
import Footer from "../Layout/Footer";
import Header from "../Layout/Header";
import ModalApprove from "../Modal/ModalApprove";
import axios from "axios";
import { useQuery } from "react-query";

export default function TableAdmin() {
  const fetchTrip = async () => {
    const response = await axios.get(
      `http://localhost:5000/api/v1/transaction`
    );

    return response.data.data.transaction;
  };

  const { isLoading, data } = useQuery("transaction", fetchTrip);

  console.log(data);

  const transactions = [
    {
      id: 1,
      user: "Luffy",
      trip: "Grand Line",
      proof: "bca.jpg",
      status: "Approve",
    },
    {
      id: 2,
      user: "Zoro",
      trip: " 4D/2N Grand Line and West Blue",
      proof: "bni.jpg",
      status: "Pending",
    },
    {
      id: 3,
      user: "Sanji",
      trip: "6D/4N Grand Line and South Blue",
      proof: "bri.jpg",
      status: "Cancel",
    },
    {
      id: 4,
      user: "Nami",
      trip: "2D/1N Grand Line and East Blue",
      proof: "bca.jpg",
      status: "Pending",
    },
    {
      id: 5,
      user: "Ussop",
      trip: "7D/5N Red Line and West Blue",
      proof: "bri.jpg",
      status: "Approve",
    },
    {
      id: 6,
      user: "Chopper",
      trip: "4D/3N Overland Jakarta Barat",
      proof: "bca.jpg",
      status: "Cancel",
    },
  ];

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

  if (isLoading && !data) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Header />
      <Container className="container">
        <div className="table-container">
          <span className="text">Incoming Transaction</span>
          <Table striped borderless={true} hover>
            <thead>
              <tr>
                <th>No</th>
                <th>User</th>
                <th>Trip</th>
                <th>Bukti Transfer</th>
                <th>Status Payment</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((trans) => (
                <tr key={trans.id}>
                  <td>{trans.id}</td>
                  <td>{trans.user.fullName}</td>
                  <td
                    style={{
                      whiteSpace: "nowrap",
                    }}
                  >
                    {trans.trip.title}
                  </td>
                  <td
                    style={{
                      whiteSpace: "nowrap",
                    }}
                  >
                    {trans.attachment}
                  </td>
                  <td style={{ color: color(trans.status) }}>{trans.status}</td>
                  <td>
                    <ModalApprove dataTrans={trans} />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Container>
      <Footer />
    </div>
  );
}
