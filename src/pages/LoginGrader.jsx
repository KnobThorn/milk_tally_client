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
      <div className="text-2xl text-red text-center">{response} </div>
      <div className="Auth-form-container">
        <form className="Auth-form" onSubmit={handleSubmit}>
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Grader Sign In</h3>
            <div className="form-group mt-3">
              <input
                type="text"
                name="login_grader_name"
                value={inputs.login_grader_name || ""}
                onChange={handleChange}
                className="p-2 text-xl text-center"
                placeholder="Enter your member name"
              />
            </div>

            <div className="form-group mt-3">
              <input
                type="text"
                name="login_grader_id"
                value={inputs.login_grader_id || ""}
                onChange={handleChange}
                className="p-2 text-xl text-center"
                placeholder="Enter your member number"
              />
            </div>

            <div className="form-group mt-3">
              <input
                type="password"
                name="login_grader_password"
                value={inputs.login_grader_password || ""}
                onChange={handleChange}
                className="p-2 text-xl text-center"
                placeholder="Enter your password"
              />
            </div>
            <div className="m-3 p-2">
              <button className="w-1/2 p-2 bg-blue-600 text-xl  text-white font-bold">
                Login
              </button>
            </div>
            <p className="forgot-password text-right mt-2">
              Create <a href="/"> Are you a member?</a>
            </p>
            <p className="forgot-password text-right mt-2">
              <a href="/">back home?</a>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default LoginGrader;
