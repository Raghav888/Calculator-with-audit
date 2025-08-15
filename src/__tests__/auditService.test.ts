import { logEvent, listenToAuditLogs } from '../services/auditService';
import { addDoc, onSnapshot } from 'firebase/firestore';

jest.mock('firebase/firestore', () => ({
  addDoc: jest.fn().mockResolvedValue({ id: 'mock-doc-id' }),
  collection: jest.fn(),
  getDocs: jest.fn(),
  query: jest.fn(),
  orderBy: jest.fn(),
  onSnapshot: jest.fn(),
}));

jest.mock('../firebase', () => ({
  db: {}
}));

describe('auditService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('logs events with correct structure', async () => {
    const action = 'numberEntered';
    const value = '5';
    
    const id = await logEvent(action, value);
    
    expect(id).toBe('mock-doc-id');
    expect(addDoc).toHaveBeenCalled();
    const callArgs = (addDoc as jest.Mock).mock.calls[0][1];
    expect(callArgs).toMatchObject({
      action,
      value,
      timestamp: expect.any(Number)
    });
  });

  it('returns document id on successful log', async () => {
    const result = await logEvent('test', 'value');
    expect(result).toBe('mock-doc-id');
  });

  it('throws error when Firebase fails', async () => {
    (addDoc as jest.Mock).mockRejectedValue(new Error('Firebase error'));
    
    await expect(logEvent('test', 'value')).rejects.toThrow('Firebase error');
  });

describe("listenToAuditLogs", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("calls onUpdate with parsed logs from snapshot", () => {
    const mockSnapshot = {
      forEach: (callback: any) => {
        callback({ id: "1", data: () => ({  id: "1", timestamp: 1000, action: "entered" }) });
        callback({ id: "2", data: () => ({ id: "2", timestamp: 2000, action: "clear" }) });
      },
    };

    const unsubscribeMock = jest.fn();
    (onSnapshot as unknown as jest.Mock).mockImplementation((_q, onNext) => {
      onNext(mockSnapshot);
      return unsubscribeMock;
    });

    const onUpdate = jest.fn();
    const onError = jest.fn();

    const unsubscribe = listenToAuditLogs(onUpdate, onError);

    expect(onUpdate).toHaveBeenCalledWith([
      { id: "1", timestamp: 1000, action: "entered" },
      { id: "2", timestamp: 2000, action: "clear" },
    ]);
    expect(unsubscribe).toBe(unsubscribeMock);
  });

  it("calls onError when snapshot fails", () => {
    const error = new Error("Firestore error");

    const unsubscribeMock = jest.fn();
    (onSnapshot as unknown as jest.Mock).mockImplementation((_q, _onNext, onErr) => {
      onErr(error);
      return unsubscribeMock;
    });

    const onUpdate = jest.fn();
    const onError = jest.fn();

    listenToAuditLogs(onUpdate, onError);

    expect(onError).toHaveBeenCalledWith(error);
  });
});
});
