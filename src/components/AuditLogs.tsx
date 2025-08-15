import React, { useState, useEffect } from "react";
import { listenToAuditLogs, AuditEvent } from "../services/auditService";
import "../css/AuditLogs.css";

const AuditLogs: React.FC = () => {
  const [logs, setLogs] = useState<AuditEvent[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = listenToAuditLogs(
      (newLogs) => {
        setLogs(newLogs);
        setError(null);
      },
      (err) => {
        setError("Failed to load audit logs: " + err.message);
      }
    );

    return () => unsubscribe();
  }, []);

  const formatTimestamp = (timestamp: number) =>
    new Date(timestamp).toLocaleString();

  return (
    <div className="audit-logs">
      <h2>Audit Logs</h2>

      {error && <div className="error">{error}</div>}

      {!error && logs.length === 0 && (
        <div className="no-data">No audit logs available</div>
      )}

      <div className="logs-container">
        {logs.map((log) => (
          <div key={log.id} className="log-entry">
            <span className="timestamp">{formatTimestamp(log.timestamp)}</span>
            <span className="action">{log.action}</span>
            {log.value && <span className="value">{log.value}</span>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AuditLogs;
