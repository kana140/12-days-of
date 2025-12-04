import * as z from "zod";

export type Calendar = {
  id: string;
  user_id: string;
  receiver_name: string;
  receiver_email: string;
  start_date: string;
  number_of_days: string;
};

export type Gift = {
  id: string;
  name: string;
  dashboard_id: string;
  description: string;
  image: string;
  link: string;
  day: string;
  opened: boolean;
};

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export const SignupFormSchema = z.object({
  name: z
    .string()
    .min(2, { error: "Name must be at least 2 characters long." })
    .trim(),
  email: z.email({ error: "Please enter a valid email." }).trim(),
  password: z
    .string()
    .min(8, { error: "Be at least 8 characters long" })
    .regex(/[a-zA-Z]/, { error: "Contain at least one letter." })
    .regex(/[0-9]/, { error: "Contain at least one number." })
    .trim(),
});

export type FormState =
  | {
      errors?: {
        name?: string[];
        email?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;
