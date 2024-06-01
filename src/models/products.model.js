import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    prodImgurl: {
      type: String,
      required: true,
    },
    productName: {
      type: String,
      required: true,
    },
    regularPrice: {
      type: String,
      required: true,
    },
    basePrice: {
      type: String,
      required: true,
    },
    productQuantity: {
      type: String,
      required: true,
    },
    productCategory: {
      type: String,
      required: true,
    },
    productRating: {
      type: String,
      required: true,
    },
    productDescription: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ProductsModel =
  mongoose.models?.Products || mongoose.model("Products", ProductSchema);

export default ProductsModel;
