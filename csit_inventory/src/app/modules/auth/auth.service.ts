import { prisma } from "../../../shared/prisma";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { UserStatus } from "../../../../generated/prisma";
import sendEmail from "../../../shared/mailSender";
import { jwtGenerator } from "../../../shared/jwtGenerator";
import { config } from "../../../config";
import { Secret } from "jsonwebtoken";
import type { StringValue } from 'ms';
import { otpTemplate } from "../../../utils/emailTemplates/otpTemplate";

const generateOtp = () => crypto.randomInt(100000, 999999).toString()

const loginUser = async (payload: { email: string, password: string }) => {
    const { email, password } = payload;

    const user = await prisma.user.findUnique({ where: { email, userStatus: UserStatus.ACTIVE } });

    if (!user) {
        throw new Error("User not found");
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


const verifyOtp = async(email: string, otp: string) => {
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

    const token = jwtGenerator({userInfo: jwtInfo, createSecretKey: config.jwt.token_secret as Secret, expiresIn: config.jwt.token_expires_in as StringValue} )
    const refreshToken = jwtGenerator({userInfo: jwtInfo, createSecretKey: config.jwt.refresh_token_secret as Secret, expiresIn: config.jwt.refresh_token_expires_in as StringValue } )

    return {
        token,
        refreshToken
    };
}

export const AuthService = {
    loginUser,
    verifyOtp
}