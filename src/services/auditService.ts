import { db } from '../firebase';
import { collection, addDoc, query, orderBy, onSnapshot } from 'firebase/firestore';

export interface AuditEvent {
  id: string;
  timestamp: number;
  action: string;
  value?: string;
}

const COLLECTION_NAME = 'calculator_audit_log';

const generateUniqueId = (): string => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 15);
  return `${timestamp}-${random}`;
};

export const logEvent = async (action: string, value?: string): Promise<string> => {
  try {
    const uniqueId = generateUniqueId();
    const event: AuditEvent = {
      id: uniqueId,
      timestamp: Date.now(),
      action,
      value
    };
    const docRef = await addDoc(collection(db, COLLECTION_NAME), event);
    return docRef.id;
  } catch (error) {
    throw error;
  }
};


export const listenToAuditLogs = (
  onUpdate: (logs: AuditEvent[]) => void,
  onError?: (error: Error) => void
) => {
  const auditLogsRef = collection(db, COLLECTION_NAME);
  const q = query(auditLogsRef, orderBy("timestamp", "desc"));

  const unsubscribe = onSnapshot(
    q,
    (querySnapshot) => {
      const auditLogs: AuditEvent[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data() as AuditEvent;
        auditLogs.push(data);
      });
      onUpdate(auditLogs);
    },
    (error) => {
      if (onError) onError(error);
    }
  );

  return unsubscribe;
};