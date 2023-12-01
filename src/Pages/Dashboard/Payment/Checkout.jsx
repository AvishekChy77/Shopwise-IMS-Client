import { PDFDownloadLink } from "@react-pdf/renderer";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useCart from "../../../Hooks/useCart";
import useShopProductDB from "../../../Hooks/useShopProductDB";
import { AuthContext } from "../../../Provider/AuthProvider";
import { MyDocument } from "./PDFMaker";
const Checkout = () => {
  const { user } = useContext(AuthContext);
  const stripe = useStripe();
  const { refetch } = useShopProductDB();
  const elements = useElements();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [on, setOn] = useState(false);
  const [transcationId, setTranscationId] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const axiosSecure = useAxiosSecure();
  const { cart } = useCart();
  const totalPrice = cart.reduce((total, item) => total + item.price, 0);
  // date
  const currentDate = new Date();
  const day = String(currentDate.getDate()).padStart(2, "0");
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const year = currentDate.getFullYear();
  const hours = String(currentDate.getHours()).padStart(2, "0");
  const minutes = String(currentDate.getMinutes()).padStart(2, "0");
  const seconds = String(currentDate.getSeconds()).padStart(2, "0");

  const addedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  const currentTime = new Date();
  const currentTimeAsNumber = currentTime.getTime();
  console.log(currentTimeAsNumber);

  useEffect(() => {
    if (totalPrice > 0) {
      axiosSecure
        .post("/create-payment-intent", { price: totalPrice })
        .then((res) => setClientSecret(res.data.clientSecret));
    }
  }, [axiosSecure, totalPrice]);

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
        setOn(true);
        // save the payment to DB

        const payment = {
          email: user.email,
          price: totalPrice,
          transcationId: paymentIntent.id,
          date: addedDateTime,
          timecount: currentTimeAsNumber,
          cartIds: cart.map((item) => item._id),
          productIds: cart.map((item) => item.productId),
          status: "success",
        };

        const res = await axiosSecure.post("/payments", payment);
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
      <PDFDownloadLink
        document={
          <MyDocument
            transcationId={transcationId}
            totalPrice={totalPrice}
            date={addedDateTime}
          ></MyDocument>
        }
        fileName={name}
      >
        {({ loading }) =>
          loading ? (
            <button className="btn btn-sm text-white rounded border-none mr-2 hover:text-[#FF3811] hover:bg-none bg-[#FF3811]">
              Loading...
            </button>
          ) : (
            <button
              disabled={!on}
              className="btn btn-sm mt-5 text-white rounded border-none mr-2 hover:text-[#FF3811] hover:bg-none bg-[#FF3811]"
            >
              Download receipt
            </button>
          )
        }
      </PDFDownloadLink>
    </>
  );
};

export default Checkout;
