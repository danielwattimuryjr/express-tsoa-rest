import { Controller, Post, Route } from 'tsoa';
import { Body, ValidateBody } from '../../decorator';
import { HttpResponse } from '../../common/types/http';
import { LoginRequest, LoginResponse } from '../../dto/auth';
import { StatusCodes } from 'http-status-codes';
import { AuthSerializer } from '../../serializer';
import { AuthService } from '../../services';
import { loginSchema } from '../../schema';

@Route('auth')
export class AuthController extends Controller {
    @Post('login')
    @ValidateBody(loginSchema)
    public async login(@Body() body: LoginRequest): Promise<HttpResponse<LoginResponse>> {
        const data = await AuthService.login(body);

        return {
            code: StatusCodes.OK,
            message: 'Login successfull',
            data: AuthSerializer.serialize(data),
        };
    }
}
