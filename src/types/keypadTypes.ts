export type OperatorType = "+" | "-" | "*" | "/";
export type DigitType = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";

export interface KeypadProps {
  onDigitClick: (digit: DigitType) => void;
  onDecimalClick: () => void;
  onOperatorClick: (operator: OperatorType) => void;
  onEquals: () => void;
  onClear: () => void; 
}

export type KeyType =
  | { type: "digit"; value: DigitType }
  | { type: "operator"; value: OperatorType; display: string }
  | { type: "decimal" }
  | { type: "clear" }
  | { type: "equals" };

export interface KeyConfig {
  key: KeyType;
  className: string;
}
