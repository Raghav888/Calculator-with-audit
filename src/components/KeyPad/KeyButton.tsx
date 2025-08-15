import React, { memo } from "react";
import { KeyConfig, KeypadProps } from "../../types/keypadTypes";

const KeyButton: React.FC<{ config: KeyConfig; handlers: KeypadProps }> = memo(
  ({ config, handlers }) => {
    const getButtonProps = () => {
      const key = config.key;
      switch (key.type) {
        case "digit":
          return {
            onClick: () => handlers.onDigitClick(key.value),
            children: key.value,
            "aria-label": `Number ${key.value}`,
          };
        case "operator":
          return {
            onClick: () => handlers.onOperatorClick(key.value),
            children: key.display,
            "aria-label": `Operator ${key.display}`,
          };
        case "decimal":
          return {
            onClick: handlers.onDecimalClick,
            children: ".",
            "aria-label": "Decimal point",
          };
        case "equals":
          return {
            onClick: handlers.onEquals,
            children: "=",
            "aria-label": "Equals",
          };
        case "clear":
          return {
            onClick: handlers.onClear,
            children: "C",
            "aria-label": "Clear",
          };
      }
    };

    return <button className={config.className} {...getButtonProps()} />;
  }
);

KeyButton.displayName = "KeyButton";

export default KeyButton;
