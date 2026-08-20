import z from 'zod';

export const LoginRequest = z.object({
    email: z.email('Enter a valid email'),
    password: z.string('Password is required'),
});

export type LoginRequestType = z.infer<typeof LoginRequest>;
