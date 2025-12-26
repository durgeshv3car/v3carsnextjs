// src/modules/auth/auth.repo.ts
import { prisma } from '../../lib/prisma.js';

export class AuthRepo {
  async findUserByEmail(emailAddress: string) {
    return prisma.tblusers.findFirst({
      where: { emailAddress },
    });
  }

  async findUserByMobile(mobilenumber: string) {
    return prisma.tblusers.findFirst({
      where: { mobilenumber },
    });
  }

  async createUser(data: {
    username: string;
    displayName: string;
    mobilenumber: string;
    emailAddress: string;
  }) {
    return prisma.tblusers.create({
      data,
    });
  }

  async updateOtp(userId: number, otpvalue: string) {
    return prisma.tblusers.update({
      where: { userId },
      data: { otpvalue },
    });
  }
}