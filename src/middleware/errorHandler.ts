import type { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import type { HttpResponse } from '../common/types/http';
import { ForbiddenError, NotFoundError, UnauthorizedError, ValidationError } from '../error';

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction): void {
    const response: HttpResponse<unknown> = {
        code: StatusCodes.INTERNAL_SERVER_ERROR,
        message: err.message,
        data: undefined,
    };

    if (ValidationError.isError(err)) {
        response.code = err.code;
        response.data = err.data;
    } else if (NotFoundError.isError(err)) {
        response.code = err.code;
        response.data = err.url;
    } else if (UnauthorizedError.isError(err)) {
        response.code = err.code;
    } else if (ForbiddenError.isError(err)) {
        response.code = err.code;
    } else {
        response.message = 'Unknown error';
        console.log(err.stack);
    }

    if (!response.data) {
        delete response.data;
    }

    if (res.headersSent) {
        return next(err);
    }

    res.status(response.code).json(response);
}
