import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { Loading } from 'notiflix/build/notiflix-loading-aio';
const ItemModal = ({ item, onClose }) => {
  if (!item) return null;

  const addToCartUrl =
    "https://get-styled-backend.onrender.com/order/addToCart";

  const navigate = useNavigate();

  const Msg = ({ closeToast, toastProps }) => (
    <div>
      <Link to="/cart">View Cart</Link>
    </div>
  );

  const addToCart = async () => {
    Loading.standard('Loading...')
    try {
      const response = await axios.post(
        addToCartUrl,
        {
          productId: item._id,
          quantity: 1,
        },
        {
          headers: {
            "auth-x-token": localStorage.getItem("token"),
          },
        }
      );

      Loading.remove();
      toast.success(<Msg />);
      // window.location.reload();
    } catch (err) {
      navigate("/login");
      Loading.remove();
      toast.info("Login To Purchase");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="p-16 h-6/6 rounded shadow-lg mx-4 w-10/12 2xl:w-5/12 bg-white ">
        <div className="flex justify-end pb-4">
          <button onClick={onClose} className="text-2xl border-2 p-2">
            {/* X  */}
            Close
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
            {/* <div className="flex justify-center border-2 mt-4">
              <div className="border-2 flex justify-center w-4/12">S</div>
              <div className="border-2 flex justify-center w-4/12">M</div>
              <div className="border-2 flex justify-center w-4/12">L</div>
            </div> */}
            <button className="mt-4 border-4 py-1 px-4" onClick={addToCart}>
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemModal;
