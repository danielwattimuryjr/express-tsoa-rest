import { Controller, Post, Route } from 'tsoa';
import { Body, ValidateBody } from '../../decorator';
import { LoginRequest, LoginRequestType } from '../../schema/auth.schema';
import { HttpResponse } from '../../common/types/http';
import { LoginResponse } from '../../dto/auth';
import { AuthService } from '../../services/authService';
import { StatusCodes } from 'http-status-codes';
import { AuthSerializer } from '../../serializer/authSerializer';

@Route('auth')
export class AuthController extends Controller {
    @Post('login')
    @ValidateBody(LoginRequest)
    public async login(@Body() body: LoginRequestType): Promise<HttpResponse<LoginResponse>> {
        const data = await AuthService.login(body);

        return {
            code: StatusCodes.OK,
            message: 'Login successfull',
            data: AuthSerializer.serialize(data),
        };
    }
}
