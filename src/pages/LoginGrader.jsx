import { useState } from "react";

import { Link, Navigate, useNavigate } from "react-router-dom";

import axios from "axios";
import "../App.css";

const LoginGrader = () => {
  //   axios.defaults.withCredentials = true;
  const [inputs, setInputs] = useState({});
  const navigate = useNavigate();
  const [messages, setMessages] = useState("");
  const [response, setResponse] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(inputs);
    axios
      .post("http://localhost:3001/login/grader", inputs)
      .then((res) => {
        console.log(res.data);
        if (res.data.authenticated) {
          localStorage.setItem("graderToken", res.data.token);
          setMessages(res.data.msg);
          navigate("/grade");
        } else {
          setMessages(res.data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  return (
    <>
      <div className="text-2xl text-red-500 text-center">{messages} </div>
      <div className="bg-gray-100 my-10 flex items-center justify-center">
        <div className="bg-white p-8 rounded shadow-md">
          <h2 className="text-xl font-bold mb-4">Grader Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block font-medium mb-2">
                Name
              </label>
              <input
                type="text"
                name="login_grader_name"
                value={inputs.login_grader_name || ""}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="id" className="block font-medium mb-2">
                ID
              </label>
              <input
                id="id"
                name="login_grader_id"
                value={inputs.login_grader_id || ""}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block font-medium mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                name="login_grader_password"
                value={inputs.login_grader_password || ""}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Sign In
            </button>
            <div className=" p-2 m-4">
              <a className="font-bold" href="/">
                Am a Member
              </a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginGrader;
