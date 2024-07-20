import ConnectDB from "@/libs/DBConnect";
import ProductsModel from "@/models/products.model";
import { NextResponse } from "next/server";

export const GET = async () => {
  await ConnectDB();
  try {
    const allProductsFind = await ProductsModel.find({});
    return NextResponse.json(
      {
        message: "All Products",
        success: true,
        allProductsFind,
        totalProducts: allProductsFind.length,
      },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Internal Server Error", success: false },
      { status: 500 }
    );
  }
};
