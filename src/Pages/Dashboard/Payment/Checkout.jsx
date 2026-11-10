import { PDFDownloadLink } from "@react-pdf/renderer";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import { FaFileArrowDown, FaLock } from "react-icons/fa6";
import Swal from "sweetalert2";
import useAxiosSecure, { apiError } from "../../../Hooks/useAxiosSecure";
import useCart from "../../../Hooks/useCart";
import useShopProductDB from "../../../Hooks/useShopProductDB";
import { AuthContext } from "../../../Provider/AuthProvider";
import { MyDocument } from "./PDFMaker";

const cardStyle = {
  style: {
    base: { fontSize: "16px", color: "#16263a", "::placeholder": { color: "#94a3b8" } },
    invalid: { color: "#e11d48" },
  },
};

const Checkout = () => {
  const { user } = useContext(AuthContext);
  const stripe = useStripe();
  const elements = useElements();
  const { refetch } = useShopProductDB();
  const { cart, refetch: refetchCart } = useCart();
  const axiosSecure = useAxiosSecure();

  const [error, setError] = useState("");
  const [paying, setPaying] = useState(false);
  const [receipt, setReceipt] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const [amount, setAmount] = useState(0);
  const cartTotal = cart.reduce((total, item) => total + item.price, 0);

  // the server prices the cart and creates the intent; the client never sets the amount
  useEffect(() => {
    if (cartTotal > 0) {
      axiosSecure
        .post("/create-payment-intent", { type: "sale" })
        .then((res) => {
          setClientSecret(res.data.clientSecret);
          setAmount(res.data.amount);
          setError("");
        })
        .catch((err) => setError(apiError(err, "Could not start the payment")));
    }
  }, [axiosSecure, cartTotal]);

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
      setPaying(false);
      return;
    }

    if (paymentIntent.status === "succeeded") {
      try {
        // the server re-checks the intent with Stripe before recording the sale
        const res = await axiosSecure.post("/payments", { transcationId: paymentIntent.id });
        if (res.data?.paymentResult?.insertedId) {
          setReceipt({
            transcationId: paymentIntent.id,
            totalPrice: amount,
            date: new Date().toLocaleString("en-GB"),
          });
          Swal.fire({
            icon: "success",
            title: "Sale completed!",
            text: "Stock has been updated and the cart cleared.",
            confirmButtonColor: "#265073",
          });
          refetch();
          refetchCart();
        }
      } catch (err) {
        setError(apiError(err, "Payment went through but could not be recorded"));
      }
    }
    setPaying(false);
  };

  if (!cartTotal && !receipt) {
    return (
      <p className="text-center text-sm text-slate-400">
        Your cart is empty — add products from the sales collection first.
      </p>
    );
  }

  return (
    <div>
      {!receipt && (
        <form onSubmit={handleSubmit}>
          <div className="mb-5 flex items-center justify-between">
            <span className="text-sm font-semibold text-slate-500">Amount due</span>
            <span className="font-display text-2xl font-extrabold text-brand-700">
              Tk {amount || cartTotal}
            </span>
          </div>
          <div className="rounded-xl border border-slate-300 bg-slate-50 px-4 py-4">
            <CardElement options={cardStyle} />
          </div>
          <button
            className="btn-brand mt-6 w-full"
            type="submit"
            disabled={!stripe || !clientSecret || paying}
          >
            <FaLock /> {paying ? "Processing…" : `Pay Tk ${amount || cartTotal}`}
          </button>
        </form>
      )}

      {error && (
        <p className="mt-4 rounded-xl bg-rose-50 px-4 py-2.5 text-sm font-medium text-rose-600">
          {error}
        </p>
      )}

      {receipt && (
        <div className="text-center">
          <p className="text-4xl">✅</p>
          <p className="font-display mt-2 text-xl font-bold text-brand-950">Payment received</p>
          <p className="mt-1 break-all text-xs text-slate-400">
            Transaction: {receipt.transcationId}
          </p>
          <PDFDownloadLink
            document={
              <MyDocument
                transcationId={receipt.transcationId}
                totalPrice={receipt.totalPrice}
                date={receipt.date}
              />
            }
            fileName={`shopwise-receipt-${receipt.transcationId}.pdf`}
          >
            {({ loading }) => (
              <span className="btn-ghost-brand mt-6 cursor-pointer !py-2.5 text-sm">
                <FaFileArrowDown /> {loading ? "Preparing receipt…" : "Download receipt"}
              </span>
            )}
          </PDFDownloadLink>
        </div>
      )}
    </div>
  );
};

export default Checkout;
