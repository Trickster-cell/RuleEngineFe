import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RuleContext } from "../context/rules";

const data = [];

const AvailableRules = () => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  const [ruleData, setRuleData] = useState(data);

  const { ruleId, ruleName, setRuleId, setRuleString, setRuleName } =
    useContext(RuleContext);

  const fetchRules = async () => {
    try {
      const response = await fetch("https://ruleenginebackend-9sxx.onrender.com/rule/allRules", {
        method: "GET", // Use GET method
        headers: {
          Accept: "application/json", // Set the Accept header
        },
      });
      console.log(response);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json(); // Parse JSON response
      console.log(data);
      setRuleData(data.nodes);
    } catch (error) {
      console.log("Some Error occured", error);
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

  return (
    <div>
      <button
        type="button"
        className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 absolute top-5 left-0 ml-2"
        onClick={goBack}
      >
        Back
      </button>
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <label
          for="table-avail"
          class="block mb-2 text-xl font-medium text-gray-900 dark:text-white"
        >
          Available Rules
        </label>
        <table
          id="table-avail"
          class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
        >
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                Rule Name
              </th>
              <th scope="col" class="px-6 py-3">
                Rule ID
              </th>
              <th scope="col" class="px-6 py-3">
                Visualize
              </th>
              <th scope="col" class="px-6 py-3">
                Evaluate Data
              </th>
            </tr>
          </thead>
          <tbody>
            {ruleData?.map((rule) => {
              return (
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {rule.name}
                  </th>
                  <td class="px-6 py-4">{rule._id}</td>
                  <td class="px-6 py-4">
                    <p
                      onClick={() => handleClick(rule)}
                      class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Visualize
                    </p>
                  </td>
                  <td class="px-6 py-4">
                    <p
                      href={`evaluate/${rule._id}`}
                      class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      onClick={(e) => {
                        e.preventDefault();
                        handleClick2(rule);
                      }}
                    >
                      Evaluate
                    </p>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AvailableRules;
