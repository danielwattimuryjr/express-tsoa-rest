import { Expose } from 'class-transformer';
import z from 'zod';
import { loginSchema } from '../schema';

export class LoginResponse {
    @Expose()
    email: number;

    @Expose()
    username: string;

    @Expose()
    accessToken: string;

    @Expose()
    refreshToken: string;
}

export type LoginRequest = z.infer<typeof loginSchema>;
