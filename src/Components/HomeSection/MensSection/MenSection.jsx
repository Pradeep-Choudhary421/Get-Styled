import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ItemModal from "../../../Pages/SelectItem/SelectItem";
import ReactStars from "react-rating-stars-component";

const MenSection = () => {
  const [menData, setMenData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const urlforMen =
    "https://get-styled-backend.onrender.com/product/getAllProduct";

  useEffect(() => {
    getMen();
  }, []);

  const getMen = async () => {
    try {
      const res = await axios.get(urlforMen);
      const filteredData = res.data.result.filter(
        (item) => item.ProductCategory === "Man"
      );
      setMenData(filteredData);
    } catch (err) {
      console.log("Error", err.message);
    }
  };
  const handleItemClick = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  return (
    <>
      <div className="flex justify-center pt-12 bg-[#F9F5F0]">
        <h1 className="text-5xl px-8">Trending Men's Garments</h1>
      </div>
      <section className="px-16 py-20 bg-[#F9F5F0]">
        {menData.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 justify-center gap-6">
            {menData.slice(0, 6).map((item, index) => (
              <div
                key={index}
                onClick={() => handleItemClick(item)}
                className="rounded-2 h-4/12 p-2 bg-[#E3DDC3]"
              >
                <div className="flex justify-center">
                  <img
                    className=""
                    src={item?.ProductImage}
                    alt={item?.ProductName}
                  />
                </div>
                <div className="px-4 py-4">
                  <h2 className="flex justify-start text-1xl py-1">
                    {item?.ProductName}
                  </h2>
                  <p className="flex justify-start">RS. {item?.ProductPrice}</p>
                  <ReactStars
                    count={item?.ProductRating}
                    size={24}
                    activeColor="#F9F5F0"
                    color="#F9F5F0"
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex justify-center pt-12">
            <h2 className="text-3xl px-8"></h2>
          </div>
        )}
        <div className="py-8 flex justify-center">
          <button className="border-2 border-gray-600 p-2 cursor-pointer hover:bg-white duration-[500ms]">
            <Link to="/mens">Explore More</Link>
          </button>
        </div>
      </section>

      {isModalOpen && <ItemModal item={selectedItem} onClose={closeModal} />}
    </>
  );
};

export default MenSection;
