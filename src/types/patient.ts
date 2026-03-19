export type PatientStatus = "idle" | "typing" | "submitted";

export interface PatientFormData {
  firstName: string;
  middleName?: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  phone: string;
  email: string;
  address: string;
  preferredLanguage: string;
  nationality: string;
  emergencyContactName?: string;
  emergencyContactRelationship?: string;
  religion?: string;
}

export interface PatientSession {
  id: string;
  sessionId: string;
  status: PatientStatus;
  formData: Partial<PatientFormData>;
  lastActivity: string;
  submittedAt?: string;
  createdAt: string;
}

// Supabase table row shape
export interface PatientSessionRow {
  id: string;
  session_id: string;
  status: PatientStatus;
  form_data: Partial<PatientFormData>;
  last_activity: string;
  submitted_at: string | null;
  created_at: string;
}
