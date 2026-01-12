import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { email, code, newPassword } = await req.json();

    const user = await db.user.findUnique({ where: { email } });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    if (user.verificationCode !== code) {
      return NextResponse.json({ message: "Invalid code" }, { status: 400 });
    }

    if (new Date() > (user.codeExpires as Date)) {
      return NextResponse.json({ message: "Code expired" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await db.user.update({
      where: { email },
      data: {
        password: hashedPassword,
        verificationCode: null,
        codeExpires: null,
      },
    });

    return NextResponse.json({ message: "Password reset successful" }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}