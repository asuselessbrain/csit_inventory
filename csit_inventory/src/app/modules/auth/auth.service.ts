import { prisma } from "../../../shared/prisma";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { UserStatus } from "../../../../generated/prisma";

const generateOtp = () => crypto.randomInt(100000, 999999).toString()

const loginUser = async(payload: {email: string, password: string}) => {
    const {email, password} = payload;

    const user = await prisma.user.findUnique({ where: { email, userStatus: UserStatus.ACTIVE } });

    if(!user){
        throw new Error("User not found");
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if(!isPasswordMatch){
        throw new Error("Invalid password");
    }

    const otp = generateOtp();

    
}