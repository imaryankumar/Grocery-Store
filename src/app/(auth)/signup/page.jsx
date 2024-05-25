"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const Signup = () => {
  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const router = useRouter();
  const [userDetails, SetUserDetails] = useState({
    username: "",
    email: "",
    password: "",
  });
  const carouselImgUrl = [
    "/Images/Bannerimg1.jpg",
    "/Images/Bannerimg2.jpg",
    "/Images/Bannerimg3.jpg",
    "/Images/Bannerimg4.jpg",
  ];
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 0 },
      items: 1,
    },
  };
  const onSignupSubmitHandler = async (e) => {
    e.preventDefault();
    const userData = {
      username: userDetails.username,
      email: userDetails.email,
      password: userDetails.password,
    };

    try {
      const getData = await axios.post(
        `${process.env.NEXT_PUBLIC_DOMAIN}/api/auth/signup`,
        userData
      );
      Cookies.set("userToken", getData?.data?.token);
      if (getData.status === 201) {
        toast.success(getData.data.message);
        router.push("/");
      }
    } catch (error) {
      console.log("Error Found", error);
      toast.error(error.response.data.message);
    }
    SetUserDetails({
      username: "",
      email: "",
      password: "",
    });
  };
  return (
    <div className="display-flex w-full h-[91vh] bg-slate-200">
      <div className="w-[50rem] h-[35rem] bg-white rounded shadow flex items-center justify-between ">
        <div className="w-full h-full flex items-center justify-center p-6">
          <div className="w-full h-full relative">
            <div className="flex flex-col gap-3">
              <h2 className="text-3xl font-medium">Create Account</h2>
              <h3 className="text-lg text-gray-600">
                Already have an account?&nbsp;
                <span className="text-blue-500 underline">
                  <Link href={"/login"}>Sign in</Link>
                </span>
              </h3>
              <form
                className="py-2 flex flex-col gap-4"
                onSubmit={onSignupSubmitHandler}>
                <div className="flex flex-col gap-1">
                  <h3>Username</h3>
                  <input
                    type="text"
                    placeholder="Please Enter Username"
                    className="w-full border border-black px-3 py-2 rounded"
                    value={userDetails.username}
                    onChange={(e) =>
                      SetUserDetails({
                        ...userDetails,
                        username: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <h3>E-mail</h3>
                  <input
                    type="email"
                    placeholder="Please Enter Email"
                    className="w-full border border-black px-3 py-2 rounded"
                    value={userDetails.email}
                    required
                    onChange={(e) =>
                      SetUserDetails({
                        ...userDetails,
                        email: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <h3>Password</h3>
                  <div className="w-full h-full relative">
                    <input
                      type={`${isPasswordShow ? "text" : "password"}`}
                      placeholder="Please Enter Password"
                      className="w-full border border-black px-3 py-2 rounded"
                      required
                      value={userDetails.password}
                      onChange={(e) =>
                        SetUserDetails({
                          ...userDetails,
                          password: e.target.value,
                        })
                      }
                    />
                    <span
                      className="absolute right-3 top-0 bottom-0 display-flex cursor-pointer pl-4"
                      onClick={() => setIsPasswordShow((prev) => !prev)}>
                      {isPasswordShow ? <IoEyeOff /> : <IoEye />}
                    </span>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full h-full py-2 bg-blue-500 hover:bg-blue-600 rounded-md font-medium text-white">
                  Create Account
                </button>
                <div className="flex items-center">
                  <div className="w-full border-b border-gray-300"></div>
                  <div className="px-3 text-gray-500">or</div>
                  <div className="w-full border-b border-gray-300"></div>
                </div>
              </form>
              <div className="w-full h-full flex items-center justify-start gap-12 cursor-pointer py-2 px-4 border rounded-lg">
                <FcGoogle size={25} />
                <span>Continue with Google</span>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full h-full flex flex-col items-center justify-start gap-14 bg-gradient-to-r from-cyan-500 to-blue-500 py-6 px-5 relative">
          <div className="relative">
            <Link href={"/"} className="display-flex gap-1 text-yellow-600  ">
              <span>
                <Image
                  src={"/Images/Logoicon.png"}
                  alt="Logo"
                  width={50}
                  height={50}
                />
              </span>
              <div className="text-2xl leading-6">
                Grocery <br /> <span className="text-green-500">Store</span>
              </div>
            </Link>
          </div>
          <div className="text-white flex flex-col items-center justify-center gap-2 ">
            <div className="w-[20rem] h-[12rem] mb-2 ">
              <Carousel
                responsive={responsive}
                infinite={true}
                autoPlay={true}
                showDots={true}
                arrows={false}
                swipeable={false}
                autoPlaySpeed={2000}
                renderDotsOutside={true}
                containerClass="w-full h-full">
                {carouselImgUrl?.map((item, key) => {
                  return (
                    <Image
                      key={key}
                      src={item}
                      width={900}
                      height={900}
                      priority
                      alt="Images"
                    />
                  );
                })}
              </Carousel>
            </div>
            <h2 className="text-2xl font-medium text-center">
              Online Grocery Store
            </h2>
            <p className="text-center">
              Fresh Picks Delivered to Your Doorstep Explore Our Online Grocery
              Store!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
