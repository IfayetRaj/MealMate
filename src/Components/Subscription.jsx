import React from "react";
import { useNavigate } from "react-router";

const mealPlans = [
  {
    name: "Silver",
    price: "3000",
    note: "/month",
    features: [
      "Breakfast plan included",
      "5 meal updates/month",
      "Basic meal tracking",
      "Community support"
    ]
  },
  {
    name: "Gold",
    price: "6000",
    note: "/month",
    highlight: "Most Popular",
    features: [
      "Breakfast + Lunch plans",
      "Unlimited meal updates",
      "Priority meal tracking",
      "1-on-1 support",
      "Custom diet suggestions"
    ]
  },
  {
    name: "Platinum",
    price: "9900",
    note: "/month",
    features: [
      "All meals: Breakfast, Lunch & Dinner",
      "Unlimited meal updates",
      "Personal nutritionist support",
      "Room-mate plan (up to 4 members)",
      "Early access to new features",
      "Dedicated support channel"
    ]
  }
];

const Subscription = () => {
  const navigate = useNavigate();

  const handleCheckout = (planName, price) => {
    navigate(`/checkout/${planName}/${price}`);
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col items-center px-4 py-10">
      <h2 className="text-3xl font-bold mb-2 text-center">Upgrade Your Meal Plan</h2>
      <p className="mb-6 text-gray-600 text-center max-w-md">
        Unlock premium features for smarter, healthier meals.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-6xl">
        {mealPlans.map((plan, index) => (
          <div
            key={index}
            onClick={() => handleCheckout(plan.name, plan.price)}
            className={`relative bg-white p-6 rounded-3xl border border-black shadow hover:shadow-xl cursor-pointer transition-all duration-200 flex flex-col justify-between`}
          >
            {plan.highlight && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black text-white text-xs px-3 py-1 rounded-full">
                {plan.highlight}
              </div>
            )}

            <div className="mb-6">
              <h3 className="text-2xl font-semibold text-center mb-2">{plan.name}</h3>
              <p className="text-5xl font-bold text-center">৳{plan.price}</p>
              <p className="text-sm text-center text-gray-500 mb-4">{plan.note}</p>

              <ul className="text-sm text-gray-700 space-y-2 md:py-6">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <span className="mr-2">✅</span> {feature}
                  </li>
                ))}
              </ul>
            </div>

            <button
              className="w-full py-3 rounded-full bg-black text-white font-medium hover:bg-gray-900 hover:-translate-y-0.5 hover:shadow-xl transition-all duration-200"
            >
              Select {plan.name} Plan
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Subscription;