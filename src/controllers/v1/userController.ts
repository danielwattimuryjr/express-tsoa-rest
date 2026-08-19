import { Controller, Get, Path, Post, Route } from 'tsoa';
import { UserResponse } from '../../dto';
import { HttpResponse } from '../../common/types/http';
import { StatusCodes } from 'http-status-codes';
import { UserService } from '../../services';
import { UserSerializer } from '../../serializer';
import { UserRequest, UserRequestType } from '../../schema/user.schema';
import { Body, ValidateBody } from '../../decorator';

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
    public async getUser(@Path() userId: number): Promise<HttpResponse<UserResponse>> {
        const user = await UserService.getOne(userId);

        return {
            message: 'User retrieved successfully',
            code: StatusCodes.OK,
            data: UserSerializer.serialize(user),
        };
    }
}
