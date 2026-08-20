declare global {
    namespace Express {
        interface User {
            id: string;
            email: string;
            firstName: string;
            lastName: string;
            username: string;
            roles: {
                name: string;
                id: number;
                permissions: {
                    name: string;
                }[];
            }[];
        }
    }
}

export {};
