import { NextResponse } from "next/server";
import ConnectDB from "@/libs/DBConnect";
import userAuthModal from "@/models/auth.model";
import jwt from "jsonwebtoken";
export const POST = async (request) => {
  await ConnectDB();
  try {
    const { email } = await request.json();
    if (!email) {
      return NextResponse.json(
        { message: "Fields are Required" },
        { status: 401 }
      );
    }
    const isEmailId = await userAuthModal.findOne({ email });
    if (!isEmailId) {
      return NextResponse.json({ message: "Email Not Found" }, { status: 400 });
    }
    const token = jwt.sign(
      { token: isEmailId._id },
      process.env.JWT_SECRET_ID,
      { expiresIn: 1 }
    );
    return NextResponse.json(
      { message: "Forgot Password Successfully", token },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Invalid" }, { status: 400 });
  }
};
