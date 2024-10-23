import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import OrgChartTree from "../components/TreeNode";
import { RuleContext } from "../context/rules";

const VisualizeRule = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  const [nodeData, setNodeData] = useState({});

  const fetchRuleData = async () => {
    try {
      const response = await fetch(
        `https://ruleenginebackend-9sxx.onrender.com/rule/json?idx=${id}`,
        {
          method: "GET", // Use GET method
          headers: {
            Accept: "application/json", // Set the Accept header
          },
        }
      );
      // console.log(response);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json(); // Parse JSON response
      // console.log(data);
      // setRuleData(data.nodes);
      setNodeData(data);
    } catch (error) {
      console.log("Some Error occured", error);
    }
  };

  useEffect(() => {
    fetchRuleData();
  }, []);

  const goEvaluate = () => {
    navigate(`/evaluate/${id}`);
  };

  const {
    ruleString,
    ruleId,
    ruleName,
    setRuleId,
    setRuleString,
    setRuleName,
  } = useContext(RuleContext);

  return (
    <>
      {" "}
      <div className="w-full h-full container">
        <OrgChartTree dataP={nodeData} />
      </div>
      <button
        type="button"
        className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 absolute top-5 right-0"
        onClick={goEvaluate}
      >
        Evaluate Data
      </button>
      <h4 className="text-2xl absolute top-0 my-3 dark:text-white">
        {ruleName}
        <p className="text-xs dark:text-white">{ruleId}</p>
        <p className="text-xl dark:text-white">{ruleString}</p>
      </h4>
      <button
        type="button"
        className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 absolute top-5 left-0 ml-2"
        onClick={goBack}
      >
        Back
      </button>
    </>
  );
};

export default VisualizeRule;
