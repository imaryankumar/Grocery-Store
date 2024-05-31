"use client";
import { useParams } from "next/navigation";
const Category = () => {
  const params = useParams();
  return <div>Category:{params.category}</div>;
};

export default Category;
