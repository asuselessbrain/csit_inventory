import bcrypt from "bcrypt";
import crypto from "crypto";
import sendEmail from "../../../shared/mailSender";
import { jwtGenerator, jwtVerifier } from "../../../shared/jwtGenerator";
import { config } from "../../../config";
import { JwtPayload, Secret } from "jsonwebtoken";
import { otpTemplate } from "../../../utils/emailTemplates/otpTemplate";
import { prisma } from "../../../lib/prisma";
import { UserStatus } from "../../../../generated/prisma/enums";
import { StringValue } from "ms";
import AppError from "../../errors/appErrors";

const generateOtp = () => crypto.randomInt(100000, 999999).toString()

const loginUser = async (payload: { email: string, password: string }) => {
    const { email, password } = payload;

    const user = await prisma.user.findUnique({ where: { email, userStatus: UserStatus.ACTIVE } });

    if (!user) {
        throw new AppError(404, "User not found");
    }

    if (!user.isEmailVerified) {
        throw new AppError(400, "Email is not verified");
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
        throw new Error("Invalid password");
    }

    const otp = generateOtp();

    await sendEmail({ to: user.email, subject: "Your OTP Code", html: otpTemplate(otp) });

    const otpExpire = new Date();
    otpExpire.setMinutes(otpExpire.getMinutes() + 10);

    await prisma.user.update({
        where: { id: user.id },
        data: {
            otp,
            otpExpiry: otpExpire
        }
    })

    return { message: "OTP sent to your email" };
}


const verifyOtp = async (email: string, otp: string) => {
    const user = await prisma.user.findUnique({ where: { email, userStatus: UserStatus.ACTIVE } });
    if (!user) {
        throw new Error("User not found");
    }

    if (user.otp !== otp) {
        throw new Error("Invalid OTP");
    }

    if (user.otpExpiry && user.otpExpiry < new Date()) {
        throw new Error("OTP has expired");
    }

    await prisma.user.update({
        where: { id: user.id },
        data: {
            otp: null,
            otpExpiry: null
        }
    });

    const jwtInfo = {
        email: user.email,
        role: user.role
    }

    const token = jwtGenerator({ userInfo: jwtInfo, createSecretKey: config.jwt.token_secret as Secret, expiresIn: config.jwt.token_expires_in as StringValue })
    const refreshToken = jwtGenerator({ userInfo: jwtInfo, createSecretKey: config.jwt.refresh_token_secret as Secret, expiresIn: config.jwt.refresh_token_expires_in as StringValue })

    console.log(refreshToken)

    return {
        token,
        refreshToken
    };
}

const generateNewToken = async (refreshToken: string) => {
    console.log(refreshToken)
    const decoded = jwtVerifier({ token: refreshToken, secretKey: config.jwt.refresh_token_secret as Secret }) as JwtPayload;
    
    console.log(decoded)

    const user = await prisma.user.findUnique({ where: { email: decoded.email, userStatus: UserStatus.ACTIVE } });

    if (!user) {
        throw new AppError(404, "User not found");
    }

    const jwtInfo = {
        email: user.email,
        role: user.role
    }

    const newToken = jwtGenerator({ userInfo: jwtInfo, createSecretKey: config.jwt.token_secret as Secret, expiresIn: config.jwt.token_expires_in as StringValue })

    return newToken;
}

const resendOtp = async (email: string) => {
    const user = await prisma.user.findUnique({ where: { email, userStatus: UserStatus.ACTIVE } })

    if (!user) {
        throw new AppError(404, "User not found");
    }

    if (!user.isEmailVerified) {
        throw new AppError(400, "Email is not verified");
    }

    const otp = generateOtp();

    await sendEmail({ to: user.email, subject: "Your OTP Code", html: otpTemplate(otp) })

    const otpExpire = new Date()

    otpExpire.setMinutes(otpExpire.getMinutes() + 10);

    await prisma.user.update({
        where: { id: user.id },
        data: {
            otp,
            otpExpiry: otpExpire
        }
    })
    return { message: "OTP resent to your email" };
}

const logout = async () => {
    return null
}

export const AuthService = {
    loginUser,
    verifyOtp,
    generateNewToken,
    resendOtp,
    logout
}