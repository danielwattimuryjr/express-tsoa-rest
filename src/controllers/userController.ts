import { Controller, Get, Path, Route } from "tsoa"
import { UserResponse } from "../dto";
import { HttpResponse } from "../common/types/http";
import { UserService } from "../services/userService";
import { StatusCodes } from "http-status-codes";
import { UserSerializer } from "../serializer/userSerializer";

@Route('users')
export class UserController extends Controller {
    @Get('{userId}')
    public async getUser(
        @Path() userId: number
    ): Promise<HttpResponse<UserResponse>> {
        const user = await UserService.getOne(userId)

        return {
            message: "User retrieved successfully",
            code: StatusCodes.OK,
            data: UserSerializer.serialize(user),
        };
    }
}