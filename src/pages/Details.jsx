import axios from "axios";
import React, { useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useReactToPrint } from "react-to-print";

export default function Details() {
  const { state } = useLocation();
  const [details, setDetails] = useState([]);
  const printRef = useRef();

  const handlePrint = useReactToPrint({
    documentTitle: "report_for _" + state.user_name + Date.now(),
    content: () => printRef.current,
  });

  useState(() => {
    axios
      .get(`http://localhost:3001/tallies/${state.user_id}`)
      .then((res) => {
        console.log(res);
        setDetails(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  return (
    <div className="w-3/4 mx-auto my-6">
      <h2 className="uppercase font-bold text-center py-5 my-4 text-xl">
        User Tallies
      </h2>
      <div className="flex items-center justify-between px-4 py-2 bg-gray-100">
        {/* <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => {}}>
          Report
        </button> */}
        <div className="mr-4">
          <span className="font-bold uppercase">{state.user_name}</span>
          <span className="text-gray-500">
            (MEMBER NUMBER: {state.user_id})
          </span>
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handlePrint}>
          Report
        </button>
      </div>

      <div className="text-center font-bold">
        <div class="py-1 align-middle inline-block min-w-full  sm:px-6 lg:px-8">
          <table ref={printRef} class="w-full px-10 mx-auto divide-gray-200">
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
                console.log(tal);
                return (
                  <tr>
                    <td class="px-6 py-4 whitespace-nowrap text-sm border-2  border-black font-medium font-mono text-black">
                      {tal.tally_date.split("T21:00:00.000Z")}
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

        <Link to="/admin">Back to Dashboard</Link>
      </div>
    </div>
  );
}