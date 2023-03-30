import axios from "axios";
import { response } from "express";
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export default function Grading() {
  const [tally, setTally] = useState();
  const [time, setTime] = useState();
  const [grader, setGrader] = useState();
  const [response, setResponse] = useState();
  const [member, setMember] = useState();
  const [collection_center_id, setCollection] = useState();
  const [messages, setMessages] = useState();

  useEffect(() => {
    axios
      .post("http://localhost:3001/grader/verify", {
        token: localStorage.getItem("graderToken"),
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.login) {
          setGrader(res.data.grader);
        } else Navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(grader);

    const tallies = {
      tally_time: time,
      member_number: member,
      tally: tally,
      collection_center_id: collection_center_id,
      grader_id: grader.grader_id,
    };
    axios
      .post("http://localhost:3001/grade", tallies)
      .then((res) => {
        console.log(res);
        if (res.data.graded) {
          setResponse(res.data.msg);
        } else {
          setResponse(res.data.messages);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <h2 className="font-bold  p-2 m-3 text-2xl">Fill in the Form Below</h2>
      <h3 className="text-2xl text-green font-bold p-2 m-3">{response}</h3>
      <form onSubmit={handleSubmit} className="m-4 p-4">
        <div className="m-3 p-2 text-center">
          <input
            type="text"
            placeholder="Enter Member Id"
            className="p-2 text-xl  w-1/4 text-center "
            onChange={(e) => {
              setMember(e.target.value);
            }}
          />
        </div>
        <div>
          <input
            type="number"
            placeholder="Enter the tally"
            className="p-2 text-xl  w-1/4  text-center"
            onChange={(e) => {
              setTally(e.target.value);
            }}
          />
        </div>

        <div className="m-3 p-3">
          <input
            type="text"
            placeholder="Enter the Collection center_id"
            className="p-2 text-xl  w-1/4  text-center"
            onChange={(e) => {
              setCollection(e.target.value);
            }}
          />
        </div>
        <div className="m-3 p-2 text-center">
          <select
            name="tally_time"
            id=""
            onChange={(e) => {
              setTime(e.target.value);
            }}
            className="p-2 w-1/4  text-xl text-center">
            <option>morning</option>
            <option>evening</option>
          </select>
        </div>
        <div className="m-3 p-2">
          <button className="w-1/4 p-2 bg-blue-600 text-xl  text-white font-bold">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
