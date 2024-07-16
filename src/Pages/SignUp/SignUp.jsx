import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Loading } from "notiflix/build/notiflix-loading-aio";
import "react-toastify/dist/ReactToastify.css";
const SignUp = () => {
  const [data, setData] = useState({
    full_name: "",
    email: "",
    phone_no: "",
    password: "",
  });

  const url = "https://get-styled-backend.onrender.com/user/createUser";
  const navigate = useNavigate();

  const createUser = () => {
    Loading.dots("Loading...", {
      backgroundColor: "rgba(0,0,0,0.8)",
      svgColor: "#E3DDC3",
    });
    axios
      .post(url, data)
      .then(() => {
        setData({
          full_name: "",
          email: "",
          phone_no: "",
          password: "",
        });
        Loading.remove();
        toast.success("User created successfully");
        navigate("/login");
      })
      .catch(() => {
        toast.error("User creation failed");
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createUser();
  };
  const handleTarget = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <>
      {/* ----------------------------------------------- */}
      <section className=" fixed">
        <div className="bg-[#F9F5F0] h-screen w-screen">
          <div className="flex flex-col items-center flex-1 h-full justify-center px-4 sm:px-0">
            <div
              className="flex rounded-lg shadow-lg w-full sm:w-3/4 lg:w-1/2 bg-white sm:mx-0"
              style={{ height: "500px" }}
            >
              <div
                className="hidden md:block md:w-1/2 rounded-r-lg"
                style={{
                  background:
                    "url('https://images.unsplash.com/photo-1555529771-835f59fc5efe?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDV8fHxlbnwwfHx8fHw%3D')",
                  backgroundSize: "cover",
                  backgroundPosition: "center center",
                }}
              ></div>
              <div className="flex flex-col w-full md:w-1/2 p-4">
                <div className="flex flex-col flex-1 justify-center mb-8">
                  <h1 className="text-4xl text-center font-thin">Register</h1>
                  <div className="w-full mt-4">
                    <form
                      className="form-horizontal w-3/4 mx-auto"
                      method="POST"
                      onSubmit={handleSubmit}
                    >
                      <div className="flex flex-col mt-4">
                        <input
                          id="full_name"
                          type="text"
                          className="flex-grow h-8 px-2 border rounded border-grey-400"
                          name="full_name"
                          required
                          placeholder="Full Name"
                          value={data.full_name}
                          onChange={handleTarget}
                        />
                      </div>
                      <div className="flex flex-col mt-4">
                        <input
                          id="phone_no"
                          type="number"
                          className="flex-grow h-8 px-2 border rounded border-grey-400"
                          name="phone_no"
                          required
                          placeholder="Phone No."
                          value={data.phone_no}
                          onChange={handleTarget}
                        />
                      </div>
                      <div className="flex flex-col mt-4">
                        <input
                          id="email"
                          type="text"
                          className="flex-grow h-8 px-2 border rounded border-grey-400"
                          name="email"
                          required
                          placeholder="Email"
                          value={data.email}
                          onChange={handleTarget}
                        />
                      </div>
                      <div className="flex flex-col mt-4">
                        <input
                          id="password"
                          type="password"
                          className="flex-grow h-8 px-2 rounded border border-grey-400"
                          name="password"
                          required
                          placeholder="Password"
                          value={data.password}
                          onChange={handleTarget}
                        />
                      </div>
                      <div className="flex flex-col mt-8">
                        <button
                          type="submit"
                          className="bg-[#e8e5e1] hover:bg-[#f0ece7] text-black text-sm font-semibold py-2 px-4 rounded"
                        >
                          Register
                        </button>
                      </div>
                    </form>
                    {/* <div className="text-center mt-4">
                      <a
                        className="no-underline hover:underline text-blue-dark text-xs"
                        href="#"
                      >
                        Forgot Your Password?
                      </a>
                    </div> */}
                    <div className="text-center mt-4">
                      <span
                        className="no-underline hover:underline text-blue-dark text-xs"
                        href="#register"
                      >
                        Already Have an Account?
                        <span className="text-lg">
                          <Link to="/login">Login Here</Link>
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignUp;
