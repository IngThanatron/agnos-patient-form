import { createClient } from "@supabase/supabase-js";
import type { PatientStatus } from "@/types/patient";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Untyped client — avoids "never" inference with Supabase generics.
// Types are applied manually at read sites via SessionRow cast.
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type SessionRow = {
  id: string;
  session_id: string;
  status: PatientStatus;
  form_data: Record<string, unknown>;
  last_activity: string;
  submitted_at: string | null;
  created_at: string;
};
