import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Cart from "./Components/Cart/Cart";
import Login from "./Pages/Login/Login";
import SignUp from "./Pages/SignUp/SignUp";
import Mens from "./Pages/NavSection/Mens"
import Womens from "./Pages/NavSection/Women"
import Kids from "./Pages/NavSection/kids"
import { ToastContainer } from "react-toastify";
import MenBottomWear from "./Pages/Menswear/BottomWear";
import MenFootWear from "./Pages/Menswear/FootWear";
import MenTopWear from "./Pages/Menswear/TopWear";
import WomenTopWear from "./Pages/WomensWear/TopWear";
import WomenFootWear from "./Pages/WomensWear/FootWear";
import WomenBottomWear from "./Pages/WomensWear/BottomWear";
import KidsTopWear from "./Pages/KidsWear/TopWear";
import KidsBottomWear from "./Pages/KidsWear/BottomWear";
import KidsFootWear from "./Pages/KidsWear/FootWear";

const App = () => {
  return (
    <BrowserRouter>
    <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/mens" element={< Mens/>} />
        <Route path="/womens" element={<Womens />} />
        <Route path="/kids" element={<Kids />} />
        <Route>
        <Route path="/menTop" element={<MenTopWear />} />
        <Route path="/menFoot" element={<MenFootWear />} />
        <Route path="/menbottom" element={<MenBottomWear />} />
        </Route>
        <Route>
        <Route path="/womenTop" element={<WomenTopWear />} />
        <Route path="/womenFoot" element={<WomenFootWear />} />
        <Route path="/womenbottom" element={<WomenBottomWear />} />
        </Route>
        <Route>
        <Route path="/kidsTop" element={< KidsTopWear/>} />
        <Route path="/kidsFoot" element={<KidsFootWear />} />
        <Route path="/kidsbottom" element={<KidsBottomWear />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
