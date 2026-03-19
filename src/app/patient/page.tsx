"use client";

import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePatientSession } from "@/hooks/usePatientSession";
import { patientFormSchema, type PatientFormSchema } from "@/lib/validation";
import { StatusIndicator } from "@/components/shared/StatusIndicator";
import clsx from "clsx";

const LANGUAGES = [
  "English", "Thai", "Mandarin", "Japanese", "Korean",
  "French", "Arabic", "Spanish", "German", "Hindi",
];

const GENDERS = ["Male", "Female", "Non-binary", "Prefer not to say"];

export default function PatientPage() {
  const { status, isSyncing, error, updateFormData, submitForm } =
    usePatientSession();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<PatientFormSchema>({
    resolver: zodResolver(patientFormSchema),
    mode: "onBlur",
  });

  // Sync to Supabase on every change (debounced inside hook)
  const watchedValues = watch();
  const syncRef = useCallback(() => {
    updateFormData(watchedValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(watchedValues)]);

  useEffect(() => {
    if (!isSubmitSuccessful) syncRef();
  }, [syncRef, isSubmitSuccessful]);

  const onSubmit = async (data: PatientFormSchema) => {
    await submitForm(data);
  };

  if (isSubmitSuccessful && status === "submitted") {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-clinical-50">
        <div className="w-full max-w-md bg-white border border-clinical-border rounded-xl p-8 text-center">
          <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-clinical-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="font-display text-2xl text-clinical-text mb-2">Registration Complete</h2>
          <p className="text-sm text-clinical-muted">
            Your information has been submitted and the staff has been notified.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-clinical-50">
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white border border-clinical-border rounded-xl px-6 py-4 mb-4 flex items-center justify-between">
          <div>
            <h1 className="font-display text-xl text-clinical-text">Patient Registration</h1>
            <p className="text-[11px] text-clinical-muted mt-0.5">All fields marked * are required</p>
          </div>
          <div className="flex items-center gap-2">
            {isSyncing && (
              <span className="text-[10px] text-clinical-muted animate-pulse">Syncing…</span>
            )}
            <StatusIndicator status={status} />
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg px-4 py-3 mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>

          {/* Personal Information */}
          <section className="bg-white border border-clinical-border rounded-xl p-5">
            <h2 className="text-[11px] font-medium tracking-widest uppercase text-clinical-muted mb-4">
              Personal Information
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
              <div>
                <label className="form-label">First Name *</label>
                <input
                  {...register("firstName")}
                  className={clsx("form-input", errors.firstName && "error")}
                  placeholder="Jane"
                />
                {errors.firstName && (
                  <p className="form-error">{errors.firstName.message}</p>
                )}
              </div>
              <div>
                <label className="form-label">Middle Name</label>
                <input
                  {...register("middleName")}
                  className="form-input"
                  placeholder="A."
                />
              </div>
              <div>
                <label className="form-label">Last Name *</label>
                <input
                  {...register("lastName")}
                  className={clsx("form-input", errors.lastName && "error")}
                  placeholder="Doe"
                />
                {errors.lastName && (
                  <p className="form-error">{errors.lastName.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="form-label">Date of Birth *</label>
                <input
                  {...register("dateOfBirth")}
                  type="date"
                  className={clsx("form-input", errors.dateOfBirth && "error")}
                />
                {errors.dateOfBirth && (
                  <p className="form-error">{errors.dateOfBirth.message}</p>
                )}
              </div>
              <div>
                <label className="form-label">Gender *</label>
                <select
                  {...register("gender")}
                  className={clsx("form-select", errors.gender && "error")}
                >
                  <option value="">Select gender</option>
                  {GENDERS.map((g) => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>
                {errors.gender && (
                  <p className="form-error">{errors.gender.message}</p>
                )}
              </div>
            </div>
          </section>

          {/* Contact Details */}
          <section className="bg-white border border-clinical-border rounded-xl p-5">
            <h2 className="text-[11px] font-medium tracking-widest uppercase text-clinical-muted mb-4">
              Contact Details
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
              <div>
                <label className="form-label">Phone *</label>
                <input
                  {...register("phone")}
                  type="tel"
                  className={clsx("form-input", errors.phone && "error")}
                  placeholder="+66 81 234 5678"
                />
                {errors.phone && (
                  <p className="form-error">{errors.phone.message}</p>
                )}
              </div>
              <div>
                <label className="form-label">Email *</label>
                <input
                  {...register("email")}
                  type="email"
                  className={clsx("form-input", errors.email && "error")}
                  placeholder="jane@email.com"
                />
                {errors.email && (
                  <p className="form-error">{errors.email.message}</p>
                )}
              </div>
            </div>

            <div>
              <label className="form-label">Address *</label>
              <input
                {...register("address")}
                className={clsx("form-input", errors.address && "error")}
                placeholder="123 Main St, Bangkok 10110"
              />
              {errors.address && (
                <p className="form-error">{errors.address.message}</p>
              )}
            </div>
          </section>

          {/* Additional Details */}
          <section className="bg-white border border-clinical-border rounded-xl p-5">
            <h2 className="text-[11px] font-medium tracking-widest uppercase text-clinical-muted mb-4">
              Additional Details
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
              <div>
                <label className="form-label">Preferred Language *</label>
                <select
                  {...register("preferredLanguage")}
                  className={clsx("form-select", errors.preferredLanguage && "error")}
                >
                  <option value="">Select language</option>
                  {LANGUAGES.map((l) => (
                    <option key={l} value={l}>{l}</option>
                  ))}
                </select>
                {errors.preferredLanguage && (
                  <p className="form-error">{errors.preferredLanguage.message}</p>
                )}
              </div>
              <div>
                <label className="form-label">Nationality *</label>
                <input
                  {...register("nationality")}
                  className={clsx("form-input", errors.nationality && "error")}
                  placeholder="Thai"
                />
                {errors.nationality && (
                  <p className="form-error">{errors.nationality.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
              <div>
                <label className="form-label">Emergency Contact Name</label>
                <input
                  {...register("emergencyContactName")}
                  className="form-input"
                  placeholder="Full name"
                />
              </div>
              <div>
                <label className="form-label">Relationship</label>
                <input
                  {...register("emergencyContactRelationship")}
                  className="form-input"
                  placeholder="e.g. Spouse, Parent"
                />
              </div>
            </div>

            <div>
              <label className="form-label">Religion</label>
              <input
                {...register("religion")}
                className="form-input"
                placeholder="e.g. Buddhist, Christian"
              />
            </div>
          </section>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary"
          >
            {isSubmitting ? "Submitting…" : "Submit Registration"}
          </button>
        </form>
      </div>
    </main>
  );
}
