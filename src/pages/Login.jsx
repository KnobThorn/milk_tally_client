import { useState } from "react";

import { Link, Navigate, useNavigate } from "react-router-dom";

import axios from "axios";

const Login = () => {
  axios.defaults.withCredentials = true;
  const [inputs, setInputs] = useState({});
  const [messages, setMessages] = useState("");
  const navigate = useNavigate();
  const [response, setResponse] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log(inputs);
    axios
      .post("http://localhost:3001/login", inputs)
      .then((res) => {
        console.log(res.data);
        if (res.data.authenticated && res.data.role == "member") {
          console.log("you are a member");
          localStorage.setItem("memberToken", res.data.token);
          navigate("/dashboard");
          setMessages(res.data.msg);
        } else if (res.data.authenticated && res.data.role == "grader") {
          localStorage.setItem("graderToken", res.data.token);
          console.log("you are a grader");
          navigate("/grade");
          setMessages(res.data.msg);
        } else if (res.data.authenticated && res.data.role == "admin") {
          localStorage.setItem("adminToken", res.data.token);
          console.log("you are a an admin");
          navigate("/admin");
          setMessages(res.data.msg);
        } else {
          setMessages(res.data.msg);
          console.log("you are not authenticated");
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
    <div className="w-4/4 px-10 py-1 mx-auto h-screen bg-slate-300 ">
      <div>
        <h2 className="uppercase font-bold py-10 font-mono text-2xl">
          Digital Produce Report Card
        </h2>
      </div>
      <div className="text-center  font-bold text-2xl   w-1/4 mx-auto bg-white text-red-600 px-2 py-4 ">
        {messages}
      </div>
      <div className="  w-1/4 mx-auto ">
        <div className="bg-white p-8 rounded shadow-md">
          <h2 className="text-xl font-bold mb-4"> Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-8">
              <input
                type="text"
                name="login_member_name"
                value={inputs.login_member_name || ""}
                onChange={handleChange}
                placeholder="Username"
                className="w-full border border-gray-300 text-center font-mono text-xl rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-8 ">
              <input
                id="id"
                name="login_member_id"
                value={inputs.login_member_id || ""}
                onChange={handleChange}
                placeholder="user id"
                className="w-full border border-gray-300 font-mono text-center text-xl rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-8">
              <input
                id="password"
                type="password"
                name="login_member_password"
                value={inputs.login_member_password || ""}
                onChange={handleChange}
                placeholder="password"
                className="w-full border text-center text-xl font-mono border-gray-300 rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <button
              type="submit"
              className=" w-full bg-blue-500 hover:bg-blue-700 text-white font-mono font-bold py-2 px-4 rounded">
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
