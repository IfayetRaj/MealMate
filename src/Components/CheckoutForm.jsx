import React, { useContext } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import toast from "react-hot-toast";
import { AuthContext } from "../Context/AuthContext";

const CheckoutForm = ({ data }) => {
  const { userData } = useContext(AuthContext);
  const { planName, price } = data;

  const priceInCents = parseInt(price) * 100;

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[PaymentMethod Error]", error);
      toast.error(error.message);
      return;
    }

    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/create-payment-intent`,
      { amount: priceInCents, planName, userEmail: userData.email }
    );

    const clientSecret = res.data.clientSecret;

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: paymentMethod.id,
    });

    if (result.error) {
      console.log("[Confirm Error]", result.error);
      toast.error(result.error.message);
    } else {
      if (result.paymentIntent.status === "succeeded") {
        toast.success("Payment successful!");

        await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/confirm-payment`,
          {
            userEmail: userData.email,
            planName,
            amount: priceInCents,
            transactionId: result.paymentIntent.id, // 👈 use Stripe’s paymentIntent.id
          }
        );
      } else {
        console.log("Payment failed or pending.");
        toast.error("Payment failed or pending.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-8 rounded-xl shadow-xl space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Complete Your Payment
        </h2>

        <div className="p-4 border rounded-md bg-gray-50">
          <CardElement options={{ hidePostalCode: true }} />
        </div>

        <button
          type="submit"
          disabled={!stripe}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold transition"
        >
          Pay ৳{price}
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;
