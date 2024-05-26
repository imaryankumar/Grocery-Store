import { NextResponse } from "next/server";
import ConnectDB from "@/libs/DBConnect";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userAuthModal from "@/models/auth.model";
export const PATCH = async (request) => {
  await ConnectDB();
  try {
    const { password, conpassword, token } = await request.json();
    if (!password || !conpassword || !token) {
      return NextResponse.json(
        { message: "Fields are Required", success: false },
        { status: 401 }
      );
    }
    if (password !== conpassword) {
      return NextResponse.json(
        { message: "Paasword Not Match", success: false },
        { status: 401 }
      );
    }
    const hashConPassword = await bcrypt.hash(password, 10);
    const decoded = jwt.decode(token);
    const userId = decoded.token;
    const resetPassword = await userAuthModal.findByIdAndUpdate(
      userId,
      {
        password: hashConPassword,
      },
      { new: true }
    );
    if (!resetPassword) {
      return NextResponse.json(
        { message: "User not found", success: false },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { message: "Reset Password Successfully", success: true },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Invalid", success: false },
      { status: 400 }
    );
  }
};
