import { NextResponse } from "next/server";
import io from "socket.io-client";

const socket = io("http://localhost:3000");

export const POST = async (request) => {
  console.log(await request.json());
  try {
    socket.emit("message1", "Sync Process Completed");
    socket.on("my", (message) => {
      console.log("New Message is===>", message);
    });
    return NextResponse.json({ data: "Success" }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Invalid", success: false },
      { status: 500 }
    );
  }
};
