import { NextFunction, Request, RequestHandler, Response } from 'express';
import passport from 'passport';
import { ForbiddenError, UnauthorizedError } from '../error';
import { RoleEnum } from '../common/enum/RoleEnum';

type AuthorizationPolicy =
    | RoleAuthorizationPolicy
    // | PermissionAuthorizationPolicy
    | {
          type: 'authenticated';
      }
    | false;

type RoleAuthorizationPolicy = {
    type: 'role';
    values: RoleEnum[];
    mode?: 'any' | 'all';
};

// @ts-ignore
type PermissionAuthorizationPolicy = {
    type: 'permission';
    values: string[];
    mode?: 'any' | 'all';
};

const authenticateJwt = (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<Express.User> => {
    return new Promise((resolve, reject) => {
        passport.authenticate(
            'jwt',
            { session: false },
            (err: Error | null, user: Express.User | false, info: any) => {
                if (err) return reject(err);
                if (!user) return reject(new UnauthorizedError(info?.message));
                resolve(user);
            },
        )(req, res, next);
    });
};

export const checkUserPermissionMiddleware = (policy: AuthorizationPolicy): RequestHandler => {
    return async (req, res, next) => {
        if (!policy) return next();

        try {
            const user = await authenticateJwt(req, res, next);
            req.user = user;

            if (policy.type === 'authenticated') {
                return next();
            }

            const userRoleIds = new Set(user.roles.map((role) => role.id));

            const hasRole =
                policy.mode === 'all'
                    ? policy.values.every((roleId) => userRoleIds.has(roleId))
                    : policy.values.some((roleId) => userRoleIds.has(roleId));

            if (!hasRole) {
                return next(new ForbiddenError());
            }

            return next();
        } catch (err) {
            return next(err);
        }
    };
};
