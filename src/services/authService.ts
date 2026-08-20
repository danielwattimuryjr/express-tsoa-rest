import { NotFoundError, UnauthorizedError } from '../error';
import { UserRepository } from '../repositories';
import { LoginRequestType } from '../schema/auth.schema';
import bcrypt from 'bcrypt';
import { JwtService } from './jwtService';

export class AuthService {
    static async login(body: LoginRequestType) {
        const user = await UserRepository.findOneByEmail(body.email);
        if (!user) throw new NotFoundError('User not found');
        const userId = user.id.toString();

        const isPasswordValid = await bcrypt.compare(body.password, user.password);
        if (!isPasswordValid) throw new UnauthorizedError();

        const accessToken = JwtService.generateAccessToken(userId);
        const refreshToken = JwtService.generateRefreshToken(userId, crypto.randomUUID());

        return {
            user,
            accessToken,
            refreshToken,
        };
    }
}
