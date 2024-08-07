import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Loading } from "notiflix/build/notiflix-loading-aio";
import Cookies from "js-cookie";

const OtpVerify = () => {
  const [otp, setOtp] = useState(null);
  const navigate = useNavigate();
  const verifyOtp = (e) => {
    e.preventDefault();
    Loading.dots("Loading...", {
      backgroundColor: "rgba(0,0,0,0.8)",
      svgColor: "#E3DDC3",
    });
    // const sentOtp = localStorage.getItem("otp");
    const sentOtp = Cookies.get("otp");
    if (otp === sentOtp) {
      Loading.remove();
      navigate("/updatePass");
      toast.success("OTP Verified");
    } else {
      Loading.remove();
      toast.error("Invalid OTP");
    }
  };
  return (
    <>
      <section className=" fixed">
        <div className="bg-[#F9F5F0] h-screen w-screen">
          <div className="flex flex-col items-center flex-1 h-full justify-center px-4 sm:px-0">
            <div class="flex flex-1 flex-col  justify-center space-y-5 max-w-md mx-auto ">
              <div class="flex flex-col space-y-2 text-center">
                <h2 class="text-3xl md:text-4xl font-bold">OTP Verification</h2>
              </div>
              <form action="" onSubmit={verifyOtp}>
                <div class="flex flex-col max-w-md space-y-5">
                  <input
                    onChange={(e) => setOtp(e.target.value)}
                    type="text"
                    placeholder="Enter OTP To Verify"
                    required
                    class="flex px-3 py-2 md:px-4 md:py-3 border-2 border-black rounded-lg font-medium placeholder:font-normal"
                  />
                  <button
                    type="submit"
                    class="flex items-center justify-center flex-none px-3 py-2 md:px-4 md:py-3 border-2 rounded-lg font-medium border-black bg-black text-white"
                  >
                    Verify OTP
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default OtpVerify;
