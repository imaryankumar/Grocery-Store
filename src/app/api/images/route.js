import { NextResponse } from "next/server";

export const POST = async (request) => {
  const data = await request.formData();
  console.log(data.get("image"));
  return NextResponse.json(
    { message: "Hello EveryOne" },
    {
      status: 200,
    }
  );
};
