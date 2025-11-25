
import jwt, { Secret } from 'jsonwebtoken';
import type { StringValue } from 'ms';

export const jwtGenerator = ({ userInfo, createSecretKey, expiresIn }: { userInfo: {email: string, role: string}, createSecretKey: Secret, expiresIn: StringValue }) => {
    const token = jwt.sign({ userInfo }, createSecretKey, { expiresIn })
    return token;
}