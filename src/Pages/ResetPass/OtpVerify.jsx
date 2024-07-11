import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const OtpVerify = () => {
  const [otp, setOtp] = useState(null);
  const navigate = useNavigate();
  const verifyOtp = (e) => {
    e.preventDefault();
    const sentOtp = localStorage.getItem("otp");
    if (otp === sentOtp) {
        toast.success("OTP Verified")
        navigate("/updatePass")
    } else {
        toast.error("Invalid OTP")
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
                  placeholder="6-Digit Otp"
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
