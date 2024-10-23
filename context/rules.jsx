import React, { createContext, useState } from "react";

// Create the context
export const RuleContext = createContext();

// Create a provider component
export const RuleProvider = ({ children }) => {
  // State variables for rule details
  const [ruleName, setRuleName] = useState("Test Rule");
  const [ruleId, setRuleId] = useState("ID");
  const [ruleString, setRuleString] = useState("RuleId");

  // Optionally, you can add more functions or state as needed

  return (
    <RuleContext.Provider
      value={{
        ruleName,
        ruleId,
        ruleString,
        setRuleName,
        setRuleId,
        setRuleString,
      }}
    >
      {children}
    </RuleContext.Provider>
  );
};
