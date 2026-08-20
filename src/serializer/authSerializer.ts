import { serialize } from '.';
import { LoginResponse } from '../dto/auth';
import { User } from '../entitites';

export class AuthSerializer {
    static serialize(raw: {
        user: User;
        accessToken: string;
        refreshToken: string;
    }): LoginResponse {
        return serialize(LoginResponse, raw);
    }
}
