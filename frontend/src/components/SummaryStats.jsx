import React from "react";

const SummaryStats = ({ summary }) => {
  return (
    <div className="bg-gray-50 p-4 rounded-lg mb-6">
      <h3 className="text-lg font-bold mb-2">Summary</h3>
      <p>Total Interest Paid: <span className="font-semibold">{summary.totalInterest.toFixed(2)}</span></p>
      <p>Total Amount Paid: <span className="font-semibold">{summary.totalAmount.toFixed(2)}</span></p>
    </div>
  );
};

export default SummaryStats;