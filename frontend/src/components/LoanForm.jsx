import React, { useState } from "react";

const LoanForm = ({ onCalculate }) => {
  const [loanDetails, setLoanDetails] = useState({
    disbursementDate: "",
    principal: "",
    tenure: "",
    frequency: "monthly",
    interestRate: "",
    moratoriumPeriod: "0",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoanDetails({ ...loanDetails, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCalculate(loanDetails);
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Disbursement Date</label>
        <input
          type="date"
          name="disbursementDate"
          value={loanDetails.disbursementDate}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Principal Amount</label>
        <input
          type="number"
          name="principal"
          value={loanDetails.principal}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Tenure (months)</label>
        <input
          type="number"
          name="tenure"
          value={loanDetails.tenure}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">EMI Frequency</label>
        <select
          name="frequency"
          value={loanDetails.frequency}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        >
          <option value="monthly">Monthly</option>
          <option value="weekly">Weekly</option>
          <option value="quarterly">Quarterly</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Interest Rate (% per annum)</label>
        <input
          type="number"
          name="interestRate"
          value={loanDetails.interestRate}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Moratorium Period</label>
        <input
          type="number"
          name="moratoriumPeriod"
          value={loanDetails.moratoriumPeriod}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          required
        />
      </div>
      <div className="col-span-3">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Calculate Schedule
        </button>
      </div>
    </form>
  );
};

export default LoanForm;