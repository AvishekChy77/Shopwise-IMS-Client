import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { FaCheck } from "react-icons/fa6";
import { PageTransition } from "../../../Components/Motion";
import CheckOut from "./Checkout";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);

const plans = [
  {
    name: "Standard Pack",
    price: 10,
    limit: 200,
    perks: ["200 product slots", "Sales dashboard", "Email support"],
    featured: false,
  },
  {
    name: "Medium Pack",
    price: 20,
    limit: 450,
    perks: ["450 product slots", "Sales dashboard", "Priority support"],
    featured: true,
  },
  {
    name: "Heavy Pack",
    price: 50,
    limit: 1500,
    perks: ["1500 product slots", "Sales dashboard", "Dedicated support"],
    featured: false,
  },
];

const Subscription = () => {
  const [bill, setBill] = useState();
  const [limit, setLimit] = useState();
  const handleBill = (bill, limit) => {
    setBill(bill);
    setLimit(limit);
  };

  return (
    <PageTransition>
      <Helmet>
        <title>ShopWise | Subscription</title>
      </Helmet>

      <div className="mb-10 text-center">
        <h1 className="font-display text-2xl font-bold text-brand-950 md:text-3xl">
          Choose your <span className="text-gradient">plan</span>
        </h1>
        <p className="mt-2 text-sm text-slate-400">
          Raise your product limit as your shop grows
        </p>
      </div>

      <div className="mb-10 grid gap-6 md:grid-cols-3">
        {plans.map((plan) => {
          const selected = bill === plan.price;
          return (
            <div
              key={plan.name}
              className={`surface relative flex flex-col p-7 transition-all duration-300 ${
                plan.featured ? "border-brand-500 shadow-lift" : ""
              } ${selected ? "ring-2 ring-brand-600" : ""}`}
            >
              {plan.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-brand-600 to-brand-800 px-4 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
                  Most popular
                </span>
              )}
              <h3 className="font-display font-bold text-brand-950">{plan.name}</h3>
              <p className="font-display mt-3 text-4xl font-extrabold text-brand-700">
                ${plan.price}
                <span className="text-sm font-medium text-slate-400"> one-time</span>
              </p>
              <ul className="mt-5 flex-1 space-y-2.5">
                {plan.perks.map((perk) => (
                  <li key={perk} className="flex items-center gap-2 text-sm text-slate-600">
                    <FaCheck className="text-leaf-500" /> {perk}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handleBill(plan.price, plan.limit)}
                className={`mt-6 w-full ${
                  plan.featured ? "btn-brand" : "btn-ghost-brand"
                } !py-2.5 text-sm`}
              >
                {selected ? "Selected ✓" : "Purchase"}
              </button>
            </div>
          );
        })}
      </div>

      {bill && (
        <div className="surface mx-auto max-w-xl p-8">
          <h3 className="font-display mb-1 font-bold text-brand-950">
            Complete your payment
          </h3>
          <p className="mb-6 text-sm text-slate-400">
            ${bill} — raises your product limit to {limit}
          </p>
          <Elements stripe={stripePromise}>
            <CheckOut bill={bill} limit={limit} />
          </Elements>
        </div>
      )}
    </PageTransition>
  );
};

export default Subscription;
