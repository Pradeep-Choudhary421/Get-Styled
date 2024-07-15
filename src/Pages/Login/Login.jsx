import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import axios from "axios";
const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const url = "https://get-styled-backend.onrender.com/user/login";
  const navigate = useNavigate();
  const loginUser = () => {
    Loading.standard('Loading...')
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
        Loading.remove()
        toast.success(res.data.message);
      })
      .catch((err) => {
        Loading.remove()
        toast.error("Invalid Email or Password");
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
      {/* ----------------------------------------------------------- */}
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
                  <h1 className="text-4xl text-center font-thin">
                    Welcome Back
                  </h1>
                  <div className="w-full mt-4">
                    <form
                      className="form-horizontal w-3/4 mx-auto"
                      method="POST"
                      onSubmit={handleSubmit}
                    >
                      <div className="flex flex-col mt-4">
                        <input
                          id="email"
                          type="text"
                          className="flex-grow h-8 px-2 border rounded border-grey-400"
                          name="email"
                          required
                          placeholder="Email"
                          value={data.email}
                          onChange={handleChange}
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
                          onChange={handleChange}
                        />
                      </div>
                      <div className="flex flex-col mt-8">
                        <button
                          type="submit"
                          className="bg-[#e8e5e1] hover:bg-[#f0ece7] text-black text-sm font-semibold py-2 px-4 rounded"
                        >
                          Login
                        </button>
                      </div>
                    </form>
                    <div className="text-center mt-4">
                      <Link to="/resetPass">
                        <span
                          className="no-underline hover:underline text-blue-dark text-xs"
                          href="#"
                        >
                          Forgot Your Password?
                        </span>
                      </Link>
                    </div>
                    <div className="text-center mt-4">
                      <span
                        className="no-underline hover:underline text-blue-dark text-xs"
                        href="#register"
                      >
                        Don't Have an Account?
                        <span className="text-lg">
                          <Link to="/signUp">Register Here</Link>
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

export default Login;
