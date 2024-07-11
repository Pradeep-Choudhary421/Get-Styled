import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const url = "http://localhost:6060/user/login";
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
      {/* ----------------------------------------------------------- */}
      <section>
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
                    "url('https://images.unsplash.com/photo-1515965885361-f1e0095517ea?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3300&q=80')",
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
                          className="bg-blue-500 hover:bg-blue-700 text-white text-sm font-semibold py-2 px-4 rounded"
                        >
                          Login
                        </button>
                      </div>
                    </form>
                    <div className="text-center mt-4">
                      <a
                        className="no-underline hover:underline text-blue-dark text-xs"
                        href="#"
                      >
                        Forgot Your Password?
                      </a>
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
