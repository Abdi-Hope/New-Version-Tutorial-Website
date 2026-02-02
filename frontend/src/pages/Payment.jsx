import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Lock, Shield, Check, ArrowLeft, CreditCard } from "lucide-react";
import { PaymentForm, InvoiceGenerator } from "../components/payment";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [transactionDetails, setTransactionDetails] = useState(null);

  // Mock course data from navigation
  const course = location.state?.course || {
    id: 1,
    title: "Advanced React Development",
    price: 299,
    duration: "8 weeks",
    instructor: "Sarah Johnson"
  };

  const handlePaymentSuccess = (details) => {
    setTransactionDetails(details);
    setPaymentSuccess(true);
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={handleBack}
            className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 mb-4"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to course
          </button>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Complete Your Enrollment
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Secure payment for {course.title}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Payment Form */}
          <div className="lg:col-span-2">
            {!paymentSuccess ? (
              <PaymentForm
                amount={course.price}
                currency="USD"
                onPaymentSuccess={handlePaymentSuccess}
              />
            ) : (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
                <div className="text-center mb-8">
                  <div className="w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check className="w-10 h-10 text-green-600 dark:text-green-400" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Enrollment Confirmed!
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    You now have full access to {course.title}
                  </p>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-gray-600 dark:text-gray-300">Course</p>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {course.title}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-600 dark:text-gray-300">Amount Paid</p>
                      <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                        ${course.price}
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600 dark:text-gray-300">Transaction ID</p>
                      <p className="font-mono text-gray-900 dark:text-white">
                        {transactionDetails?.transactionId}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600 dark:text-gray-300">Date & Time</p>
                      <p className="text-gray-900 dark:text-white">
                        {new Date().toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    Next Steps:
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 dark:text-blue-400 font-bold">1</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          Access Your Course
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Start learning immediately from your dashboard
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 dark:text-blue-400 font-bold">2</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          Join Community
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Connect with other students in the course forum
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 dark:text-blue-400 font-bold">3</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          Download Resources
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Access all course materials and resources
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-4 mt-8">
                  <button
                    onClick={() => navigate("/dashboard")}
                    className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold"
                  >
                    Go to Dashboard
                  </button>
                  <button
                    onClick={() => navigate(`/course/${course.id}`)}
                    className="flex-1 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    Start Learning
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Order Summary */}
          <div className="space-y-6">
            {/* Order Summary */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h3 className="font-bold text-lg mb-4">Order Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Course Price</span>
                  <span className="font-semibold">${course.price}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Platform Fee</span>
                  <span>$0.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Tax</span>
                  <span>$0.00</span>
                </div>
                <div className="border-t dark:border-gray-700 pt-3">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-blue-600 dark:text-blue-400">
                      ${course.price}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <p className="text-green-800 dark:text-green-300 text-sm">
                  <span className="font-semibold">30-Day Money-Back Guarantee</span> - 
                  If you're not satisfied, get a full refund within 30 days.
                </p>
              </div>
            </div>

            {/* Security Info */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Shield className="w-6 h-6 text-green-600 dark:text-green-400" />
                <h3 className="font-bold">Secure Payment</h3>
              </div>
              <div className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
                <p className="flex items-center space-x-2">
                  <Lock className="w-4 h-4" />
                  <span>256-bit SSL encryption</span>
                </p>
                <p className="flex items-center space-x-2">
                  <CreditCard className="w-4 h-4" />
                  <span>PCI-DSS compliant</span>
                </p>
                <p className="flex items-center space-x-2">
                  <Shield className="w-4 h-4" />
                  <span>No card details stored</span>
                </p>
              </div>
            </div>

            {/* Support */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h3 className="font-bold mb-3">Need Help?</h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-600 dark:text-gray-300">
                  Email: support@aeplatform.com
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  Phone: +1 (555) 123-4567
                </p>
                <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm">
                  Live Chat Support
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Invoice Section */}
        {paymentSuccess && transactionDetails && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Invoice
            </h2>
            <InvoiceGenerator
              invoice={{
                invoiceNumber: `INV-${Date.now()}`,
                status: "paid",
                totalAmount: course.price,
                customerName: "John Doe",
                customerEmail: "john@example.com",
                customerAddress: "123 Main St, San Francisco, CA 94107",
                invoiceDate: new Date().toLocaleDateString(),
                dueDate: new Date().toLocaleDateString(),
                paymentMethod: "Credit Card",
                subtotal: course.price,
                tax: 0,
                taxRate: 0,
                discount: 0,
                items: [
                  {
                    description: course.title,
                    details: `${course.duration} • Instructor: ${course.instructor}`,
                    quantity: 1,
                    unitPrice: course.price,
                    amount: course.price
                  }
                ],
                notes: "Thank you for your enrollment! Access your course immediately from your dashboard."
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Payment;