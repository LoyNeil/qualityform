import React from "react";
import { FieldParameter } from "./PostSales";
import { useState, useContext, useEffect } from "react";
import { AuditContext } from "./AuditContext";

export function AuditData() {
  const { responses, handleChange, handleIssueChange, handleRemarksChange, calculateScore } = useContext(AuditContext);

  const [selectedLob,setSelectedLob] = useState("");
  const [payload, setPayload] = useState({});

  const handleDrop = (e) => {
    setSelectedLob(e.target.value)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const [formData, setFormData] = useState({
    agentName: "",
    teamLeader: "",
    callDuration: "",
    callDate: "",
    lob: "",
  });

  const submitClick = async () => {
    console.log("📌 Form Data Before Submitting:", formData);
    console.log("📌 Responses Before Submitting:", responses);

    try {
      const response = await fetch("https://qualityform.onrender.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      alert(data.message);
      window.location.reload();
    } catch (error) {
      console.error("❌ Error submitting data:", error);
      alert("Failed to submit data.");
    }
  };

  useEffect(() => {
    const updatedPayload = {
      formData: formData,
      score: calculateScore(),
      fieldParameters: responses.map((response) => ({
        params: response.params,
        issues: response.issues,
        remarks: response.remarks,
      })),
    };
  
    setPayload(updatedPayload);
    console.log("Updated Payload:", updatedPayload);
  }, [responses, formData]); 
  

  return (
    <div>
      <div>
        <div className="mt-4 ml-5 flex flex-col">
          <div>
            <label>Agent Name:</label>
            <input
              className="ml-5 border-[0.2px] rounded-sm text-center h-10"
              type="text"
              name="agentName"
              placeholder="Agent Name"
              value={formData.agentName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label className="mt-3">LOB:</label>
            <select
              className="ml-18 border-[0.2px] mt-3 rounded-sm w-41 text-center h-10"
              name="lob"
              onChange={handleDrop}
            >
              <option value="">Select LOB</option>
              <option value="post-sales">LOB - 1</option>
            </select>
          </div>
          <div>
            <label className="mt-3">Team Leader:</label>
            <input
              className="ml-5 mt-3 border-[0.2px] rounded-sm text-center h-10"
              type="text"
              name="teamLeader"
              placeholder="Team Leader"
              value={formData.teamLeader}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label className="mt-3">Call Duration:</label>
            <input
              className="ml-4 mt-3 border-[0.2px] rounded-sm text-center w-41 h-10"
              type="text"
              name="callDuration"
              placeholder="Duration"
              value={formData.callDuration}
              onChange={handleInputChange}
              step="1"
              pattern="([01]?[0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])"
              required
            />
          </div>
          <div>
            <label className="mt-3">Call Date:</label>
            <input
              className="ml-10 mt-3 border-[0.2px] rounded-sm text-center w-41 h-10"
              type="date"
              name="callDate"
              value={formData.callDate}
              onChange={handleInputChange}
              required
            />
          </div>
          <h1 className="ml-200 text-xl font-bold absolute font-poppins border p-2 rounded-2xl">
            Score : {calculateScore()}
          </h1>
        </div>
        <div>
          <h4 className="mt-3 font-poppins border-[1px] rounded-sm bg-red-100 font-bold flex h-7 items-center justify-center">
            Main Parameter Score Down
          </h4>
        </div>
        {selectedLob === "post-sales" &&
        <div className="mt-3">
          {responses.map((_, index) => (
            <FieldParameter
              key={index}
              index={index}
              handleChange={handleChange}
              handleIssueChange={handleIssueChange}
              handleRemarksChange={handleRemarksChange}
            />
          ))}
        </div>
          }
        <div className="flex justify-center">
          <button
            className="bg-blue-500 text-white p-2 rounded mt-5 hover:cursor-pointer hover:bg-black hover:text-white"
            onClick={submitClick}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
