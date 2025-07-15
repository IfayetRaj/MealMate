import React from "react";


const plans = [
  {
    name: "Starter",
    price: "$5",
    note: "/user/month",
    features: [
      "50 AI messages/month",
      "Basic AI model access",
      "7-day chat history",
      "Single user",
      "Light theme support",
      "Community support"
    ],
    button: "Let's Get Started",
    isDisabled: false
  },
  {
    name: "Pro",
    price: "$15",
    note: "/user/month",
    highlight: "Most Recommended!",
    features: [
      "1,000 AI messages/month",
      "Access to advanced AI models",
      "Unlimited chat history",
      "Save & pin conversations",
      "Dark mode",
      "Faster AI response speed"
    ],
    button: "Let's Get Started"
  },
  {
    name: "Business",
    price: "$49",
    note: "/user/month",
    features: [
      "5,000 AI messages/month",
      "Team management (up to 5)",
      "Assign roles and permissions",
      "Team activity insights",
      "API access for integration",
      "Custom branding options"
    ],
    button: "Let's Get Started"
  }
];

const Subscription = () => {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col items-center px-4 py-10">
      <h2 className="text-3xl font-bold mb-2 text-center">Plans & Pricing</h2>
      <p className="mb-6 text-gray-600 text-center max-w-md">
        Choose the plan that fits your needs and scale as you grow.
      </p>

      <div className="flex flex-wrap justify-center gap-4 items-center mb-17">
        <button className="px-4 py-2 rounded-full bg-black text-white text-sm font-medium">
          Monthly
        </button>
        <button className="px-4 py-2 rounded-full bg-gray-200 text-gray-700 text-sm font-medium">
          Quarterly
        </button>
        <button className="px-4 py-2 rounded-full bg-gray-200 text-gray-700 text-sm font-medium">
          Annually{" "}
          <span className="ml-1 bg-yellow-400 text-white px-2 py-0.5 rounded-full text-xs">
            35% OFF
          </span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-8 w-full max-w-6xl">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`relative bg-white p-6 rounded-3xl border-1 border-black outline-1 outline-black outline-offset-2  shadow transition-all duration-200 hover:shadow-xl hover:border-black h-full flex flex-col justify-between ${
              plan.name === "Pro" ? "border-black" : ""
            }`}
          >
            {plan.highlight && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black text-white text-xs px-3 py-1 rounded-full">
                {plan.highlight}
              </div>
            )}

            <div className="mb-6 ">
              <h3 className="text-2xl font-semibold text-center mb-2">{plan.name}</h3>
              <p className="text-5xl font-bold text-center">{plan.price}</p>
              <p className="text-sm text-center text-gray-500 mb-4">{plan.note}</p>

              <ul className="text-sm text-gray-700 space-y-2 md:py-10">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <span className="mr-2">✅</span> {feature}
                  </li>
                ))}
              </ul>
            </div>

            <button
              disabled={plan.isDisabled}
              className={`w-full py-3 rounded-full font-medium outline-1 outline-black outline-offset-2 hover:-translate-y-0.5 hover:shadow-xl transition-all duration-200 ${
                plan.isDisabled
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-black text-white hover:bg-gray-900"
              }`}
            >
              {plan.button}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Subscription;