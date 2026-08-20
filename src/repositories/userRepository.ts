import { Repository } from 'typeorm';
import { AppDataSource } from '../config/typeorm';
import { User } from '../entitites';

class UserRepositoryClass extends Repository<User> {
    constructor() {
        super(User, AppDataSource.manager);
    }

    async findById(id: number) {
        return this.findOne({
            where: { id },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                username: true,
            },
        });
    }

    async findByIdWithRoles(id: number) {
        return this.findOne({
            where: { id },
            relations: {
                roles: true,
            },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                username: true,
                roles: {
                    name: true,
                    id: true,
                },
            },
        });
    }

    async findOneByEmail(email: string) {
        return this.findOne({
            where: { email },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                username: true,
                password: true,
            },
        });
    }
}

export const UserRepository = new UserRepositoryClass();
