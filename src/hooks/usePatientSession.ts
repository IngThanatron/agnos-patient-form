"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabase";
import type { PatientFormData, PatientStatus } from "@/types/patient";

function generateSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

export function usePatientSession() {
  const [sessionId] = useState<string>(() => {
    if (typeof window !== "undefined") {
      const existing = sessionStorage.getItem("agnos_session_id");
      if (existing) return existing;
      const fresh = generateSessionId();
      sessionStorage.setItem("agnos_session_id", fresh);
      return fresh;
    }
    return generateSessionId();
  });

  const [status, setStatus] = useState<PatientStatus>("idle");
  const [isSyncing, setIsSyncing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const typingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isInitialized = useRef(false);

  // Upsert session on mount
  useEffect(() => {
    if (isInitialized.current) return;
    isInitialized.current = true;

    async function initSession() {
      const { error } = await supabase.from("patient_sessions").upsert(
        {
          session_id: sessionId,
          status: "idle",
          form_data: {},
          last_activity: new Date().toISOString(),
        },
        { onConflict: "session_id" }
      );
      if (error) setError("Could not start session. Check Supabase config.");
    }

    initSession();
  }, [sessionId]);

  const updateFormData = useCallback(
    async (formData: Partial<PatientFormData>) => {
      setIsSyncing(true);

      // Debounce: clear idle timer
      if (typingTimerRef.current) clearTimeout(typingTimerRef.current);

      setStatus("typing");

      const { error } = await supabase.from("patient_sessions").upsert(
        {
          session_id: sessionId,
          status: "typing",
          form_data: formData,
          last_activity: new Date().toISOString(),
        },
        { onConflict: "session_id" }
      );

      setIsSyncing(false);
      if (error) setError("Sync error. Changes may not be visible to staff.");

      // Reset to idle after 2s of inactivity
      typingTimerRef.current = setTimeout(async () => {
        setStatus("idle");
        await supabase
          .from("patient_sessions")
          .update({ status: "idle", last_activity: new Date().toISOString() })
          .eq("session_id", sessionId);
      }, 2000);
    },
    [sessionId]
  );

  const submitForm = useCallback(
    async (formData: PatientFormData) => {
      if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
      setIsSyncing(true);

      const { error } = await supabase.from("patient_sessions").upsert(
        {
          session_id: sessionId,
          status: "submitted",
          form_data: formData,
          last_activity: new Date().toISOString(),
          submitted_at: new Date().toISOString(),
        },
        { onConflict: "session_id" }
      );

      setIsSyncing(false);
      if (error) {
        setError("Submission failed. Please try again.");
        return false;
      }

      setStatus("submitted");
      return true;
    },
    [sessionId]
  );

  return { sessionId, status, isSyncing, error, updateFormData, submitForm };
}
