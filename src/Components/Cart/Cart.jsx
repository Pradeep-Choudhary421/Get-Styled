import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import { Link } from "react-router-dom";

const Cart = () => {
  const [orderedItem, setOrderedItem] = useState([]);
  const itemsUrl = "https://get-styled-backend.onrender.com/order/getcartItems";

  useEffect(() => {
    getItems();
  }, []);
  const getItems = async () => {
    try {
      const response = await axios.get(itemsUrl, {
        headers: {
          "auth-x-token": document.cookie.split("=")[1],
        },
      });
      setOrderedItem(response.data.result);
      console.log(response.data.result);
    } catch (err) {
      console.log(err);
    }
  };

  const handleIncrease = (index) => {
    const newOrderedItem = [...orderedItem];
    newOrderedItem[index].quantity += 1;
    setOrderedItem(newOrderedItem);
  };

  const handleDecrease = (index) => {
    const newOrderedItem = [...orderedItem];
    if (newOrderedItem[index].quantity > 1) {
      newOrderedItem[index].quantity -= 1;
      setOrderedItem(newOrderedItem);
    }
  };

  const handleRemove = (index) => {
    const newOrderedItem = [...orderedItem];
    newOrderedItem.splice(index, 1);
    setOrderedItem(newOrderedItem);
    };

  const getTotalPrice = () => {
    return orderedItem.reduce((total, item) => {
      return total + item.product.ProductPrice * item.quantity;
    }, 0);
  };

  return (
    <>
      <Navbar />
      <section className="bg-[#F9F5F0] antialiased md:py-16">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <h2 className="text-xl sm:text-2xl">Shopping Cart</h2>
          <div className="mt-6 sm:mt-8 md:gap-6 pb-[50vh] 5xl:pb-[20vh] lg:flex lg:items-start xl:gap-8">
            <div className="mx-auto w-full lg:max-w-2xl xl:max-w-4xl">
              {orderedItem.map((item, index) => (
                <div key={item._id} className="space-y-6 mb-4">
                  <div className="rounded-lg border border-gray-200 p-4 shadow-sm bg-[#E3DDC3] md:p-6">
                    <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                      <a href="#" className="shrink-0 md:order-1">
                        <div className="overflow-hidden">
                          <img
                            className="hidden h-30 w-20 dark:block"
                            src={item.product.ProductImage}
                            alt="product image"
                          />
                        </div>
                      </a>
                      <label htmlFor="counter-input" className="sr-only">
                        Choose quantity:
                      </label>
                      <div className="flex items-center justify-between md:order-3 md:justify-end">
                        <div className="flex items-center">
                          <button
                            onClick={() => handleDecrease(index)}
                            type="button"
                            id="decrement-button"
                            data-input-counter-decrement="counter-input"
                            className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-[#F9F5F0] hover:bg-gray-200"
                          >
                            <svg
                              className="h-2.5 w-2.5 text-gray-900 dark:text-white"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 18 2"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M1 1h16"
                              />
                            </svg>
                          </button>
                          <input
                            type="text"
                            id="counter-input"
                            data-input-counter
                            className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0 dark:text-black"
                            placeholder=""
                            value={item.quantity}
                            readOnly
                          />
                          <button
                            onClick={() => handleIncrease(index)}
                            type="button"
                            id="increment-button"
                            data-input-counter-increment="counter-input"
                            className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-[#F9F5F0] hover:bg-gray-200 focus:outline-none dark:focus:ring-gray-700"
                          >
                            <svg
                              className="h-2.5 w-2.5 text-white"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 18 18"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 1v16M1 9h16"
                              />
                            </svg>
                          </button>
                        </div>
                        <div className="text-end md:order-4 md:w-32">
                          <p className="text-base font-bold text-gray-900">
                            ${item.product.ProductPrice * item.quantity}
                          </p>
                        </div>
                      </div>
                      <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                        <a
                          href="#"
                          className="text-base font-medium text-gray-900 hover:underline"
                        >
                          {item.product.ProductName}
                        </a>
                        <div className="flex items-center gap-4">
                          <button
                            onClick={() => handleRemove(item._id)}
                            type="button"
                            className="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500"
                          >
                            <svg
                              className="me-1.5 h-5 w-5"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18 17.94 6M18 18 6.06 6"
                              />
                            </svg>
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
              <div className="space-y-4 rounded-lg bg-[#E3DDC3] p-4 shadow-sm sm:p-6">
                <p className="text-xl font-semibold text-gray-900">
                  Order summary
                </p>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <dl className="flex items-center justify-between gap-4">
                      <dt className="text-base font-normal text-gray-500">
                        Total Price
                      </dt>
                      <dd className="text-base font-medium text-gray-900">
                        ${getTotalPrice().toFixed(2)}
                      </dd>
                    </dl>
                  </div>
                  <a
                    href="#"
                    className="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    Proceed to Checkout
                  </a>
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-sm font-normal text-gray-500"> or </span>
                    <a
                      href="#"
                      title=""
                      className="inline-flex items-center gap-2 text-sm font-medium text-primary-700 underline hover:no-underline dark:text-primary-500"
                      >
                      <Link to="/">
                      Continue Shopping
                      </Link>
                      <svg
                        className="h-5 w-5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 12H5m14 0-4 4m4-4-4-4"
                        />
                      </svg>
                    </a>
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

export default Cart;
