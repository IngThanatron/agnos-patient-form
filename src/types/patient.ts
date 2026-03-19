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
