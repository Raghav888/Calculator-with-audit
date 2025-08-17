export interface AuditEvent {
  id: string;
  timestamp: number;
  action: string;
  value?: string;
}

const BASE_URL = "https://calculator-app-be.onrender.com";
const generateUniqueId = (): string => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 15);
  return `${timestamp}-${random}`;
};

export async function logEvent(action: string,value : any) {
  try {
    const res = await fetch(`${BASE_URL}/audit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        value,
        action,
        id: generateUniqueId(),
      }),
    });
  } catch (err) {
    console.error("Error logging audit event:", err);
  }
}

export async function fetchAuditHistory(): Promise<AuditEvent[]> {
  const response = await fetch(`${BASE_URL}/audit/history`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch audit history: ${response.statusText}`);
  }

  const data = await response.json();
  return data.events; // assuming { events: AuditEvent[] }
}