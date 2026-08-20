import { Repository } from 'typeorm';
import { RefreshToken } from '../entitites';
import { AppDataSource } from '../config/typeorm';

class RefreshTokenRepositoryClass extends Repository<RefreshToken> {
    constructor() {
        super(RefreshToken, AppDataSource.manager);
    }

    async findById(id: number) {
        return this.findOne({
            where: { id },
            select: {
                id: true,
                expiresAt: true,
                revoked: true,
            },
        });
    }
}

export const RefreshTokenRepository = new RefreshTokenRepositoryClass();
