import { NextResponse } from "next/server";
import ConnectDB from "@/libs/DBConnect";
import userAuthModal from "@/models/auth.model";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

export const POST = async (request) => {
  await ConnectDB();
  try {
    const { email } = await request.json();
    if (!email) {
      return NextResponse.json(
        { message: "Fields are Required", success: false },
        { status: 401 }
      );
    }
    const isEmailId = await userAuthModal.findOne({ email });
    if (!isEmailId) {
      return NextResponse.json(
        { message: "Email Not Found", success: false },
        { status: 400 }
      );
    }
    const token = jwt.sign(
      { token: isEmailId._id },
      process.env.JWT_SECRET_ID,
      { expiresIn: 1 }
    );

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.NEXT_PUBLIC_GMAIL_USER,
        pass: process.env.NEXT_PUBLIC_GMAIL_PASS,
      },
    });
    const mailOptions = {
      from: process.env.NEXT_PUBLIC_GMAIL_USER,
      to: "aryan8910kumar@gmail.com",
      subject: "Reset Your Password",
      text: `${process.env.NEXT_PUBLIC_DOMAIN}/reset?token=${token}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        return NextResponse.json({ status: "success", success: true });
      }
    });
    return NextResponse.json(
      {
        message: "Please Check Email",
        success: true,
        token,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error", success: false },
      { status: 500 }
    );
  }
};
