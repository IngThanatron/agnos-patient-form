import { z } from "zod";

export const patientFormSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .max(50, "First name must be under 50 characters"),

  middleName: z
    .string()
    .max(50, "Middle name must be under 50 characters")
    .optional()
    .or(z.literal("")),

  lastName: z
    .string()
    .min(1, "Last name is required")
    .max(50, "Last name must be under 50 characters"),

  dateOfBirth: z
    .string()
    .min(1, "Date of birth is required")
    .refine((val) => {
      const date = new Date(val);
      const now = new Date();
      return date < now && date > new Date("1900-01-01");
    }, "Please enter a valid date of birth"),

  gender: z.string().min(1, "Gender is required"),

  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(
      /^[\d\s\+\-\(\)]{7,20}$/,
      "Please enter a valid phone number"
    ),

  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),

  address: z
    .string()
    .min(5, "Please enter a full address")
    .max(200, "Address must be under 200 characters"),

  preferredLanguage: z.string().min(1, "Preferred language is required"),

  nationality: z
    .string()
    .min(1, "Nationality is required")
    .max(60, "Nationality must be under 60 characters"),

  emergencyContactName: z
    .string()
    .max(100)
    .optional()
    .or(z.literal("")),

  emergencyContactRelationship: z
    .string()
    .max(60)
    .optional()
    .or(z.literal("")),

  religion: z
    .string()
    .max(60)
    .optional()
    .or(z.literal("")),
});

export type PatientFormSchema = z.infer<typeof patientFormSchema>;
