"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useSearchParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";
import Cookies from "js-cookie";

const ResetPassword = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userFindToken = searchParams.get("token");

  useEffect(() => {
    const redirectUserForgotIn = () => {
      const authUser = Cookies.get("ForgotToken");
      if (!authUser) {
        router.push("/forgot");
      }
    };
    redirectUserForgotIn();
  }, [router]);

  const [userDetails, SetUserDetails] = useState({
    password: "",
    conpassword: "",
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
  const onResetSubmitHandler = async (e) => {
    e.preventDefault();
    const userData = {
      password: userDetails.password,
      conpassword: userDetails.conpassword,
      token: userFindToken,
    };

    try {
      const getData = await axios.patch(
        `${process.env.NEXT_PUBLIC_DOMAIN}/api/auth/reset`,
        userData
      );
      if (getData.status === 200) {
        toast.success(getData.data.message);
        router.push("/");
      }
    } catch (error) {
      console.log("Error Found", error);
      toast.error(error.response.data.message);
    }
    SetUserDetails({
      password: "",
      conpassword: "",
    });
  };

  return (
    <div className="display-flex w-full h-screen bg-slate-200">
      <div className="w-[50rem] h-[23rem] bg-white rounded shadow flex items-center justify-between ">
        <div className="w-full h-full flex items-center justify-center p-6">
          <div className="w-full h-full relative">
            <div className="flex flex-col gap-3">
              <h2 className="text-3xl font-medium">Reset Password</h2>
              <h3 className="text-lg text-gray-600">
                Don't have an account?&nbsp;
                <span className="text-blue-500 underline">
                  <Link href={"/signup"}>Create Now</Link>
                </span>
              </h3>
              <form
                className="py-2 flex flex-col gap-3"
                onSubmit={onResetSubmitHandler}>
                <div className="flex flex-col gap-1">
                  <h3>New Password</h3>
                  <input
                    type="text"
                    placeholder="Please Enter Password"
                    className="w-full border border-black px-3 py-2 rounded"
                    value={userDetails.password}
                    required
                    onChange={(e) =>
                      SetUserDetails({
                        ...userDetails,
                        password: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <h3>Confirm Password</h3>
                  <input
                    type="text"
                    placeholder="Please Enter Conpassword"
                    className="w-full border border-black px-3 py-2 rounded"
                    value={userDetails.conpassword}
                    required
                    onChange={(e) =>
                      SetUserDetails({
                        ...userDetails,
                        conpassword: e.target.value,
                      })
                    }
                  />
                </div>
                <button
                  type="submit"
                  className="w-full h-full py-2 mt-2 bg-blue-500 hover:bg-blue-600 rounded-md font-medium text-white">
                  Reset Password
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="w-full h-full flex flex-col items-center justify-start gap-6 bg-gradient-to-r from-cyan-500 to-blue-500 py-6 px-5 relative">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
