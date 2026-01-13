import React, { useState } from "react";

const ExcitingDeals = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const deals = [
    {
      icon: "🎁",
      title: "Exclusive Offers",
      description: "Get access to member-only deals and discounts",
    },
    {
      icon: "⚡",
      title: "Flash Sales",
      description: "Be the first to know about limited-time offers",
    },
    {
      icon: "🎯",
      title: "Personalized Deals",
      description: "Deals tailored just for your shopping preferences",
    },
    {
      icon: "🚚",
      title: "Free Shipping",
      description: "Enjoy free shipping on all member orders",
    },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-purple-200 rounded-full opacity-20 blur-xl"></div>
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-blue-200 rounded-full opacity-20 blur-xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-100 rounded-full opacity-10"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Join Us on{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
              Exciting Deals
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Subscribe to our newsletter and never miss out on amazing offers,
            exclusive discounts, and special promotions tailored just for you!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Benefits */}
          <div className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              {deals.map((deal, index) => (
                <div
                  key={index}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="text-3xl mb-3">{deal.icon}</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {deal.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{deal.description}</p>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-purple-600">50K+</div>
                  <div className="text-sm text-gray-600">Happy Members</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-600">₹2M+</div>
                  <div className="text-sm text-gray-600">Total Savings</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-indigo-600">500+</div>
                  <div className="text-sm text-gray-600">Exclusive Deals</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Subscription Form */}
          <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-3xl p-8 shadow-2xl">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">✨</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Get ₹200 Off Your First Order!
              </h3>
              <p className="text-purple-100">
                Subscribe now and receive an instant discount code
              </p>
            </div>

            {isSubscribed ? (
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                </div>
                <h4 className="text-white font-semibold text-lg mb-2">
                  Welcome to the Club!
                </h4>
                <p className="text-purple-100 text-sm">
                  Check your email for your discount code and exciting deals
                  coming your way!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email address"
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent backdrop-blur-sm"
                    required
                  />
                  <div className="absolute right-1 top-1">
                    <button
                      type="submit"
                      className="bg-white text-purple-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
                    >
                      Join Now
                    </button>
                  </div>
                </div>

                <div className="flex items-center space-x-2 text-purple-100 text-sm">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    ></path>
                  </svg>
                  <span>We respect your privacy. Unsubscribe at any time.</span>
                </div>
              </form>
            )}

            {/* Trust Badges */}
            <div className="mt-6 pt-6 border-t border-white/20">
              <p className="text-purple-100 text-sm text-center mb-3">
                Trusted by 50,000+ shoppers
              </p>
              <div className="flex justify-center space-x-4">
                <div className="bg-white/10 rounded-lg px-3 py-1">
                  <span className="text-white text-xs">⭐ 4.8/5 Rating</span>
                </div>
                <div className="bg-white/10 rounded-lg px-3 py-1">
                  <span className="text-white text-xs">🔒 Secure</span>
                </div>
                <div className="bg-white/10 rounded-lg px-3 py-1">
                  <span className="text-white text-xs">🚀 Instant</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg">
            <span className="text-gray-600">Already a member?</span>
            <button className="text-purple-600 font-semibold hover:text-purple-700 transition-colors">
              View Current Deals →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExcitingDeals;
