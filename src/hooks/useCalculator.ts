import { useState } from 'react';
import { logEvent } from '../services/auditService';

export const useCalculator = () => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const logAction = async (action: string, value?: string) => {
    try {
      await logEvent(action, value);
    } catch (error) {
      console.error('Failed to log action:', error);
    }
  };

  const inputDigit = async (digit: string) => {
    if (waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
    await logAction('numberEntered', digit);
  };

  const inputDecimal = async () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
    await logAction('decimalEntered', '.');
  };

  const calculate = (firstValue: number, secondValue: number, operation: string): number => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '*':
        return firstValue * secondValue;
      case '/':
        return firstValue / secondValue;
      default:
        return secondValue;
    }
  };

  const getDisplayValue = () => parseFloat(display);

  const performOperation = async (nextOperation: string) => {
    const inputValue = getDisplayValue();
    
    await logAction('operatorEntered', nextOperation);

    if (previousValue === null) {
      setPreviousValue(inputValue);
      setOperation(nextOperation);
      setWaitingForOperand(true);
      return;
    }

    if (operation) {
      const result = calculate(previousValue, inputValue, operation);
      setDisplay(String(result));
      setPreviousValue(result);
    } else {
      setPreviousValue(inputValue);
    }
    
    setOperation(nextOperation);
    setWaitingForOperand(true);
  };

  const equals = async () => {
    const inputValue = getDisplayValue();

    if (previousValue === null || !operation) {
      return;
    }

    const result = calculate(previousValue, inputValue, operation);
    await logAction('equalsPressed', '=');
    setDisplay(String(result));
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(true);
  };

  const clearDisplay = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
    logAction('clearPressed', "C");
  };

  return {
    display,
    inputDigit,
    inputDecimal,
    performOperation,
    equals,
    clearDisplay,
    waitingForOperand
  };
};
