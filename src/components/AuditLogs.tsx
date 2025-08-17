import React, { useState, useEffect } from "react";
import { AuditEvent, fetchAuditHistory } from "../services/auditService";
import "../css/AuditLogs.css";

const AuditLogs: React.FC = () => {
  const [logs, setLogs] = useState<AuditEvent[]>([]);
  const [error, setError] = useState<string | null>(null);

  const loadHistory = async () => {
    try {
      const history = await fetchAuditHistory();
      setLogs(history);
      setError(null);
    } catch (error: any) {
      setError("Failed to load audit history: " + error.message);
    }
  };
  useEffect(() => {
    loadHistory();
  }, []);

  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp);
    return isNaN(date.getTime()) ? "Invalid date" : date.toLocaleString();
  };

  return (
    <div className="audit-logs">
      <h2>Audit Logs</h2>

      {error && <div className="error">{error}</div>}

      {!error && logs.length === 0 && (
        <div className="no-data">No audit logs available</div>
      )}
      <button className="show-logs-button" onClick={() => loadHistory()}>
        Refresh
      </button>
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
