import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Loading } from "notiflix/build/notiflix-loading-aio";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const ResetPass = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const otpSendUrl = "https://get-styled-backend.onrender.com/user/sendOtp";
  const sendOtp = async (e) => {
    e.preventDefault();
    Loading.dots("Loading...", {
      backgroundColor: "rgba(0,0,0,0.8)",
      svgColor: "#E3DDC3",
    });
    try {
      await axios
        .post(otpSendUrl, {
          email: email,
        })
        .then((res) => {
          // localStorage.setItem("otp", res.data.otp);
          Cookies.set("otp", res.data.otp);
          localStorage.setItem("user", res.data.user.email);
          navigate("/verifyOtp");
          Loading.remove();
          toast.success("Otp Sent");
        });
    } catch (err) {
      Loading.remove();
      toast.error("Email Not Found");
    }
  };

  return (
    <>
      <section className=" fixed">
        <div className="bg-[#F9F5F0] h-screen w-screen">
          <div className="flex flex-col items-center flex-1 h-full justify-center px-4 sm:px-0">
            <div class="flex flex-1 flex-col  justify-center space-y-5 max-w-md mx-auto ">
              <div class="flex flex-col space-y-2 text-center">
                <h2 class="text-3xl md:text-4xl font-bold">Reset Password</h2>
              </div>
              <form action="" onSubmit={sendOtp}>
                <div class="flex flex-col max-w-md space-y-5">
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    type="text"
                    placeholder="Registered Email"
                    required
                    class="flex px-3 py-2 md:px-4 md:py-3 border-2 border-black rounded-lg font-medium placeholder:font-normal"
                  />
                  <button
                    type="submit"
                    class="flex items-center justify-center w-full flex-none px-3 py-2 md:px-4 md:py-3 border-2 rounded-lg font-medium border-black bg-black text-white"
                  >
                    Send OTP
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

export default ResetPass;
