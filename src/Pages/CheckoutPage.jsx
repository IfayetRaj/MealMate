import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

const CheckoutPage = () => {
  const { packageId } = useParams();
  const [pkg, setPkg] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Simulated fetch — replace with real API later
    const dummy = {
      id: packageId,
      title: "🌟 Premium Package",
      price: 1999, // cents
      description:
        "Unlock all premium features, get priority support, and exclusive content just for you.",
    };
    setPkg(dummy);
  }, [packageId]);

  const handleCheckout = async () => {
    setLoading(true);
    // Connect to Stripe logic later
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  if (!pkg)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-500 text-lg">Loading package...</p>
      </div>
    );

  return (
    <div className="max-w-3xl mb-10 mx-auto mt-12 p-6 md:p-10 bg-white rounded-3xl shadow-lg border border-gray-100">
      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
        Checkout
      </h1>

      {/* Package Details */}
      <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 mb-8">
        <h2 className="text-3xl font-bold text-black mb-2">{pkg.title}</h2>
        <p className="text-gray-600 mb-4">{pkg.description}</p>
        <div className="flex items-center justify-between">
          <p className="text-lg font-medium text-gray-800">Total</p>
          <p className="text-2xl font-bold text-black">
            ${(pkg.price / 100).toFixed(2)}
          </p>
        </div>
      </div>

      {/* Checkout Button */}
      <button
        onClick={handleCheckout}
        disabled={loading}
        className="w-full px-6 py-4 bg-black text-white font-semibold text-lg rounded-xl border-2 border-black  outline-4 outline-offset-4 transition hover:bg-gray-900 disabled:opacity-50"
      >
        {loading ? "Processing..." : "Proceed to Payment"}
      </button>

      {/* Test Success Link */}
      <p className="mt-6 text-center text-sm text-gray-500">
        Need help?{" "}
        <a
          href="#"
          className="underline hover:text-black transition"
        >
          Contact Support
        </a>
      </p>
    </div>
  );
};

export default CheckoutPage;