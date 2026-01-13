import React, { useState } from "react";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!isValidEmail) {
      alert("Please enter a valid email address.");
      return;
    }

    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 3000);
  };

  const quickLinks = [
    "Home",
    "New Arrivals",
    "Trending",
    "Collections",
    "Brands",
    "Sales & Deals",
  ];

  const customerService = [
    "Contact Us",
    "FAQs",
    "Shipping & Returns",
    "Track Order",
    "Size Guide",
    "Privacy Policy",
  ];

  const legalLinks = ["Terms of Service", "Privacy Policy", "Cookie Policy"];

  const socialLinks = [
    {
      name: "Facebook",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
        </svg>
      ),
    },
    {
      name: "Twitter",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 极速快3 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
        </svg>
      ),
    },
    {
      name: "Instagram",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z" />
        </svg>
      ),
    },
    {
      name: "YouTube",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.007 2.007 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.007 2.007 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31.4 31.4 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.007 2.007 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A99.788 99.788 0 0 1 7.858 2h.193zM6.4 5.209v4.818l4.157-2.408L6.4 5.209z" />
        </svg>
      ),
    },
  ];

  return (
    <footer className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white pt-16 pb-10 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-white opacity-5 rounded-full"></div>
        <div className="absolute top-1/4 -right-10 w-56 h-56 bg-purple-300 opacity-10 rounded-full"></div>
        <div className="absolute bottom-10 left-1/4 w-40 h-40 bg-blue-300 opacity-10 rounded-full"></div>
        <div className="absolute top-10 right-1/3 w-32 h-32 bg-indigo-300 opacity-10 rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          <div>
            <div className="flex items-center mb-6">
              <div className="relative">
                <div className="absolute -inset-1 bg-white opacity-10 rounded-lg blur-sm"></div>
                <div className="relative flex items-center p-2 rounded-lg shadow-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-8 w-8 text-white"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 004.25 22.5h15.5a1.875 1.875 0 001.865-2.071l-1.263-12a1.875 1.875 0 00-1.865-1.679H16.5V6a4.5 4.5 0 10-9 0zm8.25 0v.75a3 3 0 11-6 0V6a3 3 0 116 0zm-3.75 8.25a3 3 0 106 0 3 3 0 00-6 0zm-3.75 0a2.25 2.25 0 114.5 0 2.25 2.25 0 01-4.5 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="ml-2 text-xl font-bold text-white">
                    MegaMart
                  </span>
                </div>
              </div>
            </div>

            <p className="text-blue-100 mb-6 leading-relaxed">
              Your one-stop destination for trendy and fashionable clothing.
              Quality products at affordable prices with fast shipping.
            </p>

            {/* Social Icons */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href="#"
                  className="flex items-center justify-center w-10 h-10 bg-white/10 rounded-full backdrop-blur-sm hover:bg-white/20 transition-all duration-300 hover:scale-110"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 relative inline-block">
              Quick Links
              <span className="absolute -bottom-2 left-0 w-10 h-1 bg-indigo-300 rounded-full"></span>
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index} className="group">
                  <a
                    href="#"
                    className="text-blue-100 hover:text-white transition-all duration-300 flex items-center group-hover:translate-x-1"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-6 relative inline-block">
              Customer Service
              <span className="absolute -bottom-2 left-0 w-10 h-1 bg-indigo-300 rounded-full"></span>
            </h3>
            <ul className="space-y-3">
              {customerService.map((link, index) => (
                <li key={index} className="group">
                  <a
                    href="#"
                    className="text-blue-100 hover:text-white transition-all duration-300 flex items-center group-hover:translate-x-1"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="bg-gradient-to-br from-gray-800/70 to-gray-900/70 p-6 rounded-2xl shadow-2xl border border-white/10 backdrop-blur-sm">
            <h3 className="text-lg font-semibold mb-4 relative inline-block">
              Newsletter
              <span className="absolute -bottom-2 left-0 w-10 h-1 bg-indigo-300 rounded-full"></span>
            </h3>
            <p className="text-blue-100 mb-5">
              Subscribe and get{" "}
              <span className="font-semibold text-indigo-300">10% off</span>{" "}
              your first purchase.
            </p>

            {subscribed ? (
              <div className="bg-green-900/50 text-green-300 p-4 rounded-md text-center border border-green-800/50 shadow-lg animate-pulse">
                <div className="flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Thank you for subscribing! Check your email for confirmation.
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubscribe}
                className="flex flex-col space-y-4"
              >
                <div className="relative">
                  <label htmlFor="email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Your email address"
                    className="w-full px-4 py-3 bg-gray-700/70 border border-gray-600/50 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent backdrop-blur-sm placeholder-blue-100/50 text-white pr-12 transition-all duration-300"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <button
                    type="submit"
                    className="absolute right-1 top-1 bg-gradient-to-r from-indigo-400 to-purple-500 text-white py-2 px-4 rounded-md text-sm hover:from-indigo-500 hover:to-purple-600 transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    Join
                  </button>
                </div>
                <p className="text-xs text-blue-100/70">
                  By subscribing, you agree to our Terms and Privacy Policy.
                </p>
              </form>
            )}
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-white/20 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-blue-100/80 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} MegaMart. All rights reserved.
          </p>
          <div className="flex space-x-5">
            {legalLinks.map((item, index) => (
              <a
                key={index}
                href="#"
                className="text-blue-100/80 hover:text-white text-sm transition-colors duration-300 hover:underline"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
