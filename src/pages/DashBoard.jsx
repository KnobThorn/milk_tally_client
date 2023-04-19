import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

function Dashboard() {
  const [data, setData] = useState([]);
  const [member, setMember] = useState({});
  const navigate = useNavigate();
  const printRef = useRef();

  const handlePrint = useReactToPrint({
    documentTitle: "report" + member.user_name + Date.now(),
    content: () => printRef.current,
  });

  function getDayOfWeek(date) {
    const dayOfWeek = new Date(date).toLocaleDateString("en-US", {
      weekday: "long",
    });
    return dayOfWeek;
  }

  const weekNumber = () => {
    const currentDate = new Date();

    const currentYear = currentDate.getFullYear();

    const firstDayOfYear = new Date(currentYear, 0, 1);

    const differenceInMilliseconds = currentDate - firstDayOfYear;

    const weekNumber =
      Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24 * 7)) + 1;

    return weekNumber;
  };
  const [weekOffset, setWeekOffset] = useState(weekNumber);

  const handlePrevClick = () => {
    console.log(weekOffset);
    setWeekOffset(weekOffset - 1);
  };

  const handleNextClick = () => {
    setWeekOffset(weekOffset + 1);
  };

  const fetchData = async (id) => {
    try {
      const response = await axios.post("http://localhost:3001/member/tally", {
        number: id,
        week_number: weekOffset,
      });

      setData(response.data);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    axios
      .post("http://localhost:3001/member/verify", {
        token: localStorage.getItem("memberToken"),
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.login) {
          setMember(res.data.member);
          fetchData(res.data.member.member_id);
        } else {
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [weekOffset]);

  return (
    <div className="bg-slate-400 h-screen">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-100">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            navigate("/");
          }}>
          Logout
        </button>
        <div className="mr-4">
          <span className="font-bold uppercase">{member.user_name}</span>
          <span className="text-gray-500">
            (MEMBER NUMBER: {member.member_id})
          </span>
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handlePrint}>
          Report
        </button>
      </div>
      <h1 class="text-2xl p-3 font-bold mb-6 text-gray-800 uppercase">
        This Week's Tally
      </h1>

      <div class="flex flex-col">
        <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div
              ref={printRef}
              class="overflow-hidden border-b border-black sm:rounded-lg">
              <table class="min-w-full divide-y  divide-gray-200">
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
                      Tally Time
                    </th>
                  </tr>
                </thead>

                <tbody class="bg-white divide-y divide-gray-200">
                  {data.map((tal) => {
                    let day = getDayOfWeek(tal.tally_date);
                    return (
                      <tr>
                        <td class="px-6 py-4 whitespace-nowrap text-sm border-2  border-black font-medium font-mono text-black">
                          {tal.tally_date.split("T21:00:00.000Z")}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap font-mono text-sm border-black border-2 text-black">
                          {day}
                        </td>
                        <td class="px-6 py-4 border-2 font-mono border-black whitespace-nowrap">
                          {tal.tally}
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
      </div>

      <div className="flex justify-between w-2/3  mx-auto my-10">
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold m-4 py-2 px-4 rounded"
          onClick={handlePrevClick}>
          Previous Week
        </button>
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 m-4 px-4 rounded"
          onClick={handleNextClick}>
          Next Week
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
