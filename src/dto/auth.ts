import { Expose } from 'class-transformer';

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
