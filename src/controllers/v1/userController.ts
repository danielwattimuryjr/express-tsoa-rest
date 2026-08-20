import { Controller, Get, Middlewares, Path, Post, Route, Security } from 'tsoa';
import { UserResponse } from '../../dto';
import { HttpResponse } from '../../common/types/http';
import { StatusCodes } from 'http-status-codes';
import { UserService } from '../../services';
import { UserSerializer } from '../../serializer';
import { UserRequest, UserRequestType } from '../../schema/user.schema';
import { Body, ValidateBody } from '../../decorator';
import { checkUserPermissionMiddleware } from '../../middleware/checkUserPermission';
import { RoleEnum } from '../../common/enum/RoleEnum';

@Route('users')
export class UserController extends Controller {
    @Post('')
    @ValidateBody(UserRequest)
    public async createUser(@Body() request: UserRequestType): Promise<HttpResponse<UserResponse>> {
        const user = await UserService.createUser(request);

        this.setStatus(StatusCodes.CREATED);
        return {
            message: 'User created successfully',
            code: StatusCodes.CREATED,
            data: UserSerializer.serialize(user),
        };
    }

    @Get('{userId}')
    @Security('bearerAuth')
    @Middlewares(
        checkUserPermissionMiddleware({
            type: 'role',
            values: [RoleEnum.ADMIN],
        }),
    )
    public async getUser(@Path() userId: number): Promise<HttpResponse<UserResponse>> {
        const user = await UserService.getOne(userId);

        return {
            message: 'User retrieved successfully',
            code: StatusCodes.OK,
            data: UserSerializer.serialize(user),
        };
    }
}
