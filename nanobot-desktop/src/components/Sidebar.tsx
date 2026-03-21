/**
 * Sidebar navigation component.
 * Displays brand, tab navigation buttons, and status footer.
 */
import React, { memo } from "react";
import type { TabKey, Status } from "../types";
import { useSettings } from "../hooks/useSettings";

type Props = {
  tab: TabKey;
  setTab: (t: TabKey) => void;
  status: Status;
  currentSession: string;
};

const NAV_ITEMS: { key: TabKey; label: string }[] = [
  { key: "chat", label: "Chat" },
  { key: "monitor", label: "Monitor" },
  { key: "cron", label: "Cron" },
  { key: "sessions", label: "Sessions" },
  { key: "skills", label: "Skills" },
  { key: "memory", label: "Memory" },
  { key: "models", label: "Models" },
];

export default memo(function Sidebar({ tab, setTab, status, currentSession }: Props) {
  const { t } = useSettings();

  return (
    <aside className="sidebar">
      <div className="brand">
        Nanobot Desktop
      </div>
      <nav className="nav" role="tablist" aria-label="Main Navigation">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.key}
            className={tab === item.key ? "active" : ""}
            onClick={() => setTab(item.key)}
            role="tab"
            aria-selected={tab === item.key}
            aria-controls={`panel-${item.key}`}
            title={t(`nav.${item.key}` as any)}
          >
            {t(`nav.${item.key}` as any)}
          </button>
        ))}
      </nav>
      <div className="sidebar-footer">
        <div className="status-row">
          <span className="status-text">
            {t("status.agent")}
            <span
              className={`breath-dot agent ${status.agent ? "on" : "off"}`}
              title={`Agent ${status.agent ? "running" : "stopped"}`}
            />
            <span className="status-text-label">
              {status.agent ? t("status.running") : t("status.stopped")}
            </span>
          </span>
        </div>
        <div className="status-row">
          <span className="status-text">
            {t("status.gateway")}
            <span
              className={`breath-dot gateway ${status.gateway ? "on" : "off"}`}
              title={`Gateway ${status.gateway ? "running" : "stopped"}`}
            />
            <span className="status-text-label">
              {status.gateway ? t("status.running") : t("status.stopped")}
            </span>
          </span>
        </div>
        <div className="status-row session-row">
          <span className="session-label">{t("status.session")}</span>
          <span className="session" title={currentSession}>{currentSession}</span>
        </div>
        <div className="status-row session-row" style={{ marginTop: "4px" }}>
          <button 
            onClick={() => setTab("settings")}
            style={{ 
              width: "100%", textAlign: "left", padding: "8px 10px", borderRadius: "10px", 
              background: tab === "settings" ? "var(--border)" : "transparent", 
              border: "none", cursor: "pointer", display: "flex", alignItems: "center", 
              gap: "8px", fontWeight: 600, color: "var(--text)", transition: "0.2s"
            }}
          >
            <span style={{ fontSize: "16px" }}>⚙️</span> {t("nav.settings")}
          </button>
        </div>
      </div>
    </aside>
  );
});
