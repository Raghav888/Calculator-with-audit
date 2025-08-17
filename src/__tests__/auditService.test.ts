import { logEvent, fetchAuditHistory, AuditEvent } from "../services/auditService";

global.fetch = jest.fn();

describe("Audit Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("logEvent", () => {
    it("should call fetch with correct parameters", async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
      });

      const action = "TEST_ACTION";
      const value = "some value";

      await logEvent(action, value);

      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith(
        "https://calculator-app-be.onrender.com/audit",
        expect.objectContaining({
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: expect.stringContaining(action),
        })
      );
    });

    it("should handle fetch error gracefully", async () => {
      const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});
      (fetch as jest.Mock).mockRejectedValueOnce(new Error("Network error"));

      await logEvent("ACTION", "VALUE");

      expect(consoleSpy).toHaveBeenCalledWith(
        "Error logging audit event:",
        expect.any(Error)
      );

      consoleSpy.mockRestore();
    });
  });

  describe("fetchAuditHistory", () => {
    it("should fetch and return audit events", async () => {
      const mockEvents: AuditEvent[] = [
        { id: "1", timestamp: 123, action: "ACTION_1", value: "val1" },
        { id: "2", timestamp: 124, action: "ACTION_2" },
      ];

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ events: mockEvents }),
      });

      const result = await fetchAuditHistory();
      expect(result).toEqual(mockEvents);
      expect(fetch).toHaveBeenCalledWith(
        "https://calculator-app-be.onrender.com/audit/history",
        expect.objectContaining({ method: "GET" })
      );
    });

    it("should throw error if fetch fails", async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        statusText: "Server Error",
      });

      await expect(fetchAuditHistory()).rejects.toThrow(
        "Failed to fetch audit history: Server Error"
      );
    });
  });
});
