import React, { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const Home = lazy(() => import("./Pages/Home"));
const Cart = lazy(() => import("./Components/Cart/Cart"));
const Login = lazy(() => import("./Pages/Login/Login"));
const SignUp = lazy(() => import("./Pages/SignUp/SignUp"));
const Mens = lazy(() => import("./Pages/NavSection/Mens"));
const Womens = lazy(() => import("./Pages/NavSection/Women"));
const Kids = lazy(() => import("./Pages/NavSection/kids"));
const MenBottomWear = lazy(() => import("./Pages/Menswear/BottomWear"));
const MenFootWear = lazy(() => import("./Pages/Menswear/FootWear"));
const MenTopWear = lazy(() => import("./Pages/Menswear/TopWear"));
const WomenTopWear = lazy(() => import("./Pages/WomensWear/TopWear"));
const WomenFootWear = lazy(() => import("./Pages/WomensWear/FootWear"));
const WomenBottomWear = lazy(() => import("./Pages/WomensWear/BottomWear"));
const KidsTopWear = lazy(() => import("./Pages/KidsWear/TopWear"));
const KidsBottomWear = lazy(() => import("./Pages/KidsWear/BottomWear"));
const KidsFootWear = lazy(() => import("./Pages/KidsWear/FootWear"));
const ResetPass = lazy(() => import("./Pages/ResetPass/ResetPass"));
const OtpVerify = lazy(() => import("./Pages/ResetPass/OtpVerify"));
const UpdatePass = lazy(() => import("./Pages/ResetPass/UpdatePass"));

const App = () => {
  return (
    <BrowserRouter>
      <ToastContainer autoClose={1000} />
      <Suspense fallback={<div className="flex justify-center align-middle items-center my-auto bg-gray-400 h-screen text-4xl">Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/mens" element={<Mens />} />
          <Route path="/womens" element={<Womens />} />
          <Route path="/kids" element={<Kids />} />
          <Route path="/menTop" element={<MenTopWear />} />
          <Route path="/menFoot" element={<MenFootWear />} />
          <Route path="/menbottom" element={<MenBottomWear />} />
          <Route path="/womenTop" element={<WomenTopWear />} />
          <Route path="/womenFoot" element={<WomenFootWear />} />
          <Route path="/womenbottom" element={<WomenBottomWear />} />
          <Route path="/kidsTop" element={<KidsTopWear />} />
          <Route path="/kidsFoot" element={<KidsFootWear />} />
          <Route path="/kidsbottom" element={<KidsBottomWear />} />
          <Route path="/login" element={<Login />} />
          <Route path="/resetPass" element={<ResetPass />} />
          <Route path="/verifyOtp" element={<OtpVerify />} />
          <Route path="/updatePass" element={<UpdatePass />} />
          <Route path="/signUp" element={<SignUp />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
