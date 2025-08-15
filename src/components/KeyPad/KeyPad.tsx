import React, { memo } from "react";
import { KeypadProps } from "../../types/keypadTypes";
import { KEYPAD_LAYOUT } from "../../configs/keypadConfig";
import KeypadRow from "./KeyPadRow";

const Keypad: React.FC<KeypadProps> = memo((props) => {
  return (
    <div className="keypad">
      {KEYPAD_LAYOUT.map((row, rowIndex) => (
        <KeypadRow
          key={`row-${rowIndex}`}
          row={row}
          rowIndex={rowIndex}
          handlers={props}
        />
      ))}
    </div>
  );
});

Keypad.displayName = "Keypad";

export default Keypad;
