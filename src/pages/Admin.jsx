import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Admin() {
  const handleSubmit = (event) => {};
  const [inputs, setInputs] = useState({});
  const [messages, setMessages] = useState("");
  const [add, setAdd] = useState(false);
  const [route, setRoute] = useState(false);
  const [collection, setCollection] = useState(false);
  const [panel, setPanel] = useState(true);
  const [details, setDetails] = useState([]);
  const navigate = useNavigate();

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
          fetchTally();
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
        <div className="flex flex-col gap-5 py-6 ">
          <h2 className="text-2xl ">DIGITAL MILK TALLY</h2>
          <h2 className="text-xl text-blue-500">ADMIN DASHBOARD</h2>
        </div>
        <div className="">
          <div
            onClick={() => {
              setPanel(true);
              setAdd(false);
              setRoute(false);
              setCollection(false);
            }}
            className="bg-white w-full  py-7  border-1 hover:bg-slate-800 hover:text-white  border-red-400 text-xl ">
            <h2>ADMIN PANEL</h2>
          </div>
          <div
            onClick={() => {
              setAdd(!add);
              setPanel(false);
              setCollection(false);
              setRoute(false);
            }}
            className="bg-white w-full  py-7  border-1 hover:bg-slate-800 hover:text-white  border-red-400 text-xl ">
            <h2>ADD USER</h2>
          </div>

          <div
            onClick={() => {
              setRoute(!route);
              setPanel(false);
              setCollection(false);
              setAdd(false);
            }}
            className="bg-white w-full  py-7  border-1 hover:bg-slate-800 hover:text-white  border-red-400 text-xl ">
            <h2>ADD ROUTE</h2>
          </div>

          <div
            onClick={() => {
              setCollection(!collection);
              setPanel(false);
              setAdd(false);
              setRoute(false);
            }}
            className="bg-white w-full  py-7  border-1 hover:bg-slate-800 hover:text-white  border-red-400 text-xl ">
            <h2>ADD CENTER</h2>
          </div>

          <div
            onClick={() => {}}
            className="bg-white w-full  py-7  border-1 hover:bg-slate-800 hover:text-white  border-red-400 text-xl ">
            <h2>MORE </h2>
          </div>
          <div className="bg-white w-full  py-7  border-1 hover:bg-slate-800 hover:text-white  border-red-400 text-xl ">
            <h2>DETAILS</h2>
          </div>
          <div className="bg-white w-full  py-7  border-1 hover:bg-slate-800 hover:text-white  border-red-400 text-xl ">
            <h2>RECIEPTS</h2>
          </div>

          <div
            onClick={() => {
              navigate("/");
            }}
            className="bg-white w-full  py-7   border-1 hover:bg-slate-800 hover:text-white  border-red-400 text-xl ">
            <h2>LOGOUT</h2>
          </div>
        </div>
      </div>
      <div className="w-4/5 h-full flex">
        {add && (
          <div className="w-1/3 m-auto">
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

        {panel && (
          <div className=" px-10 w-full mx-auto bg-slate-300  ">
            <h4 className="font-bold text-xl py-2">Tallies</h4>

            <div class=" overflow-x-auto sm:-mx-6  lg:-mx-8">
              <div class="py-1 align-middle inline-block min-w-full  sm:px-6 lg:px-8">
                <table class="w-full px-10 mx-auto divide-gray-200">
                  <thead class="bg-gray-50">
                    <tr className="font-black">
                      <th
                        scope="col"
                        class="px-6 py-3  font-black text-xs  text-black uppercase tracking-wider">
                        Tally Date
                      </th>

                      <th
                        scope="col"
                        class="px-6 py-3  text-xs font-black  text-black uppercase tracking-wider">
                        Tally Day
                      </th>
                      <th
                        scope="col"
                        class="px-6 py-3  text-xs font-black  text-black uppercase tracking-wider">
                        Tally(kg)
                      </th>
                      <th
                        scope="col"
                        class="px-6 py-3  text-xs font-black  text-black uppercase tracking-wider">
                        User_Id
                      </th>

                      <th
                        scope="col"
                        class="px-6 py-3  text-xs font-black  text-black uppercase tracking-wider">
                        Tally Time
                      </th>
                    </tr>
                  </thead>

                  <tbody class="bg-white divide-y divide-gray-200">
                    {details.map((tal) => {
                      return (
                        <tr>
                          <td class="px-6 py-4 whitespace-nowrap text-sm border-2  border-black font-medium font-mono text-black">
                            {tal.tally_date.split("T21:00:00.000Z")}
                          </td>
                          <td class="px-6 py-4 whitespace-nowrap font-mono text-sm border-black border-2 text-black">
                            {tal.tally_date}
                          </td>
                          <td class="px-6 py-4 border-2 font-mono border-black whitespace-nowrap">
                            {tal.tally}
                          </td>
                          <td class="px-6 py-4 border-2 font-mono border-black whitespace-nowrap">
                            {tal.tally_user_id}
                          </td>
                          <td class="px-6 py-4 whitespace-nowrap border-2 font-mono border-black text-sm text-black">
                            {tal.tally_time}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {route && (
          <div className="w-1/3 m-auto">
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
          <div className="w-1/3 m-auto">
            <form className="m-10 p-10" onSubmit={addCollection}>
              <h4 className="font-bold py-5 font-mono">ADD CENTER</h4>
              <h3 className="py-4 my-3 text-green-700 font-bold">{messages}</h3>
              <div className="mb-8 ">
                <input
                  id="collection_no"
                  name="collection_center_id"
                  value={inputs.collection_center_id || ""}
                  onChange={handleChange}
                  placeholder="collection no "
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
