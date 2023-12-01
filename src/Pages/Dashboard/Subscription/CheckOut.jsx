import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useShopProductDB from "../../../Hooks/useShopProductDB";
import { AuthContext } from "../../../Provider/AuthProvider";
const CheckOut = ({ bill, limit }) => {
  const { user } = useContext(AuthContext);
  const stripe = useStripe();
  const { shop, refetch } = useShopProductDB();
  const elements = useElements();
  const [error, setError] = useState("");
  const [transcationId, setTranscationId] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (bill > 0) {
      axiosSecure
        .post("/create-payment-intent", { price: bill })
        .then((res) => setClientSecret(res.data.clientSecret));
    }
  }, [axiosSecure, bill]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
      setError(error.message);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
      setError("");
    }

    const { paymentIntent, error: confirmationError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.displayName || "anonymous",
            email: user?.email || "anonymous",
          },
        },
      });
    if (confirmationError) {
      console.log("confirm error");
      setError(confirmationError.message);
    } else {
      console.log("payment intent", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        console.log("transactionId", paymentIntent.id);
        setTranscationId(paymentIntent.id);
        // save the payment to DB

        const payment = {
          email: "gm@gmail.com",
          price: bill,
          limit: limit,
          shopName: shop?.shopName,
          status: "success",
        };

        const res = await axiosSecure.post("/payments/subscription", payment);
        console.log(res.data);
        refetch();
        if (res.data?.paymentResult?.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your order has been successfull!",
            showConfirmButton: false,
            timer: 1500,
          });
          refetch();
        }
      }
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          className="btn btn-outline border-black text-black hover:text-white hover:bg-black btn-sm mt-10"
          type="submit"
          disabled={!stripe || !clientSecret}
        >
          Pay
        </button>
        <p className=" text-red-700 italic">{error}</p>
        {transcationId && <p>Your transaction id: {transcationId}</p>}
      </form>
    </>
  );
};

export default CheckOut;
