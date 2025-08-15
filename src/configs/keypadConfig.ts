import { KeyConfig } from "../types/keypadTypes";

export const KEYPAD_LAYOUT: KeyConfig[][] = [
  [
     { key: { type: "clear" }, className: "key clear" },
    { key: { type: "digit", value: "7" }, className: "key" },
    { key: { type: "digit", value: "8" }, className: "key" },
    { key: { type: "digit", value: "9" }, className: "key" },
    { key: { type: "operator", value: "+", display: "+" }, className: "key operator plus" },
  ],
  [
    { key: { type: "digit", value: "4" }, className: "key" },
    { key: { type: "digit", value: "5" }, className: "key" },
    { key: { type: "digit", value: "6" }, className: "key" },
    { key: { type: "operator", value: "-", display: "−" }, className: "key operator minus" },
  ],
  [
    { key: { type: "digit", value: "1" }, className: "key" },
    { key: { type: "digit", value: "2" }, className: "key" },
    { key: { type: "digit", value: "3" }, className: "key" },
    { key: { type: "operator", value: "*", display: "×" }, className: "key operator multiply" },
  ],
  [
    { key: { type: "digit", value: "0" }, className: "key" },
    { key: { type: "decimal" }, className: "key" },
    { key: { type: "equals" }, className: "key equals" },
    { key: { type: "operator", value: "/", display: "÷" }, className: "key operator divide" },
  ],
];
