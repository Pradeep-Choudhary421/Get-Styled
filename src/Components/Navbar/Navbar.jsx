import React, { useEffect, useState } from "react";
import { TfiAlignJustify, TfiClose } from "react-icons/tfi";
import { Link } from "react-router-dom";
import axios from "axios";
import { GiShoppingCart } from "react-icons/gi";
import Badge from "@mui/material/Badge";
import "./navbar.css";

const Navbar = () => {
  const [ham, setHam] = useState(false);
  const [menlist, setMenList] = useState(false);
  const [womenlist, setWomenList] = useState(false);
  const [kidlist, setKidList] = useState(false);

  const [orderedItem, setOrderedItem] = useState([]);
  const itemsUrl = "http://localhost:6060/order/getcartItems";

  useEffect(() => {
    getItems();
  });
  const getItems = async () => {
    try {
      const response = await axios.get(itemsUrl, {
        headers: {
          "auth-x-token": document.cookie,
        },
      });
      setOrderedItem(response.data.result);
    } catch (err) {
      console.log(err);
    }
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
      <nav className="flex bg-[#F9F5F0] border-b-2 border-black justify-between px-12 py-5 fixed w-[100%] z-50">
        <div className="logo font-link text-2xl">Get-Styled</div>
        <div className="hidden md:block mr-12">
          <ul className="flex justify-evenly gap-16">
            <li className="cursor-pointer">
              <Link to="/">Home</Link>
            </li>
            <li className="relative cursor-pointer" onClick={handleMenList}>
              Men
              <ul
                className={`absolute left-0 mt-2 p-2 z-50 bg-white border rounded shadow-lg ${
                  menlist ? "block" : "hidden"
                }`}
              >
                <li className="py-1 px-3 hover:bg-gray-200"><Link to="/menTop">Top</Link></li>
                <li className="py-1 px-3 hover:bg-gray-200"><Link to="/menbottom">Bottom</Link></li>
                <li className="py-1 px-3 hover:bg-gray-200"><Link to="/menFoot">Foot</Link></li>
              </ul>
            </li>
            <li className="relative cursor-pointer" onClick={handleWomenList}>
              Women
              <ul
                className={`absolute left-0 mt-2 p-2 z-50 bg-white border rounded shadow-lg ${
                  womenlist ? "block" : "hidden"
                }`}
              >
                <li className="py-1 px-3 hover:bg-gray-200"><Link to="/womenTop">Top</Link></li>
                <li className="py-1 px-3 hover:bg-gray-200"><Link to="/womenbottom">Bottom</Link></li>
                <li className="py-1 px-3 hover:bg-gray-200"><Link to="/womenFoot">Foot</Link></li>
              </ul>
            </li>
            <li className="relative cursor-pointer" onClick={handlekidsList}>
              Kid
              <ul
                className={`absolute left-0 mt-2 p-2 z-50 bg-white border rounded shadow-lg ${
                  kidlist ? "block" : "hidden"
                }`}
              >
                <li className="py-1 px-3 hover:bg-gray-200"><Link to="/kidsTop">Top</Link></li>
                <li className="py-1 px-3 hover:bg-gray-200"><Link to="/kidsbottom">Bottom</Link></li>
                <li className="py-1 px-3 hover:bg-gray-200"><Link to="/kidsFoot">Foot</Link></li>
              </ul>
            </li>
          </ul>
        </div>
        <div className="flex gap-4">
          <div>
            <Link to="/login">
              <button className=" rounded-lg py-1 px-2 bg-[#000] text-[#FFFFFF]  flex justify-center border-2 border-2xl">
                Login
              </button>
            </Link>
          </div>
          <div className="text-3xl mt-[-10px]">
            <Badge badgeContent={orderedItem.length} color="primary">
              <Link to="/cart">
                <GiShoppingCart className="cursor-pointer" />
              </Link>
            </Badge>
          </div>
          <div className="block text-3xl md:hidden" onClick={handleToggle}>
            {ham ? <TfiClose /> : <TfiAlignJustify />}
          </div>
        </div>
      </nav>
      {/* mobile screen */}
      <div
        className={`transition-max-height duration-500 ease-in-out ${
          ham ? "max-h-60" : "max-h-0"
        } overflow-hidden md:hidden`}
      >
        <div className="grid grid-cols-1 bg-red-300">
          <div className="flex justify-center py-3 border-b border-gray-200 cursor-pointer">
            <Link to="/">Home</Link>
          </div>
          <div className="flex justify-center py-3 border-b border-gray-200 cursor-pointer">
            Men
          </div>
          <div className="flex justify-center py-3 border-b border-gray-200 cursor-pointer">
            Women
          </div>
          <div className="flex justify-center py-3 border-b border-gray-200 cursor-pointer">
            Kids
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
