import React from "react";
import toast from "react-hot-toast";

const Suggestion = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Thanks for your valuable suggestion! It will help us improve more.");
    e.target.reset(); // ✅ clear the textarea after submit
  };

  return (
    <div className="relative w-full min-h-[300px] bg-black flex items-center justify-center px-4 md:py-18 py-4 overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-30"
        src="/bg.mp4"
      />

      {/* Glass Card */}
      <div className="relative w-fit bg-transparent rounded-2xl p-8 px-14 border-2 border-white shadow-lg z-10">
        <h2 className="text-4xl font-extrabold text-white mb-4 text-center">
          Share Your Suggestions
        </h2>
        <p className="text-gray-300 text-center mb-6">
          We’d love to hear how we can improve your experience.
        </p>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <textarea
            placeholder="Your suggestion..."
            className="w-full h-40 resize-none px-4 py-3 rounded-lg bg-white/20 text-white placeholder-white/70 focus:outline-none backdrop-blur-sm mb-9"
            required
          />
          <button
            type="submit"
            className="w-full bg-white text-black font-semibold py-3 rounded-3xl hover:bg-gray-200 transition-colors"
          >
            Submit Suggestion
          </button>
        </form>
      </div>
    </div>
  );
};

export default Suggestion;