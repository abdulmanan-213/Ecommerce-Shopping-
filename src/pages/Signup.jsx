import React, { useState } from "react";

export default function Signup({ switchToLogin }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [userData, setUserData] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Show notification function (similar to other pages)
  const showNotification = (message, type = "success") => {
    const bgColor = type === "error" 
      ? "from-red-500 to-red-600" 
      : type === "warning"
      ? "from-yellow-500 to-amber-600"
      : "from-green-500 to-emerald-600";
    
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 bg-gradient-to-r ${bgColor} text-white px-6 py-4 rounded-xl shadow-2xl z-50 animate-slideIn flex items-center`;
    notification.innerHTML = `
      <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
      </svg>
      <span class="font-medium">${message}</span>
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.classList.add('animate-slideOut');
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  };

  const handleSignup = (e) => {
    e.preventDefault();
    
    // Validation
    if (!form.name.trim()) {
      showNotification("Please enter your full name", "error");
      return;
    }
    
    if (!form.email.trim() || !form.email.includes("@")) {
      showNotification("Please enter a valid email address", "error");
      return;
    }
    
    if (form.password.length < 6) {
      showNotification("Password must be at least 6 characters", "error");
      return;
    }
    
    if (form.password !== form.confirmPassword) {
      showNotification("Passwords do not match", "error");
      return;
    }

    // Simulate API call - Save user data to localStorage
    const user = {
      id: Date.now(),
      name: form.name,
      email: form.email,
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
      cart: [],
      orders: [],
      favorites: []
    };

    // Check if user already exists
    const existingUsers = JSON.parse(localStorage.getItem('megamart_users') || '[]');
    if (existingUsers.find(u => u.email === form.email)) {
      showNotification("Email already registered. Please login.", "error");
      return;
    }

    // Save user to localStorage
    existingUsers.push(user);
    localStorage.setItem('megamart_users', JSON.stringify(existingUsers));
    localStorage.setItem('megamart_current_user', JSON.stringify(user));

    // Set user data for success message
    setUserData(user);
    
    // Show success message
    setShowSuccessMessage(true);
    showNotification("✅ Account created successfully! Welcome to MegaMart");
    
    // Reset form
    setForm({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });

    // Optional: Auto-switch to login after 5 seconds
    setTimeout(() => {
      // Could auto-login here or redirect
    }, 5000);
  };

  return (
    <>
      {/* Notification Styles */}
      <style jsx>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        @keyframes slideOut {
          from {
            transform: translateX(0);
            opacity: 1;
          }
          to {
            transform: translateX(100%);
            opacity: 0;
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }
        .animate-slideOut {
          animation: slideOut 0.3s ease-in forwards;
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>

      {/* Signup Success Message */}
      {showSuccessMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 animate-fadeIn">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full mx-4 shadow-2xl">
            <div className="text-center">
              <div className="mx-auto w-20 h-20 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">🎉 Welcome to MegaMart!</h2>
              <p className="text-gray-600 mb-6">
                Your account has been created successfully. Welcome <span className="font-bold text-purple-600">{userData?.name}</span>!
              </p>
              
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-xl mb-6">
                <div className="flex items-center mb-2">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-sm font-medium text-gray-700">Verification email sent to {userData?.email}</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Please check your inbox to verify your email address
                </p>
              </div>

              <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-4 rounded-xl mb-6">
                <h4 className="font-bold text-gray-900 mb-2">🎁 Welcome Bonus!</h4>
                <p className="text-sm text-gray-600">
                  Use code <span className="font-bold text-pink-600">WELCOME100</span> for ₹100 off on your first order above ₹999
                </p>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => {
                    setShowSuccessMessage(false);
                    switchToLogin();
                  }}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-300"
                >
                  Start Shopping
                </button>
                <button
                  onClick={() => setShowSuccessMessage(false)}
                  className="w-full border-2 border-blue-600 text-blue-600 py-3 rounded-xl font-medium hover:bg-blue-50 transition-all duration-300"
                >
                  Continue Account Setup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 px-4 py-8">
        <form
          onSubmit={handleSignup}
          className="w-full max-w-lg bg-white rounded-sm shadow-2xl p-8 space-y-6"
        >
          {/* Logo + Title */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-10 w-10 text-blue-600"
              >
                <path
                  fillRule="evenodd"
                  d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 004.25 22.5h15.5a1.875 1.875 0 001.865-2.071l-1.263-12a1.875 1.875 0 00-1.865-1.679H16.5V6a4.5 4.5 0 10-9 0zm8.25 0v.75a3 3 0 11-6 0V6a3 3 0 116 0zm-3.75 8.25a3 3 0 106 0 3 3 0 00-6 0zm-3.75 0a2.25 2.25 0 114.5 0 2.25 2.25 0 01-4.5 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                MegaMart
              </span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Create Your Account</h2>
            <p className="text-gray-600 mt-2">Join our community of smart shoppers</p>
          </div>

          {/* Form Fields */}
          <div className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-gray-700 flex items-center">
                <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Full Name
              </label>
              <input
                type="text"
                name="name"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                placeholder="Enter your full name"
                required
                value={form.name}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-700 flex items-center">
                <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Email Address
              </label>
              <input
                type="email"
                name="email"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                placeholder="Enter your email"
                required
                value={form.email}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-gray-700 flex items-center">
                <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Password
              </label>
              <input
                type="password"
                name="password"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                placeholder="Enter your password (min. 6 characters)"
                required
                value={form.password}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700 flex items-center">
                <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                placeholder="Confirm your password"
                required
                value={form.confirmPassword}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="terms"
              required
              className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
            />
            <label htmlFor="terms" className="text-sm text-gray-600">
              I agree to the{" "}
              <a href="#" className="text-purple-600 hover:underline">
                Terms & Conditions
              </a>{" "}
              and{" "}
              <a href="#" className="text-purple-600 hover:underline">
                Privacy Policy
              </a>
            </label>
          </div>

          {/* Signup Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
          >
            Create Account
          </button>

          {/* Divider */}
          <div className="relative flex items-center justify-center">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="mx-4 text-sm text-gray-500">Or continue with</span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>

          {/* Social Login Options */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              className="flex items-center justify-center space-x-2 border border-gray-200 py-3 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              <span className="text-sm font-medium">Facebook</span>
            </button>
            <button
              type="button"
              className="flex items-center justify-center space-x-2 border border-gray-200 py-3 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.545 10.239v3.821h5.445c-.712 2.315-2.647 3.972-5.445 3.972a6.033 6.033 0 110-12.064c1.498 0 2.866.549 3.921 1.453l2.814-2.814A9.969 9.969 0 0012.545 2C7.021 2 2.543 6.477 2.543 12s4.478 10 10.002 10c8.396 0 10.249-7.85 9.426-11.748l-9.426-.013z" />
              </svg>
              <span className="text-sm font-medium">Google</span>
            </button>
          </div>

          {/* Login Link */}
          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <button
              type="button"
              className="text-purple-600 hover:text-purple-800 font-semibold transition-colors"
              onClick={switchToLogin}
            >
              Login here
            </button>
          </p>
        </form>
      </div>
    </>
  );
}