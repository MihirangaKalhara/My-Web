import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { firstName, lastName, phone, email, password } = body;

    const existingUser = await db.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ message: "User already exists" }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // 1. ඉලක්කම් 6ක Random Code එකක් සෑදීම
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    
    // 2. Code එක විනාඩි 15කින් කල් ඉකුත් වන ලෙස සකස් කිරීම
    const expiryDate = new Date(new Date().getTime() + 15 * 60 * 1000);

    // 3. Database එකේ Save කිරීම
    await db.user.create({
      data: {
        firstName, lastName, phone, email,
        password: hashedPassword,
        verificationCode: otpCode,
        codeExpires: expiryDate,
        isVerified: false
      },
    });

    // 4. Email යැවීම
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: '"Mihiranga Kalhara" <no-reply@mihiranga.com>',
      to: email,
      subject: 'Your Verification Code',
      html: `
        <div style="font-family: Arial; padding: 20px; color: #333;">
          <h2 style="color: #0070f3;">Hello ${firstName},</h2>
          <p>Your verification code is:</p>
          <h1 style="background: #eee; padding: 10px; display: inline-block; letter-spacing: 5px;">${otpCode}</h1>
          <p>This code will expire in 15 minutes.</p>
        </div>
      `,
    });

    return NextResponse.json({ message: "OTP sent" }, { status: 201 });

  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}