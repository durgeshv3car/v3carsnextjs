// src/modules/auth/auth.repo.ts
import { prisma } from '../../lib/prisma.js';
export class AuthRepo {
    async findUserByEmail(emailAddress) {
        return prisma.tblusers.findFirst({
            where: { emailAddress },
        });
    }
    async findUserByMobile(mobilenumber) {
        return prisma.tblusers.findFirst({
            where: { mobilenumber },
        });
    }
    async createUser(data) {
        return prisma.tblusers.create({
            data,
        });
    }
    async updateOtp(userId, otpvalue) {
        return prisma.tblusers.update({
            where: { userId },
            data: { otpvalue },
        });
    }
}
