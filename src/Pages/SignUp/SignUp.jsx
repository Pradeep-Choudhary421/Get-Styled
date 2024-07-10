import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
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
    axios
      .post(url, data)
      .then(() => {
        setData({
          full_name: "",
          email: "",
          phone_no: "",
          password: "",
        });
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
      <section className="grid justify-center py-[31vh] 2xl:py-[15vh] bg-[#F9F5F0]">
        <div className="grid isolate justify-center py-8 aspect-video w-96 rounded-xl bg-[#E3DDC3] shadow-lg ring-1 ring-black ">
          <h1 className="text-3xl">SignUp Here</h1>
          <form className="grid gap-1 pt-12 pb-8" onSubmit={handleSubmit}>
            <input
              type="text"
              name="full_name"
              placeholder="Full Name"
              value={data.full_name}
              className="border-2 rounded-lg px-2 py-2 outline-none"
              onChange={handleTarget}
            />
            <br />
            <input
              type="number"
              name="phone_no"
              placeholder="Phone No."
              value={data.phone_no}
              className="border-2 rounded-lg px-2 py-2 outline-none"
              onChange={handleTarget}
            />
            <br />
            <input
              type="email"
              name="email"
              placeholder="email"
              value={data.email}
              className="border-2 rounded-lg px-2 py-2 outline-none"
              onChange={handleTarget}
            />
            <br />
            <input
              type="password"
              name="password"
              placeholder="password"
              value={data.password}
              className="border-2 rounded-lg px-2 py-2 outline-none"
              onChange={handleTarget}
            />
            <button
              type="submit"
              className="w-5/12 mt-4 rounded-lg py-1 bg-[#000] text-[#FFFFFF] mx-auto flex justify-center border-2 border-2xl"
            >
              Sign In
            </button>
          </form>
          <h2>
            Already have an Account ?
            <Link to="/login">
              <span className="text-white cursor-pointer"> Login Here</span>
            </Link>
          </h2>
        </div>
      </section>
    </>
  );
};

export default SignUp;
