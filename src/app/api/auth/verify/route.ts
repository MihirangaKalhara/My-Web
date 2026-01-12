import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import nodemailer from "nodemailer"; 

export async function POST(req: Request) {
  try {
    const { email, code } = await req.json();

    const user = await db.user.findUnique({ where: { email } });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    if (user.verificationCode !== code) {
      return NextResponse.json({ message: "Invalid verification code" }, { status: 400 });
    }

    if (new Date() > (user.codeExpires as Date)) {
      return NextResponse.json({ message: "Code has expired" }, { status: 400 });
    }

    await db.user.update({
      where: { email },
      data: {
        isVerified: true,
        verificationCode: null,
        codeExpires: null
      }
    });

    try {
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
        subject: 'Welcome to Mihiranga Kalhara | Official Web Site! - Account Verified',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #333; border-radius: 10px; background-color: #0a0a0a; color: white;">
            <h2 style="color: #3b82f6;">Account Verified Successfully!</h2>
            <p>Hello <strong>${user.firstName}</strong>,</p>
            <p>Congratulations! Your email has been verified and your account is now fully active.</p>
            <p>You can now log in to your dashboard and verify your purchases or manage your services.</p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="https://mihirangakalhara.online/login" style="background-color: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">Login Now</a>
            </div>
            <p style="color: #888; font-size: 12px;">Thank you for joining us.</p>
          </div>
        `,
      });
    } catch (emailError) {
      console.error("Welcome email failed:", emailError);
    }

    return NextResponse.json({ message: "Verified successfully" }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ message: "Error verifying code" }, { status: 500 });
  }
}