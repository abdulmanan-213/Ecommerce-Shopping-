import React, { useState } from "react";

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

// Order History Icon Component
const OrderHistoryIcon = ({ onClick }) => (
  <button
    onClick={onClick}
    className="fixed bottom-24 right-6 z-40 bg-gradient-to-r from-orange-500 to-amber-600 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 group"
  >
    <div className="relative">
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    </div>
  </button>
);

// Cart Component (same as in Home)
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

// Women products data
const womenProducts = [
  {
    id: 101,
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
    id: 102,
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
    id: 103,
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
    id: 104,
    name: "Women's Athletic Leggings",
    price: "₹1299",
    oldPrice: "₹2299",
    discount: "43% OFF",
    save: "₹1000",
    image: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=871&q=80",
    rating: 4.7,
    reviews: 527,
  },
  {
    id: 105,
    name: "Women's Casual Blouse",
    price: "₹899",
    oldPrice: "₹1599",
    discount: "44% OFF",
    save: "₹700",
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    rating: 4.4,
    reviews: 256,
  },
  {
    id: 106,
    name: "Women's Formal Suit",
    price: "₹4499",
    oldPrice: "₹6999",
    discount: "36% OFF",
    save: "₹2500",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    rating: 4.9,
    reviews: 189,
  },
  {
    id: 107,
    name: "Women's Evening Gown",
    price: "₹5999",
    oldPrice: "₹8999",
    discount: "33% OFF",
    save: "₹3000",
    image: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    rating: 4.8,
    reviews: 312,
  },
  {
    id: 108,
    name: "Women's Party Wear",
    price: "₹2499",
    oldPrice: "₹4299",
    discount: "42% OFF",
    save: "₹1800",
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=776&q=80",
    rating: 4.5,
    reviews: 423,
  },
  {
    id: 109,
    name: "Women's Ethnic Wear",
    price: "₹3299",
    oldPrice: "₹5499",
    discount: "40% OFF",
    save: "₹2200",
    image: "https://images.unsplash.com/photo-1572804013427-4d7ca7268217?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1035&q=80",
    rating: 4.7,
    reviews: 567,
  },
  {
    id: 110,
    name: "Women's Casual T-Shirt",
    price: "₹699",
    oldPrice: "₹1299",
    discount: "46% OFF",
    save: "₹600",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=580&q=80",
    rating: 4.3,
    reviews: 289,
  },
  {
    id: 111,
    name: "Women's Denim Jacket",
    price: "₹2899",
    oldPrice: "₹4799",
    discount: "40% OFF",
    save: "₹1900",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    rating: 4.6,
    reviews: 198,
  },
  {
    id: 112,
    name: "Women's Sportswear Set",
    price: "₹1999",
    oldPrice: "₹3399",
    discount: "41% OFF",
    save: "₹1400",
    image: "https://images.unsplash.com/photo-1594736797933-d0b0c19c8535?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    rating: 4.4,
    reviews: 345,
  },
  {
    id: 113,
    name: "Women's Beach Dress",
    price: "₹1499",
    oldPrice: "₹2499",
    discount: "40% OFF",
    save: "₹1000",
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=776&q=80",
    rating: 4.5,
    reviews: 267,
  },
  {
    id: 114,
    name: "Women's Office Wear",
    price: "₹2799",
    oldPrice: "₹4599",
    discount: "39% OFF",
    save: "₹1800",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    rating: 4.7,
    reviews: 412,
  },
  {
    id: 115,
    name: "Women's Silk Saree",
    price: "₹6999",
    oldPrice: "₹11999",
    discount: "42% OFF",
    save: "₹5000",
    image: "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=772&q=80",
    rating: 4.9,
    reviews: 678,
  },
  {
    id: 116,
    name: "Women's Casual Shorts",
    price: "₹999",
    oldPrice: "₹1799",
    discount: "44% OFF",
    save: "₹800",
    image: "https://images.unsplash.com/photo-1582418702059-97ebafb35d09?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=715&q=80",
    rating: 4.2,
    reviews: 189,
  },
];

// Initial orders data for Women's page
const initialOrders = [
  {
    id: 2001,
    date: "18 Jan 2024",
    total: "₹4,299",
    status: "Processing",
    items: [
      { name: "Women's Summer Dress", image: "https://images.unsplash.com/photo-1529903384028-929ae5dccdf1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80" },
      { name: "Women's Casual T-Shirt", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=580&q=80" }
    ]
  },
  {
    id: 2002,
    date: "16 Jan 2024",
    total: "₹5,999",
    status: "Shipped",
    items: [
      { name: "Women's Winter Jacket", image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&id=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80" },
      { name: "Women's Athletic Leggings", image: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=871&q=80" }
    ]
  },
  {
    id: 2003,
    date: "12 Jan 2024",
    total: "₹7,299",
    status: "Delivered",
    items: [
      { name: "Women's Silk Saree", image: "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=772&q=80" },
      { name: "Women's Ethnic Wear", image: "https://images.unsplash.com/photo-1572804013427-4d7ca7268217?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1035&q=80" }
    ]
  }
];

export default function Women() {
  const [cartItems, setCartItems] = useState([]);
  const [orders, setOrders] = useState(initialOrders);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isOrderHistoryOpen, setIsOrderHistoryOpen] = useState(false);
  const [isCancellationModalOpen, setIsCancellationModalOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [showCheckoutMessage, setShowCheckoutMessage] = useState(false);

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
      id: Math.floor(2000 + Math.random() * 9000),
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

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

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
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>

      {/* Floating Icons */}
      <CartIcon itemCount={totalItems} onClick={() => setIsCartOpen(true)} />
      <OrderHistoryIcon onClick={() => setIsOrderHistoryOpen(true)} />

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

      <div className="bg-gradient-to-br from-gray-50 via-white to-blue-50 min-h-screen">
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Header Banner */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 mb-10 text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
              <div className="relative z-10">
                <h1 className="text-3xl md:text-4xl font-bold mb-3">Women's Fashion Collection</h1>
                <p className="text-lg mb-4">Discover the latest trends in women's clothing at unbeatable prices</p>
                <div className="flex flex-wrap gap-3">
                  <span className="bg-white/20 px-3 py-1 rounded-full text-sm">Dresses</span>
                  <span className="bg-white/20 px-3 py-1 rounded-full text-sm">Ethnic Wear</span>
                  <span className="bg-white/20 px-3 py-1 rounded-full text-sm">Casual Wear</span>
                  <span className="bg-white/20 px-3 py-1 rounded-full text-sm">Party Wear</span>
                  <span className="bg-white/20 px-3 py-1 rounded-full text-sm">Accessories</span>
                </div>
              </div>
            </div>

            {/* Order Tracking Section */}
            <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-3xl p-8 mb-10">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                    Track Your Orders
                  </h2>
                  <p className="text-gray-600">
                    View order history, track shipments, and manage cancellations
                  </p>
                </div>
                <button
                  onClick={() => setIsOrderHistoryOpen(true)}
                  className="mt-4 md:mt-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 flex items-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  View Order History
                </button>
              </div>
              
              {/* Order Status Summary */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-100 p-3 rounded-xl mr-4">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-blue-600">
                        {orders.filter(o => o.status === 'Processing').length}
                      </div>
                      <div className="text-sm text-gray-600">Processing</div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">Orders being prepared for shipment</p>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  <div className="flex items-center mb-4">
                    <div className="bg-green-100 p-3 rounded-xl mr-4">
                      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-600">
                        {orders.filter(o => o.status === 'Delivered').length}
                      </div>
                      <div className="text-sm text-gray-600">Delivered</div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">Orders successfully delivered</p>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  <div className="flex items-center mb-4">
                    <div className="bg-red-100 p-3 rounded-xl mr-4">
                      <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-red-600">
                        {orders.filter(o => o.status === 'Cancelled').length}
                      </div>
                      <div className="text-sm text-gray-600">Cancelled</div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">Orders that have been cancelled</p>
                </div>
              </div>
            </div>

            {/* Heading */}
            <div className="flex justify-between items-center mb-10">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                  Grab the best deal on{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                    Women's Fashion
                  </span>
                </h2>
                <p className="text-gray-500 mt-2">
                  Limited time offers on trendy women's clothing
                </p>
              </div>
              <a
                href="#"
                className="text-pink-600 text-sm font-medium flex items-center hover:text-pink-800 transition-colors group bg-pink-50 px-4 py-2 rounded-lg"
              >
                View All{" "}
                <span className="ml-1 group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {womenProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-xl transition-all duration-300 p-5 relative flex flex-col group overflow-hidden transform hover:-translate-y-1"
                >
                  <span className="absolute top-4 right-4 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg z-10">
                    {product.discount}
                  </span>

                  <div className="h-48 flex items-center justify-center p-3 relative mb-4 overflow-hidden rounded-xl bg-gradient-to-br from-pink-50 to-purple-50">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="max-h-full max-w-full object-contain transform group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.target.src =
                          "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjdmMGY4Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJtb25vc3BhY2UiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiNlYjllYzAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5JbWFnZSBub3QgZm91bmQ8L3RleHQ+PC9zdmc+";
                      }}
                    />
                  </div>

                  {/* Info */}
                  <div className="mt-2 flex-grow">
                    <h3 className="text-md font-semibold text-gray-800 line-clamp-2 mb-3 group-hover:text-pink-600 transition-colors">
                      {product.name}
                    </h3>

                    {/* Rating */}
                    <div className="flex items-center mb-2">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(product.rating)
                                ? "fill-current"
                                : "stroke-current text-gray-300"
                            }`}
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-xs text-gray-500 ml-1">
                        ({product.reviews})
                      </span>
                    </div>

                    <div className="flex items-center space-x-2 mb-2">
                      <span className="font-bold text-lg text-gray-900">
                        {product.price}
                      </span>
                      <span className="line-through text-gray-400 text-sm">
                        {product.oldPrice}
                      </span>
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
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 ml-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>

            {/* Features Section */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className=" p-6 rounded-2xl border border-pink-100">
                <div className="flex items-center mb-4">
                  <div className="bg-pink-100 p-3 rounded-xl mr-4">
                    <svg className="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">Premium Quality</h3>
                </div>
                <p className="text-gray-600">All products are made from high-quality materials for maximum comfort and durability.</p>
              </div>

              <div className="bg-gradient-to-br from-pink-50 to-purple-50 p-6 rounded-2xl border border-pink-100">
                <div className="flex items-center mb-4">
                  <div className="bg-pink-100 p-3 rounded-xl mr-4">
                    <svg className="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">Fast Delivery</h3>
                </div>
                <p className="text-gray-600">Get your orders delivered within 3-5 business days with our express shipping.</p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl border border-purple-100">
                <div className="flex items-center mb-4">
                  <div className="bg-purple-100 p-3 rounded-xl mr-4">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">Easy Returns</h3>
                </div>
                <p className="text-gray-600">30-day return policy for all products. We make returns and exchanges hassle-free.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}