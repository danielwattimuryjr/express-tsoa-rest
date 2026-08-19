import { NotFoundError } from '../error';
import { UserRepository } from '../repositories';
import bcrypt from 'bcrypt';
import { UserRequestType } from '../schema/user.schema';
import { RoleEnum } from '../common/enum/RoleEnum';

export class UserService {
    static async getOne(userId: number) {
        const user = await UserRepository.findById(userId);

        if (!user) throw new NotFoundError('User not found');

        return user;
    }

    static async createUser(request: UserRequestType) {
        const hashedPassword = await bcrypt.hash(request.password, 12);

        const userInstance = UserRepository.create({
            email: request.email,
            firstName: request.firstName,
            lastName: request.lastName,
            password: hashedPassword,
            username: request.username,
            roles: [
                {
                    id: RoleEnum.USER,
                },
            ],
        });

        const user = await UserRepository.save(userInstance);

        return user;
    }
}
