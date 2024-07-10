import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const url = "https://get-styled-backend.onrender.com/user/login";
  const navigate = useNavigate();

  const loginUser = () => {
    axios
      .post(url, data)
      .then((res) => {
        setData({
          email: "",
          password: "",
        });
        navigate("/");
        // console.log(res.data.token)
        localStorage.setItem("token", res.data.token);
        toast.success(res.data.message);
      })
      .catch((err) => {
        toast.error("Invalid Credentials");
        console.log(err);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser();
  };
  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <section className="grid justify-center py-[36vh] 2xl:py-[24.8vh] bg-[#F9F5F0]">
        <div className="grid isolate justify-center py-8 aspect-video w-96 rounded-xl bg-[#E3DDC3] shadow-lg ring-1 ring-black">
          <h1 className="text-3xl">Login Here</h1>
          <form className="grid gap-1 pt-12 pb-8" onSubmit={handleSubmit}>
            <input
              type="email"
              value={data.email}
              name="email"
              placeholder="Email"
              className="border-2 rounded-lg px-2 py-2 outline-none"
              onChange={handleChange}
            />
            <br />
            <input
              type="password"
              name="password"
              value={data.password}
              placeholder="Password"
              className="border-2 rounded-lg px-2 py-2 outline-none"
              onChange={handleChange}
            />
            <button
              type="submit"
              className="w-5/12 mt-4 rounded-lg py-1 bg-[#000] text-[#FFFFFF] mx-auto flex justify-center "
            >
              Login
            </button>
          </form>
          <h2>
            Don't have an Account ?
            <Link to="/signUp">
              <span className="text-[#FFFFFF]  cursor-pointer">
                {" "}
                SignUp Here
              </span>
            </Link>
          </h2>
        </div>
      </section>
    </>
  );
};

export default Login;
