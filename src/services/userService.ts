import { NotFoundError } from "../error";
import { UserRepository } from "../repositories";

export class UserService {
    static async getOne(userId: number) {
        const user = await UserRepository.findById(userId)

        if (!user)
            throw new NotFoundError('User not found')

        return user
    }
}