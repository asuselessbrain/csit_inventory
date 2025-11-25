import { NextFunction, Request, Response } from "express";
import { jwtVerifier } from "../../shared/jwtGenerator";
import { config } from "../../config";
import { JwtPayload, Secret } from "jsonwebtoken";
import { prisma } from "../../shared/prisma";
import { UserStatus } from "../../../generated/prisma";

const auth = (...roles: string[]) => {
    return async (req: Request & { user?: any }, res: Response, next: NextFunction) => {
        const token = req.headers.authorization;
        console.log(token)

        if (!token) {
            throw new Error("No token provided");
        }

        const bearerToken = token.split(" ")[1]

        let decoded

        try {
            decoded = jwtVerifier({ token: bearerToken as string, secretKey: config.jwt.token_secret as Secret }) as JwtPayload;
        }
        catch (err) {
            next(err);
            return;
        }

        const user = await prisma.user.findUnique({
            where: {
                email: decoded.email,
                userStatus: UserStatus.ACTIVE
            }
        })

        if (!user) {
            throw new Error("User not found");
        }


        if (roles.length && !roles.includes(user.role)) {
            throw new Error("You are not authorized to access this route");
        }

        req.user = decoded as JwtPayload

        next()
    }
}

export default auth;