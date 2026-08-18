import { StatusCodes } from 'http-status-codes';
import type z from 'zod';

export class ValidationError extends Error {
    static readonly errorName = 'ValidationError';
    static readonly code = StatusCodes.UNPROCESSABLE_ENTITY;

    name = ValidationError.errorName;
    code: StatusCodes;
    data: z.core.$ZodIssue[];

    constructor(message: string, data: z.core.$ZodIssue[]) {
        super(message);
        this.code = ValidationError.code;
        this.data = data;
    }

    static isError(err: unknown): err is ValidationError {
        if (err && err instanceof Error) {
            return err.name === ValidationError.errorName;
        }
        return false;
    }
}