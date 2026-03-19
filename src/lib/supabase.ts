import { createClient } from "@supabase/supabase-js";
import type { PatientSessionRow } from "@/types/patient";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export type Database = {
  public: {
    Tables: {
      patient_sessions: {
        Row: PatientSessionRow;
        Insert: Omit<PatientSessionRow, "id" | "created_at">;
        Update: Partial<Omit<PatientSessionRow, "id" | "created_at">>;
      };
    };
  };
};

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
