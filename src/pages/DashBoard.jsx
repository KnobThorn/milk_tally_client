import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { Navigate } from "react-router-dom";

export default function DashBoard() {
  const [data, setData] = useState({});
  const fetchRecords = () => {};
  useEffect(() => {
    axios
      .post("http://localhost:3001/verify", {
        token: localStorage.getItem("memberToken"),
      })
      .then((res) => {
        console.log(res);
        if (res.data.login) {
          setData(res.data.member);
        } else Navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="w-3/4 mx-auto my-10 ">
      <h2 className="text-center font-bold text-2xl">Below are your Tallies</h2>
      <div className="flex justify-center">
        <Table>
          <tbody>
            <tr>
              <th>Morning</th>
              <th>Evenning</th>
              <th>Total</th>
              <th>Morning</th>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  );
}
