import React, { useState, useEffect, useContext } from "react";
import Select from "react-select";
import { AuditContext } from "./AuditContext";

export function FieldParameter({ index }) {
  const { responses, handleChange, handleIssueChange, handleRemarksChange } =
    useContext(AuditContext);

  // State to track disabled state for each parameter separately
  const [isDisabled, setIsDisabled] = useState({
    param1: true,
    param2: true,
    param3: true,
    param4: true
  });

  // Initialize and update disabled state based on responses
  useEffect(() => {
    if (responses[index]) {
      const newDisabledState = {
        param1: responses[index]?.params?.param1 !== "No",
        param2: responses[index]?.params?.param2 !== "No",
        param3: responses[index]?.params?.param3 !== "No",
        param4: responses[index]?.params?.param4 !== "No"
      };
      setIsDisabled(newDisabledState);
    }
  }, [responses, index]);

  // Function to handle enabling/disabling sub-parameters
  const handleParamChange = (e, param) => {
    const value = e.target.value;
    handleChange(e, index, param);
    setIsDisabled((prevState) => ({
      ...prevState,
      [param]: value === "Yes",
    }));
    
    // Clear issues when switching to "Yes"
    if (value === "Yes") {
      handleIssueChange([], index, param);
    }
  };

  // Create a function to filter available options
  const getAvailableOptions = (param) => {
    const allOptions = [
      { value: "script", label: "Sub Parameter - 1" },
      { value: "unclear", label: "Sub Parameter - 2" },
    ];
    
    const selectedIssues = responses[index]?.issues?.[param] || [];
    return allOptions.filter(option => 
      !selectedIssues.some(issue => issue === option.label)
    );
  };

  return (
    <div className="ml-5 text-xs">
      {/* Row 1 */}
      <div className="flex items-center gap-2 mt-3">
        <p className="text-sm w-72">Parameter - 1</p>
        <select
          className="border border-gray-300 rounded-sm h-10"
          value={responses[index]?.params?.param1 || "Yes"}
          onChange={(e) => handleParamChange(e, "param1")}
        >
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
        <div className="w-[300px]">
          <Select
            isMulti
            isDisabled={isDisabled.param1}
            name="selectIssue"
            options={getAvailableOptions("param1")}
            classNamePrefix="select"
            value={responses[index]?.issues?.param1?.map(label => ({ value: label.toLowerCase(), label })) || []}
            onChange={(selectedOptions) =>
              handleIssueChange(selectedOptions, index, "param1")
            }
            styles={{
              control: (base) => ({
                ...base,
                height: "40px",
                minHeight: "40px",
                width: "200px",
                overflow: "hidden",
              }),
              valueContainer: (base) => ({
                ...base,
                maxHeight: "38px",
                overflowY: "auto",
                paddingRight: "10px",
              }),
              multiValue: (base) => ({
                ...base,
                maxWidth: "90%",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }),
              input: (base) => ({
                ...base,
                width: "100% !important",
                minWidth: "0px",
              }),
            }}
          />
        </div>
        <textarea
          className="border border-gray-300 w-full rounded-sm text-center h-10 p-2 resize-none"
          type="text"
          placeholder="Enter the remarks"
          value={responses[index]?.remarks?.param1 || ""}
          onChange={(e) => handleRemarksChange(e, index, "param1")}
        />
      </div>

      {/* Row 2 */}
      <div className="flex items-center gap-2 mt-3">
        <p className="text-sm w-72">Parameter - 2</p>
        <select
          className="border border-gray-300 rounded-sm h-10"
          value={responses[index]?.params?.param2 || "Yes"}
          onChange={(e) => handleParamChange(e, "param2")}
        >
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
        <div className="w-[300px]">
          <Select
            isMulti
            isDisabled={isDisabled.param2}
            name="selectIssue"
            options={getAvailableOptions("param2")}
            classNamePrefix="select"
            value={responses[index]?.issues?.param2?.map(label => ({ value: label.toLowerCase(), label })) || []}
            onChange={(selectedOptions) =>
              handleIssueChange(selectedOptions, index, "param2")
            }
            styles={{
              control: (base) => ({
                ...base,
                height: "40px",
                minHeight: "40px",
                width: "200px",
                overflow: "hidden",
              }),
              valueContainer: (base) => ({
                ...base,
                maxHeight: "38px",
                overflowY: "auto",
                paddingRight: "10px",
              }),
              multiValue: (base) => ({
                ...base,
                maxWidth: "90%",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }),
              input: (base) => ({
                ...base,
                width: "100% !important",
                minWidth: "0px",
              }),
            }}
          />
        </div>
        <textarea
          className="border border-gray-300 w-full rounded-sm text-center h-10 p-2 resize-none"
          type="text"
          placeholder="Enter the remarks"
          value={responses[index]?.remarks?.param2 || ""}
          onChange={(e) => handleRemarksChange(e, index, "param2")}
        />
      </div>
      {/* Row 3 */}
      <div className="flex items-center gap-2 mt-3">
        <p className="text-sm w-72">Parameter - 3</p>
        <select
          className="border border-gray-300 rounded-sm h-10"
          value={responses[index]?.params?.param3 || "Yes"}
          onChange={(e) => handleParamChange(e, "param3")}
        >
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
        <div className="w-[300px]">
          <Select
            isMulti
            isDisabled={isDisabled.param3}
            name="selectIssue"
            options={getAvailableOptions("param3")}
            classNamePrefix="select"
            value={responses[index]?.issues?.param3?.map(label => ({ value: label.toLowerCase(), label })) || []}
            onChange={(selectedOptions) =>
              handleIssueChange(selectedOptions, index, "param3")
            }
            styles={{
              control: (base) => ({
                ...base,
                height: "40px",
                minHeight: "40px",
                width: "200px",
                overflow: "hidden",
              }),
              valueContainer: (base) => ({
                ...base,
                maxHeight: "38px",
                overflowY: "auto",
                paddingRight: "10px",
              }),
              multiValue: (base) => ({
                ...base,
                maxWidth: "90%",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }),
              input: (base) => ({
                ...base,
                width: "100% !important",
                minWidth: "0px",
              }),
            }}
          />
        </div>
        <textarea
          className="border border-gray-300 w-full rounded-sm text-center h-10 p-2 resize-none"
          type="text"
          placeholder="Enter the remarks"
          value={responses[index]?.remarks?.param3 || ""}
          onChange={(e) => handleRemarksChange(e, index, "param3")}
        />
      </div>
      {/* Row 4 */}
      <div className="flex items-center gap-2 mt-3">
        <p className="text-sm w-72">Parameter - 4</p>
        <select
          className="border border-gray-300 rounded-sm h-10"
          value={responses[index]?.params?.param4 || "Yes"}
          onChange={(e) => handleParamChange(e, "param4")}
        >
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
        <div className="w-[300px]">
          <Select
            isMulti
            isDisabled={isDisabled.param4}
            name="selectIssue"
            options={getAvailableOptions("param4")}
            classNamePrefix="select"
            value={responses[index]?.issues?.param4?.map(label => ({ value: label.toLowerCase(), label })) || []}
            onChange={(selectedOptions) =>
              handleIssueChange(selectedOptions, index, "param4")
            }
            styles={{
              control: (base) => ({
                ...base,
                height: "40px",
                minHeight: "40px",
                width: "200px",
                overflow: "hidden",
              }),
              valueContainer: (base) => ({
                ...base,
                maxHeight: "38px",
                overflowY: "auto",
                paddingRight: "10px",
              }),
              multiValue: (base) => ({
                ...base,
                maxWidth: "90%",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }),
              input: (base) => ({
                ...base,
                width: "100% !important",
                minWidth: "0px",
              }),
            }}
          />
        </div>
        <textarea
          className="border border-gray-300 w-full rounded-sm text-center h-10 p-2 resize-none"
          type="text"
          placeholder="Enter the remarks"
          value={responses[index]?.remarks?.param4 || ""}
          onChange={(e) => handleRemarksChange(e, index, "param4")}
        />
      </div>
    </div>
  );
}