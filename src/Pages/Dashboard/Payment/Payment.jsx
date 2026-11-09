import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Helmet } from "react-helmet-async";
import { PageTransition } from "../../../Components/Motion";
import Checkout from "./Checkout";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);

const Payment = () => {
  return (
    <PageTransition>
      <Helmet>
        <title>ShopWise | Payment</title>
      </Helmet>
      <div className="mx-auto max-w-2xl">
        <div className="mb-8 text-center">
          <h1 className="font-display text-2xl font-bold text-brand-950 md:text-3xl">
            Pay through <span className="text-gradient">card</span>
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            Complete the sale with a secure Stripe payment
          </p>
        </div>
        <div className="surface p-8">
          <Elements stripe={stripePromise}>
            <Checkout></Checkout>
          </Elements>
        </div>
      </div>
    </PageTransition>
  );
};

export default Payment;
