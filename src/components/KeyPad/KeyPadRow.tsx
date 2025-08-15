import React, { memo } from "react";
import { KeyConfig, KeypadProps } from "../../types/keypadTypes";
import KeyButton from "./KeyButton";

interface KeypadRowProps {
  row: KeyConfig[];
  rowIndex: number;
  handlers: KeypadProps;
}

const KeypadRow: React.FC<KeypadRowProps> = memo(
  ({ row, rowIndex, handlers }) => {
    return (
      <div className="keypad-row">
        {row.map((keyConfig, keyIndex) => (
          <KeyButton
            key={`${rowIndex}-${keyIndex}`}
            config={keyConfig}
            handlers={handlers}
          />
        ))}
      </div>
    );
  }
);

KeypadRow.displayName = "KeypadRow";

export default KeypadRow;
