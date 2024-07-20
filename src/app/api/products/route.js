import { NextResponse } from "next/server";
import ProductsModel from "@/models/products.model";
import ConnectDB from "@/libs/DBConnect";
export const POST = async (request) => {
  await ConnectDB();
  try {
    const {
      prodImgurl,
      productName,
      regularPrice,
      basePrice,
      productQuantity,
      productCategory,
      productRating,
      productDescription,
    } = await request.json();
    if (
      !prodImgurl ||
      !productName ||
      !regularPrice ||
      !basePrice ||
      !productQuantity ||
      !productCategory ||
      !productRating ||
      !productDescription
    ) {
      return NextResponse.json(
        { message: "Fields are Required", success: false },
        { status: 401 }
      );
    }
    const alreadyUpload = await ProductsModel.findOne({ prodImgurl });
    if (alreadyUpload) {
      return NextResponse.json(
        { message: "Product Already Uploaded", success: false },
        { status: 401 }
      );
    }
    const createProducts = await ProductsModel.create({
      prodImgurl,
      productName,
      regularPrice,
      basePrice,
      productQuantity,
      productCategory,
      productRating,
      productDescription,
    });

    return NextResponse.json(
      {
        message: "Successfully",
        success: true,
        createProducts,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Invalid", success: false },
      { status: 400 }
    );
  }
};

export const GET = async (request) => {
  await ConnectDB();
  try {
    const url = new URL(request.url);
    const { searchParams } = url;

    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;

    // Calculate the number of documents to skip
    const skip = (page - 1) * limit;

    const allProductsFind = await ProductsModel.find({})
      .skip(skip)
      .limit(limit)
      .exec();
    return NextResponse.json(
      {
        message: "All Products",
        success: true,
        page,
        limit,
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
