import { NextResponse } from "next/server";
import ConnectDB from "@/libs/DBConnect";
import userAuthModal from "@/models/auth.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const POST = async (request) => {
  await ConnectDB();
  try {
    const { email, password } = await request.json();
    if (!email || !password) {
      return NextResponse.json(
        { message: "Fields are Required" },
        { status: 401 }
      );
    }
    const findUserEmail = await userAuthModal.findOne({ email });
    if (!findUserEmail) {
      return NextResponse.json(
        { message: "User Not Registered" },
        { status: 400 }
      );
    }
    const comparePassword = await bcrypt.compare(
      password,
      findUserEmail.password
    );
    if (!comparePassword) {
      return NextResponse.json(
        { message: "Invalid Password" },
        { status: 400 }
      );
    }
    const token = jwt.sign(
      { token: findUserEmail._id },
      process.env.JWT_SECRET_ID,
      { expiresIn: 1 }
    );
    return NextResponse.json(
      { message: "Login Successfully", token },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Invalid" }, { status: 400 });
  }
};

export const GET = async (request) => {
  await ConnectDB();
  try {
    const userFind = await userAuthModal.find({});
    return NextResponse.json(
      { message: "All Users", userFind },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Invalid" }, { status: 400 });
  }
};
