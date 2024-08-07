import React, { useEffect, useState } from "react";
import { TfiAlignJustify, TfiClose } from "react-icons/tfi";
import { Link } from "react-router-dom";
import axios from "axios";
import { GiShoppingCart } from "react-icons/gi";
import Badge from "@mui/material/Badge";
import { Loading } from "notiflix/build/notiflix-loading-aio";
import "./navbar.css";

const Navbar = () => {
  const [ham, setHam] = useState(false);
  const [menlist, setMenList] = useState(false);
  const [womenlist, setWomenList] = useState(false);
  const [kidlist, setKidList] = useState(false);
  const [tokenExist, setTokenExist] = useState(
    localStorage.getItem("token") != null
  );

  const [orderedItem, setOrderedItem] = useState([]);
  const itemsUrl = "https://get-styled-backend.onrender.com/order/getcartItems";

  useEffect(() => {
    getItems();
  }, []);
  const getItems = async () => {
    if (localStorage.getItem("token") != null) {
      try {
        const response = await axios.get(itemsUrl, {
          headers: {
            "auth-x-token": localStorage.getItem("token"),
          },
        });
        setOrderedItem(response.data.result);
      } catch (err) {
        console.log(err);
      }
    }
  };
  const handleLogOut = () => {
    Loading.dots("Loading...", {
      backgroundColor: "rgba(0,0,0,0.8)",
      svgColor: "#E3DDC3",
    });
    localStorage.removeItem("token");
    setTokenExist(false);
    Loading.remove(1500);
  };

  const handleToggle = () => {
    setHam(!ham);
  };

  const handleMenList = () => {
    setMenList(!menlist);
    setKidList(false);
    setWomenList(false);
  };
  const handleWomenList = () => {
    setWomenList(!womenlist);
    setMenList(false);
    setKidList(false);
  };
  const handlekidsList = () => {
    setKidList(!kidlist);
    setWomenList(false);
    setMenList(false);
  };

  return (
    <>
      <nav className="flex bg-[#F9F5F0] border-b-2 border-black justify-between px-12 py-5 fixed w-[100%] z-50 ">
        <div className="logo font-link text-2xl">
          <Link to="/">Get-Styled</Link>
        </div>
        <div className="hidden md:block mr-12">
          <ul className="flex justify-evenly gap-16">
            <li className="cursor-pointer">
              <Link to="/">Home</Link>
            </li>
            <li className="relative cursor-pointer" onClick={handleMenList}>
              Men
              <ul
                className={`absolute left-0 mt-2 p-2 z-50 w-[200px] bg-white border rounded shadow-lg ${
                  menlist ? "block" : "hidden"
                }`}
              >
                <Link to="/menTop">
                  <li className="py-1 px-3 hover:bg-gray-200">Top Wears</li>
                </Link>
                <Link to="/menbottom">
                  <li className="py-1 px-3 hover:bg-gray-200">Bottom Wears</li>
                </Link>
                <Link to="/menFoot">
                  <li className="py-1 px-3 hover:bg-gray-200">Foot Wear</li>
                </Link>
              </ul>
            </li>
            <li className="relative cursor-pointer" onClick={handleWomenList}>
              Women
              <ul
                className={`absolute left-0 mt-2 p-2 z-50 w-[200px] bg-white border rounded shadow-lg ${
                  womenlist ? "block" : "hidden"
                }`}
              >
                <Link to="/womenTop">
                  <li className="py-1 px-3 hover:bg-gray-200">Top Wears</li>
                </Link>
                <Link to="/womenbottom">
                  <li className="py-1 px-3 hover:bg-gray-200">Bottom Wears</li>
                </Link>
                <Link to="/womenFoot">
                  <li className="py-1 px-3 hover:bg-gray-200">Foot Wears</li>
                </Link>
              </ul>
            </li>
            <li className="relative cursor-pointer" onClick={handlekidsList}>
              Kid
              <ul
                className={`absolute left-0 mt-2 p-2 z-50 w-[200px] bg-white border rounded shadow-lg ${
                  kidlist ? "block" : "hidden"
                }`}
              >
                <Link to="/kidsTop">
                  <li className="py-1 px-3 hover:bg-gray-200">Top Wears</li>
                </Link>
                <Link to="/kidsbottom">
                  <li className="py-1 px-3 hover:bg-gray-200">Bottom Wears</li>
                </Link>
                <Link to="/kidsFoot">
                  <li className="py-1 px-3 hover:bg-gray-200">Foot Wears</li>
                </Link>
              </ul>
            </li>
          </ul>
        </div>
        <div className="flex gap-4">
          <div>
            {tokenExist ? (
              <Link to="/">
                <button
                  className=" rounded-lg py-1 px-2 bg-[#000] text-[#FFFFFF]  flex justify-center border-2 border-2xl"
                  onClick={handleLogOut}
                >
                  Logout
                </button>
              </Link>
            ) : (
              <Link to="/login">
                <button className=" rounded-lg py-1 px-2 bg-[#000] text-[#FFFFFF]  flex justify-center border-2 border-2xl">
                  LogIn
                </button>
              </Link>
            )}
          </div>
          <div className="text-3xl mt-[-10px]">
            {tokenExist ? (
              <Badge badgeContent={orderedItem.length} color="primary">
                <Link to="/cart">
                  <GiShoppingCart className="cursor-pointer" />
                </Link>
              </Badge>
            ) : (
              <Badge badgeContent="0" color="primary">
                <Link to="/cart">
                  <GiShoppingCart className="cursor-pointer" />
                </Link>
              </Badge>
            )}
          </div>
          <div className="block text-3xl md:hidden" onClick={handleToggle}>
            {ham ? <TfiClose /> : <TfiAlignJustify />}
          </div>
        </div>
      </nav>
      {/* mobile screen */}
      <div
        className={` transition-all bg-[#F9F5F0] duration-700 ease-in-out ${
          ham ? "block" : "hidden"
        } overflow-hidden md:hidden`}
      >
        <div className="grid grid-cols-1 bg-[#F9F5F0] mt-16 border-2 border-b-black fixed w-full z-[2000]">
          <div className="flex justify-center py-3 border-b border-gray-200 cursor-pointer">
            <Link to="/">Home</Link>
          </div>
          <div className="flex justify-center py-3 border-b border-gray-200 cursor-pointer">
            <Link to="/mens">Men</Link>
          </div>
          <div className="flex justify-center py-3 border-b border-gray-200 cursor-pointer">
            <Link to="/womens">Women</Link>
          </div>
          <div className="flex justify-center py-3 border-b border-gray-200 cursor-pointer">
            <Link to="/kids">Kids</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
