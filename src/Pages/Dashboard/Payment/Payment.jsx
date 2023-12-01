import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Helmet } from "react-helmet-async";
import Checkout from "./Checkout";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);
const Payment = () => {
  return (
    <>
      <Helmet>
        <title>ShopWise | Payment</title>
      </Helmet>
      <div className="my-20 p-4 max-w-3xl mx-auto lg:px-10">
        <h2 className="text-3xl text-center mb-10 font-bold">
          Payment Through Card
        </h2>
        <Elements stripe={stripePromise}>
          <Checkout></Checkout>
        </Elements>
      </div>
    </>
  );
};

export default Payment;
