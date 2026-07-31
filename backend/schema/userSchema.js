import { email, z } from 'zod';

export const signupSchema = z.object({
    username: z.string().min(3, "Username must be at least 3 char"),
    email: z.string().email("Invalid email format!"),
    password: z.string().min(8, "Password must be at least 8 char")
});

export const loginSchema = z.object({
    email: z.string().email("Invalid email format!"),
    password: z.string().min(8, "Password is required!")
});

export const verifyOtpSchema = z.object({
    email: z.string().email("Invalid email format!"),
    otpCode: z.string().length(7, "Otp must be exactaly & digits").regex(/^\d+$/, "Otp must contain numbers only")
})


