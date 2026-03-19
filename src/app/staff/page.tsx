"use client";

import { useStaffView } from "@/hooks/useStaffView";
import { SessionCard } from "@/components/staff/SessionCard";

export default function StaffPage() {
  const { sessions, isConnected, error } = useStaffView();

  const activeSessions = sessions.filter((s) => s.status === "typing");
  const submittedSessions = sessions.filter((s) => s.status === "submitted");
  const idleSessions = sessions.filter((s) => s.status === "idle");

  return (
    <main className="min-h-screen bg-clinical-50">
      <div className="max-w-5xl mx-auto px-4 py-8">

        {/* Header */}
        <div className="bg-white border border-clinical-border rounded-xl px-6 py-4 mb-6 flex items-center justify-between">
          <div>
            <h1 className="font-display text-xl text-clinical-text">Staff Monitor</h1>
            <p className="text-[11px] text-clinical-muted mt-0.5">Live patient registration activity</p>
          </div>
          <div className="flex items-center gap-2 text-[11px]">
            <span
              className={`w-2 h-2 rounded-full ${
                isConnected ? "bg-clinical-green" : "bg-clinical-muted"
              }`}
            />
            <span className="text-clinical-muted">
              {isConnected ? "Live" : "Connecting…"}
            </span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { label: "Active now", value: activeSessions.length, color: "text-clinical-blue" },
            { label: "Submitted", value: submittedSessions.length, color: "text-clinical-green" },
            { label: "Total sessions", value: sessions.length, color: "text-clinical-text" },
          ].map(({ label, value, color }) => (
            <div key={label} className="bg-white border border-clinical-border rounded-xl px-4 py-3">
              <p className="text-[11px] text-clinical-muted mb-1">{label}</p>
              <p className={`text-2xl font-medium ${color}`}>{value}</p>
            </div>
          ))}
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg px-4 py-3 mb-4">
            {error}
          </div>
        )}

        {sessions.length === 0 && !error && (
          <div className="bg-white border border-clinical-border rounded-xl p-12 text-center">
            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-3">
              <svg className="w-5 h-5 text-clinical-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <p className="text-sm font-medium text-clinical-text mb-1">Waiting for patients</p>
            <p className="text-xs text-clinical-muted">Sessions will appear here as patients start filling the form</p>
          </div>
        )}

        {/* Active sessions */}
        {activeSessions.length > 0 && (
          <div className="mb-6">
            <h2 className="text-[11px] font-medium tracking-widest uppercase text-clinical-muted mb-3">
              Active — {activeSessions.length}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {activeSessions.map((s) => (
                <SessionCard key={s.sessionId} session={s} />
              ))}
            </div>
          </div>
        )}

        {/* Submitted sessions */}
        {submittedSessions.length > 0 && (
          <div className="mb-6">
            <h2 className="text-[11px] font-medium tracking-widest uppercase text-clinical-muted mb-3">
              Submitted — {submittedSessions.length}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {submittedSessions.map((s) => (
                <SessionCard key={s.sessionId} session={s} />
              ))}
            </div>
          </div>
        )}

        {/* Idle sessions */}
        {idleSessions.length > 0 && (
          <div>
            <h2 className="text-[11px] font-medium tracking-widest uppercase text-clinical-muted mb-3">
              Idle — {idleSessions.length}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {idleSessions.map((s) => (
                <SessionCard key={s.sessionId} session={s} />
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
