import { renderHook } from '@testing-library/react';
import { useCalculator } from '../hooks/useCalculator';
import { logEvent } from '../services/auditService';
import {act} from 'react';

jest.mock('../services/auditService', () => ({
  logEvent: jest.fn().mockResolvedValue('mock-id'),
}));

describe('useCalculator Hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('initializes with default state', () => {
    const { result } = renderHook(() => useCalculator());
    expect(result.current.display).toBe('0');
  });

  it('handles digit input correctly', async () => {
    const { result } = renderHook(() => useCalculator());
    
    await act(async () => {
      await result.current.inputDigit('5');
    });
    
    expect(result.current.display).toBe('5');
    expect(logEvent).toHaveBeenCalledWith('numberEntered', '5');
  });

  it('handles decimal input correctly', async () => {
    const { result } = renderHook(() => useCalculator());
    
    await act(async () => {
      await result.current.inputDecimal();
    });
    
    expect(result.current.display).toBe('0.');
    expect(logEvent).toHaveBeenCalledWith('decimalEntered', '.');
  });

  it('clears the display', async () => {
    const { result } = renderHook(() => useCalculator());
    
    await act(async () => {
      await result.current.clearDisplay();
    });

    expect(result.current.display).toBe('0');
    expect(logEvent).toHaveBeenCalledWith('clearPressed', 'C');
  });
});
