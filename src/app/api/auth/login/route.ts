import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    const user = await db.user.findUnique({
      where: { email: email },
    });

    if (!user) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    // Return user info without password
    const { password: newUserPassword, ...rest } = user;

    return NextResponse.json({ user: rest, message: "Login successful" }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
}