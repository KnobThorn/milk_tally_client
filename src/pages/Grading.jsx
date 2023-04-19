import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

export default function Grading() {
  const [tally, setTally] = useState();
  const [time, setTime] = useState();
  const [grader, setGrader] = useState({});
  const [member, setMember] = useState();
  // const [collection_center_id, setCollection] = useState();
  const navigate = useNavigate();
  const [messages, setMessages] = useState();

  useEffect(() => {
    axios
      .post("http://localhost:3001/member/verify", {
        token: localStorage.getItem("graderToken"),
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.login) {
          setGrader(res.data.member);
        } else Navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(grader);
    if (time == null || tally == null || member == null){
      setMessages("Some values are empty")
    }
    else{
    const tallies = {
      tally_time: time,
      member_number: member,
      tally: tally,
      // collection_center_id: collection_center_id,
      grader_id: grader.member_id,
    };
    axios
      .post("http://localhost:3001/grade", tallies)
      .then((res) => {
        console.log(res);
        if (res.data.graded) {
          setMessages(res.data.msg);

        } else {
          setMessages(res.data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    }
  };
  return (
    <div className="bg-slate-300 h-screen">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-100">
        <div className="mr-4">
          <span className="font-bold">{grader.user_name}</span>
          <span className="text-gray-500"> (ID: {grader.member_id})</span>
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            navigate("/");
          }}>
          Logout
        </button>
      </div>
      <h2 className="font-bold  p-2 m-3 text-2xl">Fill in the Form Below</h2>
      <h3 className="text-2xl text-green font-bold p-2 m-3">{messages}</h3>
      <form onSubmit={handleSubmit} className="m-4 p-4 border-2 w-1/3 mx-auto bg-white">
        <div className="m-3 p-2 text-center">
          <input
            type="text"
            placeholder="Enter Member Id"
            className="p-2 text-xl  w-full text-center border-black border-2 "
            onChange={(e) => {
              setMember(e.target.value);
            }}
          />
        </div>
        <div  className="m-3 p-2 text-center">
          <input
            type="number"
            placeholder="Enter the tally"
            className="p-2 text-xl  w-full  text-center border-black border-2"
            onChange={(e) => {
              setTally(e.target.value);
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
            className="p-2 w-full text-xl text-center border-black border-2">
            <option>select</option>
            <option>morning</option>
            <option>evening</option>
          </select>
        </div>
        <div className="m-3 p-2">
          <button className="w-full p-2 bg-blue-600 text-xl  text-white font-bold">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
