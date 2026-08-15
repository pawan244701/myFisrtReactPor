// now starting to migrate whole project to typescript from plain js

import { z } from 'zod'; // removing email bcoz DontKnowWhy the fuck I imported that when zod never exported that HAHAHAHAaaaaaaaa

export const signupSchema = z.object({
    full_name: z.string().min(3, "full_name must be at least 3 char"),
    email: z.email("Invalid email format!"), // removing .string() method it is deprecated
    password: z.string().min(8, "Password must be at least 8 char")
});

export const loginSchema = z.object({
    email: z.email("Invalid email format!"),  // removing .string() method it is deprecated
    password: z.string().min(8, "Password is required!")
});

export const verifyOtpSchema = z.object({
    email: z.email("Invalid email format!"),  // removing .string() method it is deprecated
    otpCode: z.string().length(7, "Otp must be exactaly & digits").regex(/^\d+$/, "Otp must contain numbers only")
})


export type SignupInput = z.infer<typeof signupSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type VerifyOtpInput = z.infer<typeof verifyOtpSchema>;

