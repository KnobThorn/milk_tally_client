import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [data, setData] = useState([]);
  const [member, setMember] = useState({});
  const navigate = useNavigate();

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
    <div>
      <div className="flex items-center justify-between px-4 py-2 bg-gray-100">
        <div className="mr-4">
          <span className="font-bold">{member.member_name}</span>
          <span className="text-gray-500"> (ID: {member.member_id})</span>
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            navigate("/");
          }}>
          Logout
        </button>
      </div>
      <h1 class="text-3xl font-bold mb-6 text-gray-800">This Week Tally</h1>

      <div class="flex flex-col">
        <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      class="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tally Id
                    </th>

                    <th
                      scope="col"
                      class="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tally Day
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tally
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tally Time
                    </th>
                  </tr>
                </thead>

                <tbody class="bg-white divide-y divide-gray-200">
                  {data.map((tal) => {
                    let day = getDayOfWeek(tal.tally_date);
                    return (
                      <tr>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {tal.tally_id}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {day}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">{tal.tally}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
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
