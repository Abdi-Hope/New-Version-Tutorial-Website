import React from "react";
import { Download, Printer, Mail, Share2, FileText } from "lucide-react";

const InvoiceGenerator = ({ invoice }) => {
  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // In a real app, this would generate and download a PDF
    alert("Invoice downloaded as PDF");
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Invoice ${invoice.invoiceNumber}`,
        text: `Invoice for ${invoice.courseTitle}`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard");
    }
  };

  const handleEmail = () => {
    alert("Invoice sent to your email");
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      {/* Invoice Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">INVOICE</h2>
          <p className="text-gray-600 dark:text-gray-300">#{invoice.invoiceNumber}</p>
        </div>
        <div className="mt-4 md:mt-0">
          <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
            ${invoice.totalAmount}
          </div>
          <div className={`px-3 py-1 rounded-full text-sm font-medium inline-block mt-2 ${
            invoice.status === "paid"
              ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300"
              : invoice.status === "pending"
              ? "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-300"
              : "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300"
          }`}>
            {invoice.status.toUpperCase()}
          </div>
        </div>
      </div>

      {/* Invoice Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">From</h3>
          <div className="space-y-2">
            <p className="font-bold text-gray-900 dark:text-white">AE Platform Inc.</p>
            <p className="text-gray-600 dark:text-gray-300">123 Education Street</p>
            <p className="text-gray-600 dark:text-gray-300">San Francisco, CA 94107</p>
            <p className="text-gray-600 dark:text-gray-300">contact@aeplatform.com</p>
            <p className="text-gray-600 dark:text-gray-300">+1 (555) 123-4567</p>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Bill To</h3>
          <div className="space-y-2">
            <p className="font-bold text-gray-900 dark:text-white">{invoice.customerName}</p>
            <p className="text-gray-600 dark:text-gray-300">{invoice.customerEmail}</p>
            <p className="text-gray-600 dark:text-gray-300">{invoice.customerAddress}</p>
          </div>
        </div>
      </div>

      {/* Invoice Dates */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <p className="text-sm text-gray-500 dark:text-gray-400">Invoice Date</p>
          <p className="font-semibold text-gray-900 dark:text-white">{invoice.invoiceDate}</p>
        </div>
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <p className="text-sm text-gray-500 dark:text-gray-400">Due Date</p>
          <p className="font-semibold text-gray-900 dark:text-white">{invoice.dueDate}</p>
        </div>
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <p className="text-sm text-gray-500 dark:text-gray-400">Payment Method</p>
          <p className="font-semibold text-gray-900 dark:text-white">{invoice.paymentMethod}</p>
        </div>
      </div>

      {/* Items Table */}
      <div className="overflow-x-auto mb-8">
        <table className="w-full">
          <thead>
            <tr className="border-b dark:border-gray-700">
              <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Description</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Quantity</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Unit Price</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Amount</th>
            </tr>
          </thead>
          <tbody>
            {invoice.items.map((item, index) => (
              <tr key={index} className="border-b dark:border-gray-700">
                <td className="py-3 px-4">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{item.description}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{item.details}</p>
                  </div>
                </td>
                <td className="py-3 px-4 text-gray-900 dark:text-white">{item.quantity}</td>
                <td className="py-3 px-4 text-gray-900 dark:text-white">${item.unitPrice}</td>
                <td className="py-3 px-4 text-gray-900 dark:text-white">${item.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Totals */}
      <div className="flex justify-end">
        <div className="w-full md:w-1/3 space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-300">Subtotal</span>
            <span className="font-semibold text-gray-900 dark:text-white">${invoice.subtotal}</span>
          </div>
          {invoice.tax > 0 && (
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-300">Tax ({invoice.taxRate}%)</span>
              <span className="font-semibold text-gray-900 dark:text-white">${invoice.tax}</span>
            </div>
          )}
          {invoice.discount > 0 && (
            <div className="flex justify-between text-green-600 dark:text-green-400">
              <span>Discount</span>
              <span>-${invoice.discount}</span>
            </div>
          )}
          <div className="border-t dark:border-gray-700 pt-3">
            <div className="flex justify-between text-lg font-bold">
              <span className="text-gray-900 dark:text-white">Total</span>
              <span className="text-blue-600 dark:text-blue-400">${invoice.totalAmount}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Notes */}
      {invoice.notes && (
        <div className="mt-8 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
          <p className="text-yellow-800 dark:text-yellow-300">
            <span className="font-semibold">Note:</span> {invoice.notes}
          </p>
        </div>
      )}

      {/* Footer Notes */}
      <div className="mt-8 text-sm text-gray-500 dark:text-gray-400">
        <p>Thank you for choosing AE Platform. Please make payment by the due date.</p>
        <p className="mt-1">For any questions, contact our support team at support@aeplatform.com</p>
      </div>

      {/* Action Buttons */}
      <div className="mt-8 pt-6 border-t dark:border-gray-700 flex flex-wrap gap-3">
        <button
          onClick={handlePrint}
          className="px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-300 rounded-lg transition-colors flex items-center space-x-2"
        >
          <Printer className="w-4 h-4" />
          <span>Print Invoice</span>
        </button>
        <button
          onClick={handleDownload}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center space-x-2"
        >
          <Download className="w-4 h-4" />
          <span>Download PDF</span>
        </button>
        <button
          onClick={handleShare}
          className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors flex items-center space-x-2"
        >
          <Share2 className="w-4 h-4" />
          <span>Share</span>
        </button>
        <button
          onClick={handleEmail}
          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors flex items-center space-x-2"
        >
          <Mail className="w-4 h-4" />
          <span>Email Invoice</span>
        </button>
      </div>
    </div>
  );
};

export default InvoiceGenerator;