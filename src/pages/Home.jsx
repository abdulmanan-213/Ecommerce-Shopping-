import React, { useState, useEffect } from "react";
import Carousel from "../components/Carousel";
import ExcitingDeals from "../components/ExcitingDeals";

// Order History & Cancellation Component
const OrderHistory = ({ isOpen, onClose, orders, cancelOrder }) => {
  if (!isOpen) return null;

  // Filter orders by status
  const activeOrders = orders.filter(order => order.status === 'Delivered' || order.status === 'Shipped' || order.status === 'Processing');
  const cancelledOrders = orders.filter(order => order.status === 'Cancelled');

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose}></div>

      {/* Order History Panel */}
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-3 rounded-xl mr-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Order History</h2>
                <p className="text-sm text-gray-500">Track and manage your orders</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="p-8">
            {/* Tabs */}
            <div className="flex border-b border-gray-200 mb-8">
              <button className={`px-4 py-2 font-medium text-sm border-b-2 ${activeOrders.length > 0 ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500'}`}>
                Active Orders ({activeOrders.length})
              </button>
              <button className={`px-4 py-2 font-medium text-sm border-b-2 ${cancelledOrders.length > 0 ? 'border-red-600 text-red-600' : 'border-transparent text-gray-500'}`}>
                Cancelled Orders ({cancelledOrders.length})
              </button>
            </div>

            {orders.length === 0 ? (
              <div className="text-center py-12">
                <div className="mx-auto w-24 h-24 bg-gradient-to-br from-blue-50 to-purple-50 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Orders Yet</h3>
                <p className="text-gray-500 mb-6">You haven't placed any orders yet.</p>
                <button
                  onClick={onClose}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-300"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Active Orders */}
                {activeOrders.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Active Orders</h3>
                    <div className="space-y-4">
                      {activeOrders.map((order) => (
                        <div key={order.id} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                          <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                            <div>
                              <div className="flex items-center mb-2">
                                <span className="font-bold text-gray-900">Order #{order.id}</span>
                                <span className={`ml-3 px-3 py-1 rounded-full text-xs font-medium ${
                                  order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                                  order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                                  'bg-yellow-100 text-yellow-800'
                                }`}>
                                  {order.status}
                                </span>
                              </div>
                              <p className="text-sm text-gray-500">
                                Placed on {order.date} • Total: {order.total}
                              </p>
                            </div>
                            <div className="mt-3 md:mt-0">
                              <button
                                onClick={() => cancelOrder(order.id)}
                                className="border border-red-600 text-red-600 px-4 py-2 rounded-lg font-medium text-sm hover:bg-red-50 transition-colors flex items-center"
                              >
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                                Cancel Order
                              </button>
                            </div>
                          </div>
                          
                          <div className="border-t border-gray-100 pt-4">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium text-gray-600">Items ({order.items.length})</span>
                              <span className="text-sm text-gray-500">Order Total: {order.total}</span>
                            </div>
                            <div className="flex overflow-x-auto space-x-4 pb-2">
                              {order.items.map((item, idx) => (
                                <div key={idx} className="flex-shrink-0 w-20">
                                  <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center overflow-hidden">
                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                  </div>
                                  <p className="text-xs text-gray-600 truncate mt-1">{item.name}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Cancelled Orders */}
                {cancelledOrders.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Cancelled Orders</h3>
                    <div className="space-y-4">
                      {cancelledOrders.map((order) => (
                        <div key={order.id} className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                          <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                            <div>
                              <div className="flex items-center mb-2">
                                <span className="font-bold text-gray-900">Order #{order.id}</span>
                                <span className="ml-3 px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
                                  Cancelled
                                </span>
                              </div>
                              <p className="text-sm text-gray-500">
                                Cancelled on {order.date} • Total: {order.total}
                              </p>
                              {order.cancellationReason && (
                                <p className="text-sm text-gray-600 mt-2">
                                  <span className="font-medium">Reason:</span> {order.cancellationReason}
                                </p>
                              )}
                            </div>
                            <div className="mt-3 md:mt-0">
                              <button
                                onClick={() => showNotification("Order cannot be re-activated. Please place a new order.")}
                                className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium text-sm hover:bg-gray-50 transition-colors"
                              >
                                Re-order
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Cancellation Reason Modal
const CancellationModal = ({ isOpen, onClose, orderId, onConfirm }) => {
  const [reason, setReason] = useState("");
  const [selectedReason, setSelectedReason] = useState("");

  const reasons = [
    "Changed my mind",
    "Found better price elsewhere",
    "Ordered by mistake",
    "Shipping takes too long",
    "Product not required anymore",
    "Other"
  ];

  if (!isOpen) return null;

  const handleSubmit = () => {
    const finalReason = selectedReason === "Other" ? reason : selectedReason;
    if (!finalReason.trim()) {
      alert("Please select or specify a cancellation reason");
      return;
    }
    onConfirm(orderId, finalReason);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Cancel Order #{orderId}</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Reason for Cancellation *
            </label>
            <div className="space-y-2">
              {reasons.map((r) => (
                <label key={r} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <input
                    type="radio"
                    name="cancellationReason"
                    checked={selectedReason === r}
                    onChange={() => setSelectedReason(r)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{r}</span>
                </label>
              ))}
            </div>
          </div>

          {selectedReason === "Other" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Please specify your reason
              </label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                rows="3"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="Enter your reason here..."
              />
            </div>
          )}

          <div className="flex space-x-3 pt-4">
            <button
              onClick={onClose}
              className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors"
            >
              Go Back
            </button>
            <button
              onClick={handleSubmit}
              className="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white py-3 rounded-xl font-medium shadow-md hover:shadow-lg transition-all duration-300"
            >
              Cancel Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Feedback & Review Component
const FeedbackReview = ({ isOpen, onClose, onSubmitFeedback, reviews }) => {
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(5);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!feedback.trim() || !name.trim()) {
      alert("Please fill in all required fields");
      return;
    }

    const newReview = {
      id: Date.now(),
      name,
      email,
      rating,
      feedback,
      date: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      })
    };

    onSubmitFeedback(newReview);
    setFeedback("");
    setRating(5);
    setName("");
    setEmail("");
    
    // Show success notification
    showNotification("✅ Thank you for your feedback!");
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose}></div>

      {/* Feedback Panel */}
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left Side - Review Form */}
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Share Your Feedback</h2>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your name"
                    required
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                {/* Rating */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rating *
                  </label>
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="focus:outline-none"
                      >
                        <svg
                          className={`w-8 h-8 ${star <= rating ? "text-yellow-400" : "text-gray-300"}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </button>
                    ))}
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{rating} out of 5 stars</p>
                </div>

                {/* Feedback */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Feedback *
                  </label>
                  <textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    rows="4"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    placeholder="Share your experience with us..."
                    required
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  Submit Feedback
                </button>
              </form>
            </div>

            {/* Right Side - Recent Reviews */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Recent Reviews</h3>
              <div className="space-y-6 max-h-[500px] overflow-y-auto pr-4">
                {reviews.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mb-4">
                      <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                      </svg>
                    </div>
                    <p className="text-gray-500">No reviews yet. Be the first to share your feedback!</p>
                  </div>
                ) : (
                  reviews.slice(0, 5).map((review) => (
                    <div key={review.id} className="bg-white p-4 rounded-xl shadow-sm">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-semibold text-gray-900">{review.name}</h4>
                          <p className="text-sm text-gray-500">{review.date}</p>
                        </div>
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`w-4 h-4 ${i < review.rating ? "fill-current" : "text-gray-300"}`}
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm">{review.feedback}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Order History Icon Component
const OrderHistoryIcon = ({ onClick }) => (
  <button
    onClick={onClick}
    className="fixed bottom-42 right-6 z-40 bg-gradient-to-r from-orange-500 to-amber-600 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 group"
  >
    <div className="relative">
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    </div>
  </button>
);

// Feedback Icon Component
const FeedbackIcon = ({ onClick }) => (
  <button
    onClick={onClick}
    className="fixed bottom-24 right-6 z-40 bg-gradient-to-r from-green-500 to-emerald-600 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 group"
  >
    <div className="relative">
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
      </svg>
    </div>
  </button>
);

// Cart Component (unchanged)
const Cart = ({ isOpen, onClose, cartItems, updateQuantity, removeFromCart, checkout }) => {
  const subtotal = cartItems.reduce((sum, item) => sum + (parseInt(item.price.replace('₹', '').replace(',', '')) * item.quantity), 0);
  const shipping = subtotal > 999 ? 0 : 49;
  const tax = subtotal * 0.18;
  const total = subtotal + shipping + tax;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose}></div>

      {/* Cart Panel */}
      <div className="relative min-h-screen flex justify-end">
        <div className="relative w-full max-w-md bg-white shadow-xl">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center">
              <h2 className="text-xl font-bold text-gray-900">🛒 Shopping Cart</h2>
              <span className="ml-3 bg-blue-100 text-blue-600 text-xs font-semibold px-2 py-1 rounded-full">
                {cartItems.reduce((sum, item) => sum + item.quantity, 0)} items
              </span>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {cartItems.length === 0 ? (
              <div className="text-center py-12">
                <div className="mx-auto w-24 h-24 bg-gradient-to-br from-blue-50 to-purple-50 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
                <p className="text-gray-500 mb-6">Add some amazing products to your cart</p>
                <button
                  onClick={onClose}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-300"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="bg-white p-4 rounded-xl border border-gray-100 hover:shadow-sm transition-all duration-300">
                    <div className="flex items-center">
                      {/* Product Image */}
                      <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 ml-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium text-gray-900 line-clamp-1">{item.name}</h3>
                            <div className="flex items-center mt-1">
                              <span className="font-bold text-blue-600">{item.price}</span>
                              {item.oldPrice && (
                                <span className="ml-2 text-sm text-gray-400 line-through">{item.oldPrice}</span>
                              )}
                            </div>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center border border-gray-200 rounded-lg">
                            <button
                              onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                              className="px-3 py-1 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-l-lg transition-colors"
                            >
                              −
                            </button>
                            <span className="px-4 py-1 text-gray-900 font-medium">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="px-3 py-1 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-r-lg transition-colors"
                            >
                              +
                            </button>
                          </div>
                          <div className="font-bold text-gray-900">
                            ₹{(parseInt(item.price.replace('₹', '').replace(',', '')) * item.quantity).toFixed(2)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Cart Summary */}
          {cartItems.length > 0 && (
            <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6">
              {/* Order Summary */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium text-green-600">
                    {shipping === 0 ? 'FREE' : `₹${shipping}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax (18%)</span>
                  <span className="font-medium">₹{tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total Amount</span>
                    <span className="text-blue-600">₹{total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={checkout}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
              >
                🚀 Proceed to Checkout
              </button>

              {/* Continue Shopping */}
              <button
                onClick={onClose}
                className="w-full mt-3 border-2 border-blue-600 text-blue-600 py-3 rounded-xl font-medium hover:bg-blue-50 transition-colors duration-300"
              >
                Continue Shopping
              </button>

              {/* Security Badge */}
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center justify-center space-x-2">
                  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span className="text-xs text-gray-500">100% Secure Payment</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Cart Icon Component
const CartIcon = ({ itemCount, onClick }) => (
  <button
    onClick={onClick}
    className="fixed bottom-6 right-6 z-40 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 group"
  >
    <div className="relative">
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
      {itemCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center animate-bounce">
          {itemCount > 99 ? '99+' : itemCount}
        </span>
      )}
    </div>
  </button>
);

// Carousel images
const carouselImages = [
  "https://images.unsplash.com/photo-1607082350899-7e105aa886ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1072&q=80",
  "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
  "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
  "https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
];

const products = [
  {
    id: 1,
    name: "Men's Casual Shirt",
    price: "₹1299",
    oldPrice: "₹2499",
    discount: "48% OFF",
    save: "₹1200",
    image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=725&q=80",
    rating: 4.5,
    reviews: 342,
  },
  {
    id: 2,
    name: "Women's Summer Dress",
    price: "₹1799",
    oldPrice: "₹2999",
    discount: "40% OFF",
    save: "₹1200",
    image: "https://images.unsplash.com/photo-1529903384028-929ae5dccdf1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    rating: 4.7,
    reviews: 489,
  },
  {
    id: 3,
    name: "Kids T-Shirt Pack",
    price: "₹999",
    oldPrice: "₹1799",
    discount: "44% OFF",
    save: "₹800",
    image: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=871&q=80",
    rating: 4.3,
    reviews: 267,
  },
  {
    id: 4,
    name: "Men's Denim Jeans",
    price: "₹1899",
    oldPrice: "₹3499",
    discount: "46% OFF",
    save: "₹1600",
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=726&q=80",
    rating: 4.6,
    reviews: 523,
  },
  {
    id: 5,
    name: "Women's Winter Jacket",
    price: "₹3499",
    oldPrice: "₹5999",
    discount: "42% OFF",
    save: "₹2500",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&id=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    rating: 4.8,
    reviews: 412,
  },
  {
    id: 6,
    name: "Women's Floral Maxi Dress",
    price: "₹2199",
    oldPrice: "₹3999",
    discount: "45% OFF",
    save: "₹1800",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    rating: 4.6,
    reviews: 318,
  },
  {
    id: 7,
    name: "Kids Denim Overalls",
    price: "₹1499",
    oldPrice: "₹2499",
    discount: "40% OFF",
    save: "₹1000",
    image: "https://images.unsplash.com/photo-1608889476518-738c9b1dcb40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=580&q=80",
    rating: 4.4,
    reviews: 195,
  },
  {
    id: 8,
    name: "Women's Athletic Leggings",
    price: "₹1299",
    oldPrice: "₹2299",
    discount: "43% OFF",
    save: "₹1000",
    image: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=871&q=80",
    rating: 4.7,
    reviews: 527,
  },
];

const categories = [
  {
    id: 1,
    name: "Mobile",
    image: "https://cdn-icons-png.flaticon.com/512/0/191.png",
  },
  {
    id: 2,
    name: "Cosmetics",
    image: "https://cdn-icons-png.flaticon.com/512/2945/2945448.png",
  },
  {
    id: 3,
    name: "Electronics",
    image: "https://cdn-icons-png.flaticon.com/512/3523/3523061.png",
  },
  {
    id: 4,
    name: "Furniture",
    image: "https://cdn-icons-png.flaticon.com/512/3324/3324033.png",
  },
  {
    id: 5,
    name: "Watches",
    image: "https://cdn-icons-png.flaticon.com/512/3203/3203888.png",
  },
  {
    id: 6,
    name: "Decor",
    image: "https://cdn-icons-png.flaticon.com/512/2379/2379825.png",
  },
  {
    id: 7,
    name: "Accessories",
    image: "https://cdn-icons-png.flaticon.com/512/3081/3081559.png",
  },
];

// Sample reviews data
const initialReviews = [
  {
    id: 1,
    name: "Priya Sharma",
    email: "priya@example.com",
    rating: 5,
    feedback: "Excellent service and product quality. Fast delivery and great customer support!",
    date: "15 Jan 2024"
  },
  {
    id: 2,
    name: "Rahul Verma",
    email: "rahul@example.com",
    rating: 4,
    feedback: "Good products at reasonable prices. Could improve on packaging.",
    date: "12 Jan 2024"
  },
  {
    id: 3,
    name: "Anjali Patel",
    email: "anjali@example.com",
    rating: 5,
    feedback: "Loved the shopping experience. Will definitely recommend to friends and family!",
    date: "10 Jan 2024"
  },
  {
    id: 4,
    name: "Vikram Singh",
    email: "vikram@example.com",
    rating: 3,
    feedback: "Products are good but delivery took longer than expected.",
    date: "8 Jan 2024"
  },
  {
    id: 5,
    name: "Neha Gupta",
    email: "neha@example.com",
    rating: 5,
    feedback: "Best online shopping experience ever! Quality exceeded my expectations.",
    date: "5 Jan 2024"
  }
];

// Initial orders data
const initialOrders = [
  {
    id: 1001,
    date: "18 Jan 2024",
    total: "₹2,899",
    status: "Processing",
    items: [
      { name: "Women's Summer Dress", image: "https://images.unsplash.com/photo-1529903384028-929ae5dccdf1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80" },
      { name: "Men's Casual Shirt", image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=725&q=80" }
    ]
  },
  {
    id: 1002,
    date: "16 Jan 2024",
    total: "₹4,599",
    status: "Shipped",
    items: [
      { name: "Women's Winter Jacket", image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&id=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80" }
    ]
  },
  {
    id: 1003,
    date: "12 Jan 2024",
    total: "₹3,299",
    status: "Delivered",
    items: [
      { name: "Men's Denim Jeans", image: "https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=726&q=80" },
      { name: "Kids T-Shirt Pack", image: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=871&q=80" }
    ]
  }
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [orders, setOrders] = useState(initialOrders);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isOrderHistoryOpen, setIsOrderHistoryOpen] = useState(false);
  const [isCancellationModalOpen, setIsCancellationModalOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [showCheckoutMessage, setShowCheckoutMessage] = useState(false);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [reviews, setReviews] = useState(initialReviews);

  // Carousel useEffect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Show notification function
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

  // Add to Cart function
  const addToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
    
    showNotification(`✅ Added "${product.name}" to cart!`);
  };

  // Update quantity
  const updateQuantity = (productId, quantity) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  // Remove from cart
  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
    showNotification("🗑️ Item removed from cart");
  };

  // Checkout function
  const checkout = () => {
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = cartItems.reduce((sum, item) => sum + (parseInt(item.price.replace('₹', '').replace(',', '')) * item.quantity), 0);
    const total = subtotal + (subtotal > 999 ? 0 : 49) + (subtotal * 0.18);
    
    // Create new order
    const newOrder = {
      id: Math.floor(1000 + Math.random() * 9000),
      date: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      }),
      total: `₹${total.toFixed(2)}`,
      status: "Processing",
      items: cartItems.map(item => ({
        name: item.name,
        image: item.image,
        quantity: item.quantity
      }))
    };
    
    // Add to orders
    setOrders(prev => [newOrder, ...prev]);
    
    // Show success message
    setShowCheckoutMessage(true);
    setCartItems([]);
    setIsCartOpen(false);
    
    setTimeout(() => {
      setShowCheckoutMessage(false);
    }, 5000);
    
    showNotification(`🎉 Order #${newOrder.id} placed successfully!`);
  };

  // Cancel order function
  const initiateCancelOrder = (orderId) => {
    setSelectedOrderId(orderId);
    setIsCancellationModalOpen(true);
  };

  const confirmCancelOrder = (orderId, reason) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId 
        ? { ...order, status: "Cancelled", cancellationReason: reason }
        : order
    ));
    
    showNotification(`❌ Order #${orderId} has been cancelled.`, "warning");
  };

  // Submit feedback
  const submitFeedback = (newReview) => {
    setReviews(prev => [newReview, ...prev]);
    showNotification("✅ Thank you for your feedback!");
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
  };

  const goToPrev = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + carouselImages.length) % carouselImages.length
    );
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Calculate average rating
  const averageRating = reviews.length > 0 
    ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
    : "0.0";

  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-blue-50 min-h-screen">
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

      {/* Floating Icons */}
      <CartIcon itemCount={totalItems} onClick={() => setIsCartOpen(true)} />
      <OrderHistoryIcon onClick={() => setIsOrderHistoryOpen(true)} />
      <FeedbackIcon onClick={() => setIsFeedbackOpen(true)} />

      {/* Cart Component */}
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
        checkout={checkout}
      />

      {/* Order History Component */}
      <OrderHistory
        isOpen={isOrderHistoryOpen}
        onClose={() => setIsOrderHistoryOpen(false)}
        orders={orders}
        cancelOrder={initiateCancelOrder}
      />

      {/* Cancellation Modal */}
      <CancellationModal
        isOpen={isCancellationModalOpen}
        onClose={() => {
          setIsCancellationModalOpen(false);
          setSelectedOrderId(null);
        }}
        orderId={selectedOrderId}
        onConfirm={confirmCancelOrder}
      />

      {/* Feedback & Review Component */}
      <FeedbackReview
        isOpen={isFeedbackOpen}
        onClose={() => setIsFeedbackOpen(false)}
        onSubmitFeedback={submitFeedback}
        reviews={reviews}
      />

      {/* Checkout Success Message */}
      {showCheckoutMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 animate-fadeIn">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full mx-4 shadow-2xl">
            <div className="text-center">
              <div className="mx-auto w-20 h-20 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">🎉 Order Placed Successfully!</h2>
              <p className="text-gray-600 mb-6">
                Thank you for your purchase! Your order has been confirmed and will be shipped soon.
              </p>
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-xl mb-6">
                <p className="text-sm text-gray-600">
                  A confirmation email has been sent to your registered email address.
                </p>
              </div>
              <button
                onClick={() => setShowCheckoutMessage(false)}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-300"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Top Banner */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 text-white py-3 px-6 text-center relative overflow-hidden shadow-md">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
        <p className="text-sm font-medium relative z-10">
          🚚 Free shipping on orders above ₹999 | Use code{" "}
          <span className="font-bold bg-white/20 px-2 py-1 rounded-md animate-pulse">
            WELCOME20
          </span>{" "}
          for 20% off
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Hero Section */}
        <section className="py-8 md:py-12">
          <div className="flex flex-col lg:flex-row gap-8 items-center">
            {/* Left Content */}
            <div className="hidden md:block lg:w-1/2 bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-3xl shadow-sm border border-blue-100 transform transition-all duration-300 hover:shadow-md">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Welcome to{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  MegaMart
                </span>
              </h1>
              <p className="text-lg text-gray-600 mb-6">
                Discover amazing products at unbelievable prices. Shop the
                latest trends with exclusive discounts.
              </p>
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={() => window.scrollTo({ top: document.querySelector('.py-8').offsetTop - 100, behavior: 'smooth' })}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
                >
                  Shop Now
                </button>
                <button className="border border-blue-600 text-blue-600 px-6 py-3 rounded-xl font-medium hover:bg-blue-50 transition-all duration-300 hover:-translate-y-0.5">
                  Learn More
                </button>
              </div>

              {/* Features list */}
              <div className="mt-8 grid grid-cols-2 gap-4">
                {['Free Shipping', '24/7 Support', 'Secure Payment', 'Easy Returns'].map((feature, idx) => (
                  <div key={idx} className="flex items-center">
                    <div className="bg-blue-100 p-2 rounded-lg mr-3">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right side - Carousel */}
            <div className="w-full md:w-1/2 lg:w-1/2 relative">
              <div className="relative overflow-hidden rounded-3xl shadow-xl">
                <div className="relative h-64 sm:h-80 md:h-96">
                  {carouselImages.map((image, index) => (
                    <div
                      key={index}
                      className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                        index === currentSlide ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      <img
                        src={image}
                        alt={`Slide ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                        <div className="p-4 md:p-6 text-white">
                          <h3 className="text-lg md:text-xl font-bold mb-2">
                            {index === 0 && "Special Offers Up To 70% Off"}
                            {index === 1 && "New Arrivals Just In"}
                            {index === 2 && "Flash Sale - Limited Time"}
                            {index === 3 && "Premium Brands Collection"}
                          </h3>
                          <button 
                            onClick={() => addToCart(products[index % products.length])}
                            className="bg-white text-blue-600 px-3 py-2 md:px-4 md:py-2 rounded-lg font-medium mt-2 hover:bg-blue-50 transition-all duration-300 text-sm md:text-base transform hover:-translate-y-0.5"
                          >
                            Shop Now
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Navigation arrows */}
                <button
                  onClick={goToPrev}
                  className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full p-2 md:p-3 shadow-md transition-all duration-300 hover:scale-110"
                >
                  <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                  </svg>
                </button>
                <button
                  onClick={goToNext}
                  className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full p-2 md:p-3 shadow-md transition-all duration-300 hover:scale-110"
                >
                  <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </button>

                {/* Indicators */}
                <div className="absolute bottom-2 md:bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {carouselImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                        index === currentSlide
                          ? "bg-white scale-125"
                          : "bg-white/50 hover:bg-white/80"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mobile-only welcome text */}
        <div className="md:hidden bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-3xl shadow-sm border border-blue-100 mb-8 transform transition-all duration-300 hover:shadow-md">
          <h1 className="text-3xl font-bold text-gray-900 mb-3 text-center">
            Welcome to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              MegaMart
            </span>
          </h1>
          <p className="text-gray-600 text-center mb-4">
            Discover amazing products at unbelievable prices
          </p>
          <div className="flex justify-center gap-3">
            <button 
              onClick={() => window.scrollTo({ top: document.querySelector('.py-8').offsetTop - 100, behavior: 'smooth' })}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-xl font-medium shadow-lg text-sm transition-all duration-300 hover:-translate-y-0.5"
            >
              Shop Now
            </button>
            <button className="border border-blue-600 text-blue-600 px-4 py-2 rounded-xl font-medium hover:bg-blue-50 transition-all duration-300 hover:-translate-y-0.5 text-sm">
              Learn More
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="flex items-center justify-center my-12">
          <div className="w-48 h-1 bg-gradient-to-r from-transparent via-blue-300 to-transparent rounded-full"></div>
        </div>

        {/* Fashion Products Section */}
        <section className="py-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                Grab the best deal on{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  Fashion
                </span>
              </h2>
              <p className="text-gray-500 mt-2">
                Limited time offers on trendy clothing
              </p>
            </div>
            <a href="#" className="text-blue-600 text-sm font-medium flex items-center hover:text-blue-800 transition-colors group bg-blue-50 px-4 py-2 rounded-lg">
              View All{" "}
              <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </div>

          {/* Product cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {products.slice(0, 8).map((product) => (
              <div key={product.id} className="bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-xl transition-all duration-300 p-5 relative flex flex-col group overflow-hidden transform hover:-translate-y-1">
                {/* Discount badge */}
                <span className="absolute top-4 right-4 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg z-10">
                  {product.discount}
                </span>

                <div className="h-48 flex items-center justify-center p-3 relative mb-4 overflow-hidden rounded-xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl z-0"></div>
                  <div className="relative w-full h-full flex items-center justify-center">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover rounded-lg" />
                  </div>
                </div>

                {/* Info */}
                <div className="mt-2 flex-grow">
                  <h3 className="text-md font-semibold text-gray-800 line-clamp-2 mb-3 group-hover:text-blue-600 transition-colors">
                    {product.name}
                  </h3>

                  {/* Rating */}
                  <div className="flex items-center mb-2">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? "fill-current" : "stroke-current text-gray-300"}`} viewBox="0 0 24 24">
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-xs text-gray-500 ml-1">({product.reviews})</span>
                  </div>

                  <div className="flex items-center space-x-2 mb-2">
                    <span className="font-bold text-lg text-gray-900">{product.price}</span>
                    <span className="line-through text-gray-400 text-sm">{product.oldPrice}</span>
                  </div>
                  <p className="text-green-600 text-sm font-medium bg-green-50 inline-block px-3 py-1 rounded-lg mb-4">
                    💰 Save {product.save}
                  </p>
                </div>

                {/* Add to cart button */}
                <button 
                  onClick={() => addToCart(product)}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl text-sm font-medium shadow-md hover:shadow-lg transition-all duration-300 w-full flex items-center justify-center transform hover:-translate-y-0.5"
                >
                  <span>Add to Cart</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <div className="flex items-center justify-center my-12">
          <div className="w-48 h-1 bg-gradient-to-r from-transparent via-blue-300 to-transparent rounded-full"></div>
        </div>

        {/* Categories Section */}
        <section className="py-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                Shop From{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  Top Categories
                </span>
              </h2>
              <p className="text-gray-500 mt-2">Browse products by category</p>
            </div>
            <a href="#" className="text-blue-600 text-sm font-medium flex items-center hover:text-blue-800 transition-colors group bg-blue-50 px-4 py-2 rounded-lg">
              View All{" "}
              <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </div>

          {/* Categories */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-5">
            {categories.map((cat) => (
              <div key={cat.id} className="flex flex-col items-center group cursor-pointer bg-white p-4 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 transform hover:-translate-y-1">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-white flex items-center justify-center overflow-hidden shadow-inner group-hover:from-blue-100 group-hover:to-purple-100 transition-all duration-300">
                  <img src={cat.image} alt={cat.name} className="h-10 md:h-12 object-contain group-hover:scale-110 transition-transform duration-300" />
                </div>
                <p className="mt-3 text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors text-center">{cat.name}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <div className="flex items-center justify-center my-12">
          <div className="w-48 h-1 bg-gradient-to-r from-transparent via-blue-300 to-transparent rounded-full"></div>
        </div>

        {/* Newsletter Section */}
        <section className="py-12 mt-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl shadow-inner text-center border border-blue-100 overflow-hidden relative">
          <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-blue-200 opacity-20"></div>
          <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-purple-200 opacity-20"></div>
          <div className="max-w-2xl mx-auto px-4 relative z-10">
            <div className="bg-white p-2 rounded-2xl inline-flex items-center mb-4 shadow-sm">
              <div className="bg-blue-100 text-blue-600 p-2 rounded-xl">✉️</div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 ml-3">Subscribe to Our Newsletter</h2>
            </div>
            <p className="text-gray-600 mb-8">
              Get the latest updates on new products, special offers, and exclusive discounts.
            </p>
            <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-3 bg-white p-2 rounded-2xl shadow-lg">
              <input type="email" placeholder="Your email address" className="flex-grow px-4 py-3 rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-medium shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5">Subscribe</button>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: "10K+", label: "Happy Customers" },
            { value: "200+", label: "Brand Partners" },
            { value: "5M+", label: "Products Sold" },
            { value: "24/7", label: "Customer Support" },
          ].map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center transform transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
              <div className="text-3xl font-bold text-blue-600 mb-2">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </section>
      </div>

      {/* External Components */}
      <div className="flex items-center justify-center my-12">
        <div className="w-48 h-1 bg-gradient-to-r from-transparent via-blue-300 to-transparent rounded-full"></div>
      </div>
      <Carousel />
      <div className="flex items-center justify-center my-12">
        <div className="w-48 h-1 bg-gradient-to-r from-transparent via-blue-300 to-transparent rounded-full"></div>
      </div>

      {/* Kids Fashion Section */}
      <div className="bg-gradient-to-br from-gray-50 via-white to-blue-50 min-h-screen">
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-10">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                  Grab the best deal on{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                    Kids Fashion
                  </span>
                </h2>
                <p className="text-gray-500 mt-2">Limited time offers on trendy kids clothing</p>
              </div>
              <a href="#" className="text-blue-600 text-sm font-medium flex items-center hover:text-blue-800 transition-colors group bg-blue-50 px-4 py-2 rounded-lg">
                View All{" "}
                <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {[
                { id: 101, name: "Kids Cartoon T-Shirt", price: "₹499", oldPrice: "₹899", discount: "44% OFF", save: "₹400", image: "kid1.jpeg", rating: 4.5, reviews: 124 },
                { id: 102, name: "Boys Denim Overalls", price: "₹899", oldPrice: "₹1499", discount: "40% OFF", save: "₹600", image: "Kid2.jpeg", rating: 4.3, reviews: 89 },
                { id: 103, name: "Girls Floral Dress", price: "₹799", oldPrice: "₹1299", discount: "38% OFF", save: "₹500", image: "Kid3.jpeg", rating: 4.7, reviews: 156 },
                { id: 104, name: "Kids Winter Jacket", price: "₹1299", oldPrice: "₹2199", discount: "41% OFF", save: "₹900", image: "Kid4.jpeg", rating: 4.6, reviews: 112 },
                { id: 105, name: "Toddler Jumpsuit", price: "₹699", oldPrice: "₹1199", discount: "42% OFF", save: "₹500", image: "Kig5.jpeg", rating: 4.4, reviews: 78 },
                { id: 106, name: "Kids Sports Tracksuit", price: "₹999", oldPrice: "₹1699", discount: "41% OFF", save: "₹700", image: "Kid6.jpeg", rating: 4.2, reviews: 95 },
                { id: 107, name: "Baby Romper Set", price: "₹599", oldPrice: "₹999", discount: "40% OFF", save: "₹400", image: "Kid7.jpeg", rating: 4.8, reviews: 203 },
                { id: 108, name: "Kids Party Dress", price: "₹1099", oldPrice: "₹1899", discount: "42% OFF", save: "₹800", image: "Kid8.jpeg", rating: 4.6, reviews: 142 },
              ].map((product) => (
                <div key={product.id} className="bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-xl transition-all duration-300 p-5 relative flex flex-col group overflow-hidden transform hover:-translate-y-1">
                  <span className="absolute top-4 right-4 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg z-10">
                    {product.discount}
                  </span>

                  <div className="h-48 flex items-center justify-center p-3 relative mb-4 overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 to-purple-50">
                    <img src={product.image} alt={product.name} className="max-h-full max-w-full object-contain transform group-hover:scale-105 transition-transform duration-300" onError={(e) => {
                      e.target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJtb25vc3BhY2UiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM5YzlkYWEiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5JbWFnZSBub3QgZm91bmQ8L3RleHQ+PC9zdmc+";
                    }} />
                  </div>

                  {/* Info */}
                  <div className="mt-2 flex-grow">
                    <h3 className="text-md font-semibold text-gray-800 line-clamp-2 mb-3 group-hover:text-blue-600 transition-colors">{product.name}</h3>
                    <div className="flex items-center mb-2">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? "fill-current" : "stroke-current text-gray-300"}`} viewBox="0 0 24 24">
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-xs text-gray-500 ml-1">({product.reviews})</span>
                    </div>
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="font-bold text-lg text-gray-900">{product.price}</span>
                      <span className="line-through text-gray-400 text-sm">{product.oldPrice}</span>
                    </div>
                    <p className="text-green-600 text-sm font-medium bg-green-50 inline-block px-3 py-1 rounded-lg mb-4">💰 Save {product.save}</p>
                  </div>

                  {/* Add to cart button */}
                  <button 
                    onClick={() => addToCart(product)}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl text-sm font-medium shadow-md hover:shadow-lg transition-all duration-300 w-full flex items-center justify-center transform hover:-translate-y-0.5"
                  >
                    <span>Add to Cart</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* More External Components */}
      <div className="flex items-center justify-center my-12">
        <div className="w-48 h-1 bg-gradient-to-r from-transparent via-blue-300 to-transparent rounded-full"></div>
      </div>
      <ExcitingDeals />
    </div>
  );
}