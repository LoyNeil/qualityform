import React from "react";
import { AuditData } from "./AuditData";
import { AuditProvider } from "./AuditContext";

function App() {
  return (
    <AuditProvider>
      <div className="m-2 p-2 text-sm">
        <div>
          <h1 className="text-center text-blue-500 font-bold text-3xl font-poppins">
            Quality Form
          </h1>
        </div>
        <div>
          <AuditData />
        </div>
      </div>
    </AuditProvider>
  );
}

export default App;
