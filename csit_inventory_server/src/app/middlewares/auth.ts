import { NextFunction, Request, Response } from "express";
import { jwtVerifier } from "../../shared/jwtGenerator";
import { config } from "../../config";
import { UserStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";
import { JwtPayload, Secret } from "jsonwebtoken";
import AppError from "../errors/appErrors";

const auth = (...roles: string[]) => {
  return async (req: Request & { user?: any }, res: Response, next: NextFunction) => {
    // 👇 পুরো কোডটি try ব্লকের শুরুতে শুরু হবে
    try {
      const token = req.headers.authorization;

      if (!token) {
        throw new AppError(401, "Invalid signature");
      }

      const bearerToken = token.split(" ")[1];
      let decoded;

      try {
        decoded = jwtVerifier({
          token: bearerToken as string,
          secretKey: config.jwt.token_secret as Secret,
        }) as JwtPayload;
      } catch (err: any) {
        // এখানে throw করলে সেটা বাইরের catch ব্লকে যাবে -> তারপর next(error) এ যাবে
        if (err.name === "TokenExpiredError") {
          throw new AppError(401, "Access token expired");
        }
        if (err.name === "JsonWebTokenError") {
          throw new AppError(401, "Invalid token");
        }
        throw new AppError(401, "Unauthorized");
      }

      const user = await prisma.user.findUnique({
        where: {
          email: decoded.email,
          userStatus: UserStatus.ACTIVE,
        },
      });

      if (!user) {
        throw new AppError(404, "User not found");
      }

      if (roles.length && !roles.includes(user.role)) {
        throw new AppError(403, "You are not authorized to access this route");
      }

      req.user = decoded as JwtPayload;

      next();
    } catch (error) {
      // 👇 এই লাইনটি সবচেয়ে গুরুত্বপূর্ণ। async এরর হ্যান্ডলিং এর জন্য next(error) দিতেই হবে
      next(error);
    }
  };
};

export default auth;