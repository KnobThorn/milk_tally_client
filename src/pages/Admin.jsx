import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import useReactToPrint from 'react-to-print';

export default function Admin() {
  const handleSubmit = (event) => {};
  const [inputs, setInputs] = useState({});
  const [messages, setMessages] = useState("");
  const [add, setAdd] = useState(false);
  const [route, setRoute] = useState(false);
  const [collection, setCollection] = useState(false);
  const [panel, setPanel] = useState(true);
  const [details, setDetails] = useState([]);
  const [user, setUser] = useState(false);
  const navigate = useNavigate();
  const [admin, setAdmin] = useState({})
  const [members, setMembers] = useState([]);

  // const printRef = useRef();

  // const handlePrint = useReactToPrint({
  //   documentTitle: "report" + admin.user_name + Date.now(),
  //   content: () => printRef.current,
  // });
  const fetchUsers = () => {
    axios
      .get("http://localhost:3001/users")
      .then((res) => {
        console.log(typeof res);
        setMembers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchTally = () => {
    axios
      .get("http://localhost:3001/tally")
      .then((res) => {
        console.log(res);
        setDetails(res.data);
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

  function getDayOfWeek(date) {
    const dayOfWeek = new Date(date).toLocaleDateString("en-US", {
      weekday: "long",
    });
    return dayOfWeek;
  }

  const addRoute = (event) => {
    event.preventDefault();
    console.log(inputs);

    axios
      .post("http://localhost:3001/route", inputs)
      .then((res) => {
        console.log(res);
        setMessages(res.data.msg);
      })
      .catch((err) => {
        console.log(err);
        setMessages("internal server error");
      });
  };

  const addCollection = (event) => {
    event.preventDefault();
    console.log(inputs);

    axios
      .post("http://localhost:3001/collection", inputs)
      .then((res) => {
        console.log(res);
        setMessages(res.data.msg);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addUser = (event) => {
    event.preventDefault();
    console.log(inputs);
    axios
      .post("http://localhost:3001/register", inputs)
      .then((res) => {
        console.log(res);
        setMessages(res.data.msg);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axios
      .post("http://localhost:3001/member/verify", {
        token: localStorage.getItem("adminToken"),
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.login) {
          setAdmin(res.data.member)
          fetchTally();
          fetchUsers();

        } else {
          navigate("/");
          console.log("not auhenticated");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div class="min-h-screen w-screen flex bg-gray-50">
      <div className="bg-blue-300 w-1/5 font-mono font-bold p-2 h-screen">
        <div className="flex flex-col justify-around py-6 ">
          <h2 className="text-2xl mb-12">ADMIN DASHBOARD.</h2>
        </div>
        <div className="">
          {/* <div
            onClick={() => {
              setPanel(true);
              setAdd(false);
              setRoute(false);
              setCollection(false);
              setUser(false);
            }}
            className="bg-white w-full  py-7  border-1 hover:bg-slate-800 hover:text-white  border-red-400 text-xl my-6">
            <h2>ADMIN PANEL</h2>
          </div> */}
          <div
            onClick={() => {
              setAdd(!add);
              setCollection(false);
              setRoute(false);
              setUser(false)
            }}
            className="bg-white w-full  py-7  border-1 hover:bg-slate-800 hover:text-white  border-red-400 text-xl my-6 ">
            <h2>ADD USER</h2>
          </div>

          <div
            onClick={() => {
              setRoute(!route);
              setCollection(false);
              setAdd(false);
              setUser(false)
            }}
            className="bg-white w-full  py-7  border-1 hover:bg-slate-800 hover:text-white  border-red-400 text-xl my-6">
            <h2>ADD ROUTE</h2>
          </div>

          <div
            onClick={() => {
              setCollection(!collection);
              setAdd(false);
              setRoute(false);
              setUser(false);
            }}
            className="bg-white w-full  py-7  border-1 hover:bg-slate-800 hover:text-white  border-red-400 text-xl my-6 ">
            <h2>ADD CENTER</h2>
          </div>
          <div
            onClick={() => {
              setUser(!user);
              setCollection(false);
              setAdd(false);
              setRoute(false);
            }}
            className="bg-white w-full  py-7  border-1 hover:bg-slate-800 hover:text-white  border-red-400 text-xl ">
            <h2>MEMBER</h2>
          </div>
          <div
            onClick={() => {
              navigate("/");
            }}
            className="bg-white w-full  py-7   border-1 hover:bg-slate-800 hover:text-white  border-red-400 text-xl my-6 ">
            <h2>LOGOUT</h2>
          </div>
        </div>
      </div>

      <div className="w-4/5 h-screen flex bg-gray-400">
        
        {user && (
          <div className=" w-full mx-auto bg-gray-400  ">
            <h2 className="font-bold text-xl py-5">Users</h2>
            <div className="w-3/4 mx-auto my-5 bg-slate-200">
              <table class="min-w-full divide-y  divide-gray-200">
                <thead class="bg-gray-50">
                  <tr className="font-black">
                    <th
                      scope="col"
                      class="px-6 py-3  font-black text-xs  text-black uppercase tracking-wider">
                      #
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3  font-black text-xs  text-black uppercase tracking-wider">
                      user email
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3  font-black text-xs  text-black uppercase tracking-wider">
                      route number
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3  font-black text-xs  text-black uppercase tracking-wider">
                      role
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  {members.map((tal) => {
                    // let day = getDayOfWeek(tal.tally_date);
                    console.log(tal);
                    return (
                      <tr
                        onClick={() => {
                          console.log(tal.user_id);
                          navigate("/details", {
                            state: {
                              user_id: tal.user_id,
                              user_name: tal.user_name,
                            },
                          });
                        }}>
                        <td class="px-6 py-4 whitespace-nowrap text-sm border-2  border-black font-medium font-mono text-black">
                          {tal.user_id}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap font-mono text-sm border-black border-2 text-black">
                          {tal.user_name}
                        </td>
                        <td class="px-6 py-4 border-2 font-mono border-black whitespace-nowrap">
                          {tal.user_route_number}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap border-2 font-mono border-black text-sm text-black">
                          {tal.user_role}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
        {add && (
          // <div className="w-1/3 m-auto">
          <div className=" w-1/3 mx-auto bg-gray-400  ">
            <form className="m-10 p-10" onSubmit={addUser}>
              <h4 className="font-bold py-5 font-mono">ADD USER</h4>
              <h3 className="py-4 my-3 text-green-700 font-bold">{messages}</h3>
              <div className="mb-8">
                <input
                  type="text"
                  name="register_user_name"
                  value={inputs.register_user_name || ""}
                  onChange={handleChange}
                  placeholder="Username"
                  className="w-full border border-gray-300 text-center font-mono text-xl rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-8 ">
                <input
                  id="id"
                  name="register_user_id"
                  value={inputs.register_user_id || ""}
                  onChange={handleChange}
                  placeholder="user id"
                  className="w-full border border-gray-300 font-mono text-center text-xl rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-8">
                <input
                  id="route"
                  type="text"
                  name="register_route_id"
                  value={inputs.register_route_id || ""}
                  onChange={handleChange}
                  placeholder="Route no"
                  className="w-full border text-center text-xl font-mono border-gray-300 rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-8">
                <input
                  id="collection id"
                  type="text"
                  name="register_collection_center_id"
                  value={inputs.register_collection_center_id || ""}
                  onChange={handleChange}
                  placeholder="collection center id"
                  className="w-full border text-center text-xl font-mono border-gray-300 rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <div className="mb-8">
                <select
                  id="role"
                  type="password"
                  name="register_user_role"
                  value={inputs.register_user_role || ""}
                  onChange={handleChange}
                  placeholder="collection center id"
                  className="w-full border text-center text-xl font-mono border-gray-300 rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline">
                  <option>select</option>
                  <option>grader</option>
                  <option>member</option>
                  <option>admin</option>
                </select>
              </div>
              <div className="mb-8">
                <input
                  id="password"
                  type="password"
                  name="register_user_password"
                  value={inputs.register_user_password || ""}
                  onChange={handleChange}
                  placeholder="password"
                  className="w-full border text-center text-xl font-mono border-gray-300 rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <button
                type="submit"
                className=" w-full bg-blue-500 hover:bg-blue-700 text-white font-mono font-bold py-2 px-4 rounded">
                Add
              </button>
            </form>
          </div>
        )}


        {route && (
          // <div className="w-1/3 m-auto">
          <div className=" w-1/3 mx-auto bg-gray-400  ">
            <form className="m-10 p-10" onSubmit={addRoute}>
              <h4 className="font-bold py-5 font-mono">ADD ROUTE</h4>
              <h3 className="py-4 my-3 text-green-700 font-bold">{messages}</h3>
              <div className="mb-8">
                <input
                  type="text"
                  name="route_area"
                  value={inputs.route_area || ""}
                  onChange={handleChange}
                  placeholder="route area"
                  className="w-full border border-gray-300 text-center font-mono text-xl rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-8 ">
                <input
                  id="route_number"
                  name="route_number"
                  value={inputs.route_number || ""}
                  onChange={handleChange}
                  placeholder="route number "
                  className="w-full border border-gray-300 font-mono text-center text-xl rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <button
                type="submit"
                className=" w-full bg-blue-500 hover:bg-blue-700 text-white font-mono font-bold py-2 px-4 rounded">
                Create
              </button>
            </form>
          </div>
        )}

        {collection && (
          // <div className="w-1/3 m-auto">
          <div className=" w-1/3 mx-auto bg-gray-400  ">
            <form className="m-10 p-10" onSubmit={addCollection}>
              <h4 className="font-bold py-5 font-mono">ADD CENTER</h4>
              <h3 className="py-4 my-3 text-green-700 font-bold">{messages}</h3>
              <div className="mb-8 ">
                <input
                  id="collection_no"
                  name="collection_center_id"
                  value={inputs.collection_center_id || ""}
                  onChange={handleChange}
                  placeholder="collection center id "
                  className="w-full border border-gray-300 font-mono text-center text-xl rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-8">
                <input
                  type="text"
                  name="collection_center_location"
                  value={inputs.collection_center_location || ""}
                  onChange={handleChange}
                  placeholder="center location"
                  className="w-full border border-gray-300 text-center font-mono text-xl rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-8 ">
                <input
                  id="route_number"
                  name="route_number"
                  value={inputs.route_number || ""}
                  onChange={handleChange}
                  placeholder="route no "
                  className="w-full border border-gray-300 font-mono text-center text-xl rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <button
                type="submit"
                className=" w-full bg-blue-500 hover:bg-blue-700 text-white font-mono font-bold py-2 px-4 rounded">
                Create
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
