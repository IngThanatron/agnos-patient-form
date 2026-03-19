"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import type { PatientSession, PatientSessionRow } from "@/types/patient";

function rowToSession(row: PatientSessionRow): PatientSession {
  return {
    id: row.id,
    sessionId: row.session_id,
    status: row.status,
    formData: row.form_data,
    lastActivity: row.last_activity,
    submittedAt: row.submitted_at ?? undefined,
    createdAt: row.created_at,
  };
}

export function useStaffView() {
  const [sessions, setSessions] = useState<PatientSession[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load existing sessions on mount
  useEffect(() => {
    async function loadSessions() {
      const { data, error } = await supabase
        .from("patient_sessions")
        .select("*")
        .order("last_activity", { ascending: false })
        .limit(50);

      if (error) {
        setError("Could not load sessions. Check Supabase config.");
        return;
      }

      setSessions((data as PatientSessionRow[]).map(rowToSession));
    }

    loadSessions();
  }, []);

  // Subscribe to realtime changes
  useEffect(() => {
    const channel = supabase
      .channel("patient_sessions_realtime")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "patient_sessions",
        },
        (payload) => {
          const updated = rowToSession(payload.new as PatientSessionRow);

          setSessions((prev) => {
            const idx = prev.findIndex((s) => s.sessionId === updated.sessionId);
            if (idx === -1) {
              return [updated, ...prev];
            }
            const next = [...prev];
            next[idx] = updated;
            // Re-sort by last_activity descending
            next.sort(
              (a, b) =>
                new Date(b.lastActivity).getTime() -
                new Date(a.lastActivity).getTime()
            );
            return next;
          });
        }
      )
      .subscribe((status) => {
        setIsConnected(status === "SUBSCRIBED");
        if (status === "CHANNEL_ERROR") {
          setError("Realtime connection failed. Check Supabase Realtime is enabled.");
        }
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { sessions, isConnected, error };
}
