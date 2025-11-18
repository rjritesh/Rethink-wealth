'use server';
import admin from 'firebase-admin';
import { getAuth } from 'firebase-admin/auth';
import type { ServiceAccount } from 'firebase-admin';
import serviceAccount from '@/lib/rethinkwealthabmin.json';

const formatPhoneNumber = (phone: string): string => {
    const digits = phone.replace(/\D/g, '');
    if (phone.startsWith('+91') && digits.length === 12) {
        return phone;
    }

    if (digits.startsWith('91') && digits.length === 12) {
        return `+${digits}`;
    }
    if (digits.length === 10) {
        return `+91${digits}`;
    }
    return phone;
};

export async function sendOtp(phone: string) {
    if (!phone) {
        return { error: 'Phone number is required' };
    }
    phone = formatPhoneNumber(phone);
    try {
        // const url = `https://control.msg91.com/api/v5/otp?template_id=${process.env.MSG91_TEMPLATE_ID}&mobile=${phone}&authkey=${process.env.MSG91_AUTH_KEY}`;
        // const response = await fetch(url, {
        //     method: 'GET',
        //     cache: 'no-store',
        // });

        // const data = await response.json();
        const data = { type: 'success', message: "OTP send error" };
        if (data.type === 'success') {
            return { success: true };
        } else {
            return { error: data.message || 'OTP send failed' };
        }
    } catch {
        return { error: 'Server error' };
    }
}

export async function otpVerification(phone: string, otp: string) {
    
    if (!admin.apps.length) {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount as ServiceAccount),
        });
    }
    try {
        phone = formatPhoneNumber(phone);
        // const url = `https://control.msg91.com/api/v5/otp/verify?mobile=${phone}&otp=${otp}&authkey=${process.env.MSG91_AUTH_KEY}`;
        // const response = await fetch(url, {
        //     method: 'GET',
        //     cache: 'no-store',
        // });

        // const data = await response.json();

        // For testing without live MSG91 response:
        const data = { type: 'success' };

        if (data.type === 'success') {
            const uid = `phone_${phone}`;
            const token = await getAuth().createCustomToken(uid);
            return { token };
        } else {
            return { error: `Invalid OTP ${otp}` };
        }
    } catch {
        return { error: 'Server error verifying OTP' };
    }
}