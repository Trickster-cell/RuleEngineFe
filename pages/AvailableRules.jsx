import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RuleContext } from "../context/rules";
import Loading from "../components/Loading"; // Import your Loading component

const AvailableRules = () => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  const [ruleData, setRuleData] = useState([]);
  const [loading, setLoading] = useState(true); // State to manage loading

  const { setRuleId, setRuleName, setRuleString } = useContext(RuleContext);

  const host = import.meta.env.VITE_SERVER_URL || "https://ruleenginebackend-9sxx.onrender.com";

  console.log(import.meta.env.VITE_SERVER_URL);

  const fetchRules = async () => {
    setLoading(true); // Set loading to true before fetching data
    try {
      const response = await fetch(`${host}/rule/allRules`, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setRuleData(data.nodes);
    } catch (error) {
      console.log("Some Error occurred", error);
    } finally {
      setLoading(false); // Set loading to false after data is fetched
    }
  };

  useEffect(() => {
    fetchRules();
  }, []);

  const handleClick = (rule) => {
    setRuleId(rule._id);
    setRuleName(rule.name);
    setRuleString(rule.finalString);
    navigate(`/visualize/${rule._id}`);
  };

  const handleClick2 = (rule) => {
    setRuleId(rule._id);
    setRuleName(rule.name);
    setRuleString(rule.finalString);
    navigate(`/evaluate/${rule._id}`);
  };

  if (loading) {
    return <Loading />; // Render the Loading component while fetching data
  }

  return (
    <div>
      <button
        type="button"
        className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 absolute top-5 left-0 ml-2"
        onClick={goBack}
      >
        Back
      </button>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <label
          htmlFor="table-avail"
          className="block mb-2 text-xl font-medium text-gray-900 dark:text-white"
        >
          Available Rules
        </label>
        <table
          id="table-avail"
          className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
        >
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">Rule Name</th>
              <th scope="col" className="px-6 py-3">Rule ID</th>
              <th scope="col" className="px-6 py-3">Visualize</th>
              <th scope="col" className="px-6 py-3">Evaluate Data</th>
            </tr>
          </thead>
          <tbody>
            {ruleData.map((rule) => (
              <tr key={rule._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {rule.name}
                </th>
                <td className="px-6 py-4">{rule._id}</td>
                <td className="px-6 py-4">
                  <p
                    onClick={() => handleClick(rule)}
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Visualize
                  </p>
                </td>
                <td className="px-6 py-4">
                  <p
                    onClick={(e) => {
                      e.preventDefault();
                      handleClick2(rule);
                    }}
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Evaluate
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AvailableRules;
