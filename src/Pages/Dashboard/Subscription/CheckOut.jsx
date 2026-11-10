import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import { FaLock } from "react-icons/fa6";
import Swal from "sweetalert2";
import useAxiosSecure, { apiError } from "../../../Hooks/useAxiosSecure";
import useShopProductDB from "../../../Hooks/useShopProductDB";
import { AuthContext } from "../../../Provider/AuthProvider";

const cardStyle = {
  style: {
    base: { fontSize: "16px", color: "#16263a", "::placeholder": { color: "#94a3b8" } },
    invalid: { color: "#e11d48" },
  },
};

const CheckOut = ({ plan, bill }) => {
  const { user } = useContext(AuthContext);
  const stripe = useStripe();
  const elements = useElements();
  const { refetch } = useShopProductDB();
  const axiosSecure = useAxiosSecure();
  const [error, setError] = useState("");
  const [paying, setPaying] = useState(false);
  const [done, setDone] = useState(false);
  const [clientSecret, setClientSecret] = useState("");

  // the plan's price and limit are looked up on the server
  useEffect(() => {
    if (!plan) return;
    setDone(false);
    setClientSecret("");
    axiosSecure
      .post("/create-payment-intent", { type: "subscription", plan })
      .then((res) => {
        setClientSecret(res.data.clientSecret);
        setError("");
      })
      .catch((err) => setError(apiError(err, "Could not start the payment")));
  }, [axiosSecure, plan]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    const card = elements.getElement(CardElement);
    if (card == null) return;

    setPaying(true);
    setError("");
    const { paymentIntent, error: confirmationError } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card,
          billing_details: {
            name: user?.displayName || "anonymous",
            email: user?.email || "anonymous",
          },
        },
      }
    );

    if (confirmationError) {
      setError(confirmationError.message);
    } else if (paymentIntent.status === "succeeded") {
      try {
        const res = await axiosSecure.post("/payments/subscription", {
          transcationId: paymentIntent.id,
        });
        if (res.data?.paymentResult?.insertedId) {
          setDone(true);
          refetch();
          Swal.fire({
            icon: "success",
            title: "Plan activated!",
            text: "Your product limit has been raised.",
            confirmButtonColor: "#265073",
          });
        }
      } catch (err) {
        setError(apiError(err, "Payment went through but could not be recorded"));
      }
    }
    setPaying(false);
  };

  if (done) {
    return (
      <div className="text-center">
        <p className="text-4xl">🎉</p>
        <p className="font-display mt-2 text-xl font-bold text-brand-950">Plan activated</p>
        <p className="mt-1 text-sm text-slate-400">Your new product limit is live.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="rounded-xl border border-slate-300 bg-slate-50 px-4 py-4">
        <CardElement options={cardStyle} />
      </div>
      <button
        className="btn-brand mt-6 w-full"
        type="submit"
        disabled={!stripe || !clientSecret || paying}
      >
        <FaLock /> {paying ? "Processing…" : `Pay $${bill}`}
      </button>
      {error && (
        <p className="mt-4 rounded-xl bg-rose-50 px-4 py-2.5 text-sm font-medium text-rose-600">
          {error}
        </p>
      )}
    </form>
  );
};

export default CheckOut;
