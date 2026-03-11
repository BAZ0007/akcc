import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(2, "Please enter your name."),
  email: z.string().email("Please enter a valid email address."),
  phone: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().min(10, "Please share a little more detail."),
});

export const newHereFormSchema = z.object({
  name: z.string().min(2, "Please enter your name."),
  email: z.string().email("Please enter a valid email address."),
  phone: z.string().optional(),
  household_size: z.coerce.number().int().min(1).max(20).optional(),
  prayer_request: z.string().optional(),
  interested_in: z.array(z.string()).min(1, "Choose at least one area of interest."),
});

export const loginSchema = z.object({
  email: z.string().email("Enter the admin email you use for Supabase Auth."),
});

