import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    const user = await db.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { message: "No account found. Please create a new account." },
        { status: 404 }
      );
    }

    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    const expiryDate = new Date(new Date().getTime() + 15 * 60 * 1000); // 15 mins

    await db.user.update({
      where: { email },
      data: {
        verificationCode: otpCode,
        codeExpires: expiryDate,
      },
    });

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
      subject: 'Reset Your Password',
      html: `
        <div style="font-family: Arial; padding: 20px;">
          <h2 style="color: #0070f3;">Password Reset Request</h2>
          <p>Use the code below to reset your password:</p>
          <h1 style="background: #eee; padding: 10px; display: inline-block; letter-spacing: 5px;">${otpCode}</h1>
          <p>This code expires in 15 minutes.</p>
        </div>
      `,
    });

    return NextResponse.json({ message: "Reset code sent" }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}