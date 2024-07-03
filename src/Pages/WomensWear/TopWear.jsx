import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import axios from "axios";
import ItemModal from "../SelectItem/SelectItem";
import ReactStars from "react-rating-stars-component";

const WomenTopWear = () => {
  const [topwear, setTopwear] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const urlforFoot =
    "https://get-styled-backend.onrender.com/product/getAllProduct";

  useEffect(() => {
    getTop();
  }, []);

  const getTop = async () => {
    try {
      const res = await axios.get(urlforFoot);
      const filteredData = res.data.result.filter(
        (item) => item.ProductType === "Shirt"
      );
      const filteredDataforMen = filteredData.filter(
        (item) => item.ProductCategory === "Women"
      );
      setTopwear(filteredDataforMen);
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
      <Navbar />
      <section className="px-16 py-20 bg-[#F9F5F0]">
        {topwear.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 justify-center gap-6">
            {topwear.map((item, index) => (
              <div
                key={index}
                onClick={() => handleItemClick(item)}
                className="rounded-2 h-4/12 p-2 bg-[#E3DDC3]"
              >
                <div>
                  <img
                    className="w-[400px]"
                    src={item?.ProductImage}
                    alt={item?.ProductName}
                  />
                </div>
                <div className="px-4 py-4">
                  <h2 className="flex justify-start text-1xl py-3">
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
      </section>

      {isModalOpen && <ItemModal item={selectedItem} onClose={closeModal} />}
    </>
  );
};

export default WomenTopWear;
