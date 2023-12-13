import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import CheckOut from "./Checkout";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);
const Subscription = () => {
  const [bill, setBill] = useState();
  const [limit, setLimit] = useState();
  const handleBill = (bill, limit) => {
    setBill(bill);
    setLimit(limit);
  };
  return (
    <>
      <Helmet>
        <title>ShopWise | Subscription</title>
      </Helmet>
      <div>
        <p className=" text-xl md:text-3xl my-5 text-center font-medium text-sky-700 mb-5">
          Choose your Plan
        </p>
        <div className="grid mb-5 grid-cols-1 md:grid-cols-3 gap-5 align-middle">
          <div className="h-32 lg:h-40 rounded text-white text-lg font-medium flex items-center justify-center shadow-lg  bg-gradient-to-r from-[#ff3434] to-[#e09c9c]">
            <div className="flex items-start justify-center flex-col pl-2">
              <p>Standard Pack</p>
              <p>Pay $10</p>
              <p>Product limit: 200</p>
              <button
                onClick={() => handleBill(10, 200)}
                className="btn btn-outline border-black text-black hover:text-white hover:bg-black btn-sm mt-5"
              >
                Purchase
              </button>
            </div>
          </div>
          <div className="h-32 lg:h-40 rounded text-white text-lg font-medium flex items-center justify-center shadow-lg  bg-gradient-to-r from-green-500 to-green-200">
            <div className="flex items-start justify-center flex-col pl-2">
              <p>Medium Pack</p>
              <p>Pay $20</p>
              <p>Product limit: 450</p>
              <button
                onClick={() => handleBill(20, 450)}
                className="btn btn-outline border-black text-black hover:text-white hover:bg-black btn-sm mt-5"
              >
                Purchase
              </button>
            </div>
          </div>
          <div className="h-32 lg:h-40 rounded text-white text-lg font-medium flex items-center justify-center shadow-lg  bg-gradient-to-r from-sky-500 to-sky-200">
            <div className="flex items-start justify-center flex-col pl-2">
              <p>Heavy Pack</p>
              <p>Pay $50</p>
              <p>Product limit: 1500</p>
              <button
                onClick={() => handleBill(50, 1500)}
                className="btn btn-outline border-black text-black hover:text-white hover:bg-black btn-sm mt-5"
              >
                Purchase
              </button>
            </div>
          </div>
        </div>
        <div className=" bg-slate-100 mt-10 border rounded-lg p-5 lg:p-10">
          <Elements stripe={stripePromise}>
            <CheckOut bill={bill} limit={limit} />
          </Elements>
        </div>
      </div>
    </>
  );
};

export default Subscription;
