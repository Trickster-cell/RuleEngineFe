import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RuleContext } from "../context/rules";
import { toast } from "react-toastify";

const data = [];

const CombineRulesMainPage = () => {
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

  const OperatorInput = (props) => {
    const { setCombineType } = props;
    return (
      <form class="max-w-sm mx-auto my-4">
        <label
          for="countries"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Combine Type:
        </label>
        <select
          id="countries"
          onChange={(e) => setCombineType(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-center "
        >
          <option value="OR" selected>
            OR
          </option>
          <option value="AND">AND</option>
          <option value="XOR">XOR</option>
        </select>
      </form>
    );
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

  const [selectedRuleIds, setSelectedRuleIds] = useState([]);
  const [combineType, setCombineType] = useState("OR");

  // Handle checkbox change
  const handleCheckboxChange = (ruleId) => {
    setSelectedRuleIds((prevSelected) => {
      if (prevSelected.includes(ruleId)) {
        // If ruleId is already selected, remove it
        return prevSelected.filter((id) => id !== ruleId);
      } else {
        // If ruleId is not selected, add it
        return [...prevSelected, ruleId];
      }
    });
  };

  const [name, setName] = useState("");

  const handleChange = (e) => {
    e.preventDefault();

    setName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const ruleData2 = {
      rules: selectedRuleIds,
      combineType: combineType,
      name: name,
    };

    try {
      //   console.log(ruleData);
      const response = await fetch("https://ruleenginebackend-9sxx.onrender.com/rule/combine-rule", {
        method: "POST", // Use POST method
        headers: {
          "Content-Type": "application/json", // Specify the content type
          Accept: "application/json", // Set the Accept header
        },
        body: JSON.stringify(ruleData2),
      });
      console.log(response);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json(); // Parse JSON response
      console.log(data);
      toast.success("Rules combined successfully");
      navigate("/");
      // setRuleData(data.nodes);
    } catch (error) {
      console.error(error);
      toast.error("Some error occured");
    }
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
          for="table-combine"
          class="block mb-2 text-xl font-medium text-gray-900 dark:text-white"
        >
          Available Rules
        </label>
        <table
          id="table-combine"
          class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
        >
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                Select
              </th>
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
                  <th scope="col" className="p-4">
                    <div className="flex items-center">
                      <input
                        id={`checkbox-${rule.node_id}`} // Unique ID for each checkbox
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        checked={selectedRuleIds.includes(rule.finalString)} // Check if the rule ID is in the selected array
                        onChange={() => handleCheckboxChange(rule.finalString)} // Call the handler with the rule ID
                      />
                      <label
                        htmlFor={`checkbox-${rule.node_id}`}
                        className="sr-only"
                      >
                        checkbox
                      </label>
                    </div>
                  </th>
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
      <OperatorInput setCombineType={setCombineType} />

      <div className="mb-6 w-full">
        <label
          for="default-input"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Rule Name
        </label>
        <input
          type="text"
          id="default-input"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-center"
          value={name}
          placeholder="Test Rule"
          onChange={handleChange}
        />
      </div>
      <button
        onClick={handleSubmit}
        disabled={selectedRuleIds.length < 2}
        className={`relative inline-flex items-center text-white justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium rounded-lg  ${
          selectedRuleIds.length > 1 &&
          "group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 dark:hover:text-gray-900"
        } dark:text-white  focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 transition-opacity duration-1000 ease-in-out ${
          selectedRuleIds.length < 2 && "cursor-not-allowed"
        }`}
      >
        <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
          Combine
        </span>
      </button>
    </div>
  );
};

export default CombineRulesMainPage;
