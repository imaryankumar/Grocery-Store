import { NextResponse } from "next/server";
import ConnectDB from "@/libs/DBConnect";
import userAuthModal from "@/models/auth.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const POST = async (request) => {
  await ConnectDB();
  try {
    const { username, email, password } = await request.json();
    if (!username || !email || !password) {
      return NextResponse.json(
        { message: "Fields are Required" },
        { status: 401 }
      );
    }
    const FindUserEmail = await userAuthModal.findOne({ email });
    const hashPassword = await bcrypt.hash(password, 10);
    if (!FindUserEmail) {
      const userCreate = await userAuthModal.create({
        username,
        email,
        password: hashPassword,
      });
      const token = jwt.sign(
        { token: userCreate._id },
        process.env.JWT_SECRET_ID,
        { expiresIn: 1 }
      );
      return NextResponse.json(
        { message: "Register Successfully", userCreate, token },
        { status: 201 }
      );
    }
    return NextResponse.json(
      { message: "User Already Registered" },
      { status: 400 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Invalid" }, { status: 400 });
  }
};
