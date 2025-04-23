import React, { createContext, useState } from "react";

export const AuditContext = createContext();

export function AuditProvider({ children }) {
  const [responses, setResponses] = useState(
    Array(1).fill({
      params: { param1: "Yes", param2: "Yes" }, // Dynamic params
      issues: {}, // Store issues as { param1: [...], param2: [...] }
      remarks: {}, // Store remarks as { param1: "...", param2: "..." }
    })
  );
  

  const parameterWeights = {
    param1: 10,
    param2: 15,
    param3: 5,
    param4: 8,
    // Add more params here dynamically
  };

  // Update response for each parameter separately
  const handleChange = (e, index, paramType) => {
    const { value } = e.target;
    setResponses((prevResponses) => {
      const updatedResponses = [...prevResponses];
      updatedResponses[index] = {
        ...updatedResponses[index],
        params: {
          ...updatedResponses[index].params,
          [paramType]: value,
        }
      };
      return updatedResponses;
    });
  };

  const calculateScore = () => {
    // Calculate total possible score (sum of all weights)
    const totalPossibleScore = Object.values(parameterWeights).reduce((total, weight) => total + weight, 0);
    
    // Start with total possible score
    let currentScore = totalPossibleScore;
  
    responses.forEach((response) => {
      Object.keys(parameterWeights).forEach((param) => {
        if (response.params[param] === "No") {
          currentScore -= parameterWeights[param]; // Subtract weight for that parameter
        }
      });
    });
  
    // Convert to percentage
    const percentageScore = (currentScore / totalPossibleScore) * 100;
    
    return percentageScore.toFixed(0);
  };

  const handleIssueChange = (selectedOptions, index, param) => {
    const selectedIssues = selectedOptions ? selectedOptions.map(option => option.label) : [];
    setResponses(prevResponses => {
      const updatedResponses = [...prevResponses];
      updatedResponses[index] = {
        ...updatedResponses[index],
        issues: { ...updatedResponses[index].issues, [param]: selectedIssues },
      };
      return updatedResponses;
    });
  };
  
  const handleRemarksChange = (e, index, param) => {
    setResponses(prevResponses => {
      const updatedResponses = [...prevResponses];
      updatedResponses[index] = {
        ...updatedResponses[index],
        remarks: { ...updatedResponses[index].remarks, [param]: e.target.value },
      };
      return updatedResponses;
    });
  };
  

  return (
    <AuditContext.Provider
      value={{
        responses,
        handleChange,
        handleIssueChange,
        handleRemarksChange,
        calculateScore
      }}
    >
      {children}
    </AuditContext.Provider>
  );
}
