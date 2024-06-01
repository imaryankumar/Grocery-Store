import { NextResponse } from "next/server";
import ConnectDB from "@/libs/DBConnect";
import ProductsModel from "@/models/products.model";

export const GET = async (request, context) => {
  await ConnectDB();
  try {
    const { params } = context;
    const category = params.category;
    if (!category) {
      return NextResponse.json(
        { message: "Fields are Required", success: false },
        { status: 401 }
      );
    }
    const categoryProductsFind = await ProductsModel.find({
      productCategory: category,
    });
    return NextResponse.json(
      { message: "AllCategoryProducts", success: true, categoryProductsFind },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Invalid", success: false },
      { status: 500 }
    );
  }
};
