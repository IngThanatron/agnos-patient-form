"use client";

import { useEffect, useRef, useState } from "react";
import type { PatientSession } from "@/types/patient";
import { StatusIndicator } from "@/components/shared/StatusIndicator";
import { formatDistanceToNow } from "date-fns";

interface SessionCardProps {
  session: PatientSession;
}

const FIELD_LABELS: Array<{
  key: keyof PatientSession["formData"];
  label: string;
}> = [
  { key: "firstName", label: "First Name" },
  { key: "middleName", label: "Middle Name" },
  { key: "lastName", label: "Last Name" },
  { key: "dateOfBirth", label: "Date of Birth" },
  { key: "gender", label: "Gender" },
  { key: "phone", label: "Phone" },
  { key: "email", label: "Email" },
  { key: "address", label: "Address" },
  { key: "preferredLanguage", label: "Language" },
  { key: "nationality", label: "Nationality" },
  { key: "emergencyContactName", label: "Emergency Contact" },
  { key: "emergencyContactRelationship", label: "EC Relationship" },
  { key: "religion", label: "Religion" },
];

function FlashValue({ value }: { value: string | undefined }) {
  const [flash, setFlash] = useState(false);
  const prev = useRef(value);

  useEffect(() => {
    if (value !== prev.current) {
      prev.current = value;
      setFlash(true);
      const t = setTimeout(() => setFlash(false), 600);
      return () => clearTimeout(t);
    }
  }, [value]);

  if (!value) {
    return <span className="text-clinical-muted text-xs italic">—</span>;
  }

  return (
    <span
      className={`text-xs text-clinical-text transition-all ${flash ? "animate-flash-in" : ""}`}
    >
      {value}
    </span>
  );
}

export function SessionCard({ session }: SessionCardProps) {
  const completedFields = FIELD_LABELS.filter(
    ({ key }) => !!session.formData[key]
  ).length;
  const totalRequired = 9;
  const progress = Math.min(
    Math.round((completedFields / totalRequired) * 100),
    100
  );

  return (
    <div className="bg-white border border-clinical-border rounded-xl overflow-hidden">
      {/* Card header */}
      <div className="px-4 py-3 border-b border-clinical-border flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-7 h-7 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
            <svg className="w-3.5 h-3.5 text-clinical-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <div className="min-w-0">
            <p className="text-xs font-medium text-clinical-text truncate">
              {session.formData.firstName && session.formData.lastName
                ? `${session.formData.firstName} ${session.formData.lastName}`
                : "Anonymous Patient"}
            </p>
            <p className="text-[10px] text-clinical-muted truncate">
              {formatDistanceToNow(new Date(session.lastActivity), {
                addSuffix: true,
              })}
            </p>
          </div>
        </div>
        <StatusIndicator status={session.status} size="sm" />
      </div>

      {/* Progress bar */}
      <div className="px-4 pt-3 pb-1">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[10px] text-clinical-muted">Form progress</span>
          <span className="text-[10px] font-medium text-clinical-muted">{progress}%</span>
        </div>
        <div className="h-1 bg-clinical-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-clinical-blue rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Fields grid */}
      <div className="px-4 py-3 space-y-1.5">
        {FIELD_LABELS.map(({ key, label }) => (
          <div key={key} className="flex items-start justify-between gap-2 py-1 border-b border-clinical-50 last:border-0">
            <span className="text-[10px] font-medium uppercase tracking-wider text-clinical-muted w-24 flex-shrink-0 pt-0.5">
              {label}
            </span>
            <FlashValue value={session.formData[key]} />
          </div>
        ))}
      </div>

      {session.submittedAt && (
        <div className="px-4 py-2.5 bg-emerald-50 border-t border-clinical-border">
          <p className="text-[10px] text-clinical-green font-medium">
            Submitted {formatDistanceToNow(new Date(session.submittedAt), { addSuffix: true })}
          </p>
        </div>
      )}
    </div>
  );
}
