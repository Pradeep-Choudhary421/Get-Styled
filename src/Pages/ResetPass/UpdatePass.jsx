import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Loading } from "notiflix/build/notiflix-loading-aio";

const UpdatePass = () => {
  const [pass, setPass] = useState(null);
  const [confirmPass, setConfirmPass] = useState(null);

  const resetPassUrl =
    "https://get-styled-backend.onrender.com/user/updateUser";
  const navigate = useNavigate();

  const resetPass = async (e) => {
    e.preventDefault();
    Loading.dots("Loading...", {
      backgroundColor: "rgba(0,0,0,0.8)",
      svgColor: "#E3DDC3",
    });
    if (pass === confirmPass) {
      await axios
        .post(resetPassUrl, {
          email: localStorage.getItem("user"),
          newPassword: pass,
        })
        .then(() => {
          navigate("/login");
          Loading.remove();
          toast.success("Password Updated Successfully");
        });
    } else {
      Loading.remove();
      toast.warn("Password Does Not Match");
    }
  };

  return (
    <>
      <section className=" fixed">
        <div className="bg-[#F9F5F0] h-screen w-screen">
          <div className="flex flex-col items-center flex-1 h-full justify-center px-4 sm:px-0">
            <div class="flex flex-1 flex-col  justify-center space-y-5 max-w-md mx-auto ">
              <div class="flex flex-col space-y-2 text-center">
                <h2 class="text-3xl md:text-4xl font-bold">Set New Password</h2>
              </div>
              <form action="" onSubmit={resetPass}>
                <div class="flex flex-col max-w-md space-y-5">
                  <input
                    type="text"
                    placeholder="Password"
                    onChange={(e) => setPass(e.target.value)}
                    required
                    class="flex px-3 py-2 md:px-4 md:py-3 border-2 border-black rounded-lg font-medium placeholder:font-normal"
                  />
                </div>
                <div class="flex flex-col max-w-md space-y-5 mt-6">
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    onChange={(e) => setConfirmPass(e.target.value)}
                    required
                    class="flex px-3 py-2 md:px-4 md:py-3 border-2 border-black rounded-lg font-medium placeholder:font-normal"
                  />
                  <button
                    type="submit"
                    class="flex items-center justify-center flex-none px-3 py-2 md:px-4 md:py-3 border-2 rounded-lg font-medium border-black bg-black text-white"
                  >
                    Reset Password
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

export default UpdatePass;
