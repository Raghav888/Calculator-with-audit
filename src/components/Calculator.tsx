import React, { useState } from "react";
import Display from "./Display";
import KeyPad from "./KeyPad/KeyPad";
import AuditLogs from "./AuditLogs";
import { useCalculator } from "../hooks/useCalculator";
import "../css/Calculator.css";

const Calculator: React.FC = () => {
  const {
    display,
    inputDigit,
    inputDecimal,
    performOperation,
    equals,
    clearDisplay,
  } = useCalculator();
  const [showLogs, setShowLogs] = useState(false);

  return (
    <div className="calculator-container">
      <div className="calculator">
        <Display value={display} />
        <KeyPad
          onDigitClick={inputDigit}
          onDecimalClick={inputDecimal}
          onOperatorClick={performOperation}
          onEquals={equals}
          onClear={clearDisplay}
        />
        <button
          className="show-logs-button"
          onClick={() => setShowLogs(!showLogs)}
        >
          {showLogs ? "Hide Audit Logs" : "Show Audit Logs"}
        </button>
      </div>
      {showLogs && <AuditLogs />}
    </div>
  );
};

export default Calculator;
