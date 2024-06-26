import React from "react";
import axios from "axios";
import { toast } from "react-toastify"; 
const ItemModal = ({ item, onClose }) => {
  if (!item) return null;

  const addToCartUrl = "https://get-styled-backend.onrender.com/order/addToCart";

  const addToCart = async () => {
    try {
      const response = await axios.post(
        addToCartUrl,
        {
          productId: item._id,
          quantity: 1,
        },
        {
          headers: {
            "auth-x-token": document.cookie,
          },
        }
      );
      
      toast.success("Item added to cart");
    } catch (err) {
      toast.error("Error adding to cart");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="p-8 rounded shadow-lg mx-4 w-10/12 2xl:w-5/12 bg-white">
        <div className="flex justify-end pb-4">
          <button onClick={onClose} className="text-2xl">
            X Close
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 border-2 justify-center gap-12 p-4">
          <div>
            <img className="" src={item.ProductImage} alt={item.ProductName} />
          </div>
          <div className="py-4 pr-4">
            <h2 className="text-2xl">{item.ProductName}</h2>
            <p className="text-lg mt-2">{item.ProductDescription}</p>
            <p className="text-lg mt-4">RS. {item.ProductPrice}</p>
            <div className="flex justify-center border-2 mt-4">
              <div className="border-2 flex justify-center w-4/12">S</div>
              <div className="border-2 flex justify-center w-4/12">M</div>
              <div className="border-2 flex justify-center w-4/12">L</div>
            </div>
            <button
              className="mt-4 border-4 py-1 px-4"
              onClick={addToCart}
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemModal;
