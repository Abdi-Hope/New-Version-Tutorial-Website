import React, { useState } from "react";
import { CreditCard, Lock, Shield, Check } from "lucide-react";

const PaymentForm = ({ amount, currency = "USD", onPaymentSuccess }) => {
  const [paymentMethod, setPaymentMethod] = useState("credit_card");
  const [cardDetails, setCardDetails] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
    saveCard: false
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      onPaymentSuccess({
        transactionId: `TXN-${Date.now()}`,
        amount,
        currency,
        method: paymentMethod,
        timestamp: new Date().toISOString()
      });
    }, 2000);
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const handleCardNumberChange = (e) => {
    const formatted = formatCardNumber(e.target.value);
    setCardDetails(prev => ({
      ...prev,
      number: formatted
    }));
  };

  const getCardType = (number) => {
    const cleaned = number.replace(/\s/g, '');
    if (/^4/.test(cleaned)) return "visa";
    if (/^5[1-5]/.test(cleaned)) return "mastercard";
    if (/^3[47]/.test(cleaned)) return "amex";
    if (/^6(?:011|5)/.test(cleaned)) return "discover";
    return "credit";
  };

  if (isSuccess) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center">
        <div className="w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check className="w-10 h-10 text-green-600 dark:text-green-400" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Payment Successful!
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Your payment has been processed successfully. You can now access your course.
        </p>
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg inline-block">
          <div className="text-3xl font-bold text-green-600 dark:text-green-400">
            {currency} {amount}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Payment Details
        </h2>
        <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
          {currency} {amount}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Payment Method Selection */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Select Payment Method
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { id: "credit_card", label: "Card", icon: "💳" },
              { id: "paypal", label: "PayPal", icon: "🌐" },
              { id: "apple_pay", label: "Apple Pay", icon: "🍎" },
              { id: "google_pay", label: "Google Pay", icon: "📱" }
            ].map((method) => (
              <button
                key={method.id}
                type="button"
                onClick={() => setPaymentMethod(method.id)}
                className={`p-4 border-2 rounded-lg text-center transition-all ${
                  paymentMethod === method.id
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                    : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                }`}
              >
                <div className="text-2xl mb-2">{method.icon}</div>
                <div className="font-medium text-gray-900 dark:text-white">{method.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Card Details */}
        {paymentMethod === "credit_card" && (
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <CreditCard className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              <h4 className="font-semibold text-gray-900 dark:text-white">Card Information</h4>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Card Number
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={cardDetails.number}
                  onChange={handleCardNumberChange}
                  maxLength="19"
                  placeholder="1234 5678 9012 3456"
                  className="w-full px-4 py-3 pl-12 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  {cardDetails.number ? (
                    <div className="w-8 h-5 bg-gray-300 rounded flex items-center justify-center">
                      <span className="text-xs font-bold">{getCardType(cardDetails.number)}</span>
                    </div>
                  ) : (
                    <CreditCard className="w-5 h-5 text-gray-400" />
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Cardholder Name
                </label>
                <input
                  type="text"
                  value={cardDetails.name}
                  onChange={(e) => setCardDetails(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    value={cardDetails.expiry}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '');
                      if (value.length <= 4) {
                        const formatted = value.length > 2 ? `${value.slice(0,2)}/${value.slice(2)}` : value;
                        setCardDetails(prev => ({ ...prev, expiry: formatted }));
                      }
                    }}
                    placeholder="MM/YY"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    CVV
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={cardDetails.cvv}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '');
                        if (value.length <= 4) {
                          setCardDetails(prev => ({ ...prev, cvv: value }));
                        }
                      }}
                      maxLength="4"
                      placeholder="123"
                      className="w-full px-4 py-3 pr-12 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                      <Lock className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={cardDetails.saveCard}
                onChange={(e) => setCardDetails(prev => ({ ...prev, saveCard: e.target.checked }))}
                className="w-5 h-5 text-blue-600 rounded"
              />
              <span className="text-gray-700 dark:text-gray-300">
                Save this card for future payments
              </span>
            </label>
          </div>
        )}

        {/* Security Badge */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <Shield className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            <div>
              <p className="font-semibold text-blue-800 dark:text-blue-300">Secure Payment</p>
              <p className="text-sm text-blue-700 dark:text-blue-400">
                Your payment information is encrypted and secure
              </p>
            </div>
          </div>
        </div>

        {/* Terms */}
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
          By clicking "Pay Now", you agree to our Terms of Service and Privacy Policy
        </p>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isProcessing}
          className={`w-full py-4 rounded-lg font-semibold text-white transition-all ${
            isProcessing
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 transform hover:-translate-y-0.5"
          }`}
        >
          {isProcessing ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Processing Payment...</span>
            </div>
          ) : (
            `Pay ${currency} ${amount}`
          )}
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;