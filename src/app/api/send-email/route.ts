import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const { firstName, email } = await req.json();

    // 1. Transporter එක සකස් කිරීම (Gmail හරහා)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER, // .env එකෙන් ගනී
        pass: process.env.GMAIL_PASS, // .env එකෙන් ගනී
      },
    });

    // 2. Email පණිවිඩය සකස් කිරීම
    const mailOptions = {
      from: '"Mihiranga Kalhara" <no-reply@mihiranga.com>',
      to: email,
      subject: 'Verify Your Account - Mihiranga Kalhara',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
          <h2 style="color: #0070f3;">Welcome, ${firstName}!</h2>
          <p>Thank you for signing up. Please click the button below to verify your email address.</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="https://mihirangakalhara.online/login" style="background-color: #0070f3; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">Verify Email Address</a>
          </div>
          <p style="color: #666; font-size: 12px;">If you didn't create an account, you can safely ignore this email.</p>
        </div>
      `,
    };

    // 3. Email එක යැවීම
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });

  } catch (error) {
    console.error('Email Error:', error);
    return NextResponse.json({ message: 'Failed to send email' }, { status: 500 });
  }
}