// src/modules/auth/auth.service.ts
import { AuthRepo } from './auth.repo.js';
const repo = new AuthRepo();
async function sendEmail(mailBody, subjectLine, receiverName, receiverEmail) {
    const customerData = {
        api_key: "PZkmSGEXRFl8W4i76rsztHxb25jBQvIqYOhpdJf1",
        senderName: "V3Cars",
        senderEmail: "noreplyv3cars@gmail.com",
        receiverName,
        receiverEmail,
        mailBody,
        subjectLine,
        senderId: "v3cars"
    };
    const response = await fetch("http://emailapi.phoenixads.net/json/send-email.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(customerData)
    });
    // Optionally log response
    // const responseText = await response.text();
}
export class AuthService {
    async register(data) {
        // Check if user exists
        const existing = await repo.findUserByMobile(data.mobilenumber);
        if (existing) {
            throw new Error('User already exists');
        }
        // Create user
        const user = await repo.createUser(data);
        // Send OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        await repo.updateOtp(user.userId, otp);
        const mailBody = `Your OTP for login is: ${otp}`;
        const subjectLine = 'OTP for V3Cars Login';
        const receiverName = user.displayName || user.username || 'User';
        const receiverEmail = user.emailAddress;
        await sendEmail(mailBody, subjectLine, receiverName, receiverEmail);
        return {
            userId: user.userId,
            username: user.username,
            displayName: user.displayName,
            mobilenumber: user.mobilenumber,
            emailAddress: user.emailAddress,
            status: user.status,
        };
    }
    async login(data) {
        const user = await repo.findUserByEmail(data.emailAddress);
        if (!user) {
            throw new Error('User not found');
        }
        // Generate OTP and send
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        await repo.updateOtp(user.userId, otp);
        const mailBody = `Your OTP for login is: ${otp}`;
        const subjectLine = 'OTP for V3Cars Login';
        const receiverName = user.displayName || user.username || 'User';
        const receiverEmail = data.emailAddress;
        await sendEmail(mailBody, subjectLine, receiverName, receiverEmail);
        return { message: 'OTP sent to your email' };
    }
    async verifyLogin(data) {
        const user = await repo.findUserByEmail(data.emailAddress);
        if (!user) {
            throw new Error('User not found');
        }
        if (user.otpvalue !== data.otpvalue) {
            throw new Error('Invalid OTP');
        }
        return {
            userId: user.userId,
            username: user.username,
            displayName: user.displayName,
            mobilenumber: user.mobilenumber,
            emailAddress: user.emailAddress,
            status: user.status,
        };
    }
}
