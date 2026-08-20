import jwt from 'jsonwebtoken';
import moment from 'moment';
import config from '../config/config';

interface TokenPayload {
    sub: string;
    type: 'access' | 'refresh';
    iat: number;
    exp: number;
}

export interface AccessTokenPayload extends TokenPayload {
    type: 'access';
}

export interface RefreshTokenPayload extends TokenPayload {
    type: 'refresh';
    jti: string;
}

export class JwtService {
    private static readonly ACCESS_TOKEN_EXPIRES_IN_MINUTES = config.JWT_ACCESS_EXPIRATION_MINUTES;

    private static readonly REFRESH_TOKEN_EXPIRES_IN_DAYS = config.JWT_REFRESH_EXPIRATION_DAYS;

    static generateAccessToken(userId: string): string {
        return jwt.sign(
            {
                sub: userId,
                type: 'access',
            },
            config.JWT_SECRET,
            {
                algorithm: 'HS256',
                expiresIn: `${this.ACCESS_TOKEN_EXPIRES_IN_MINUTES}m`,
            },
        );
    }

    static generateRefreshToken(userId: string, tokenId: string): string {
        return jwt.sign(
            {
                sub: userId,
                jti: tokenId,
                type: 'refresh',
            },
            config.JWT_SECRET,
            {
                algorithm: 'HS256',
                expiresIn: `${this.REFRESH_TOKEN_EXPIRES_IN_DAYS}d`,
            },
        );
    }

    static getAccessTokenExpiration(): Date {
        return moment().add(this.ACCESS_TOKEN_EXPIRES_IN_MINUTES, 'minutes').toDate();
    }

    static getRefreshTokenExpiration(): Date {
        return moment().add(this.REFRESH_TOKEN_EXPIRES_IN_DAYS, 'days').toDate();
    }

    static verifyAccessToken(token: string): AccessTokenPayload {
        const payload = this.verify(token, config.JWT_SECRET);

        if (payload.type !== 'access') {
            throw new Error('Invalid access token');
        }

        return payload as AccessTokenPayload;
    }

    static verifyRefreshToken(token: string): RefreshTokenPayload {
        const payload = this.verify(token, config.JWT_SECRET);

        if (payload.type !== 'refresh') {
            throw new Error('Invalid refresh token');
        }

        if (!('jti' in payload)) {
            throw new Error('Refresh token is missing jti');
        }

        return payload as RefreshTokenPayload;
    }

    private static verify(token: string, secret: string): TokenPayload {
        const payload = jwt.verify(token, secret, {
            algorithms: ['HS256'],
        });

        if (typeof payload === 'string') {
            throw new Error('Invalid token payload');
        }

        if (
            typeof payload.sub !== 'string' ||
            typeof payload.type !== 'string' ||
            typeof payload.iat !== 'number' ||
            typeof payload.exp !== 'number'
        ) {
            throw new Error('Invalid token payload');
        }

        if (payload.type !== 'access' && payload.type !== 'refresh') {
            throw new Error('Invalid token type');
        }

        return {
            sub: payload.sub,
            type: payload.type,
            iat: payload.iat,
            exp: payload.exp,
        };
    }
}
