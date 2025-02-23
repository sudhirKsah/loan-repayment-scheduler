import React, { useState } from "react";
import LoanForm from "../components/LoanForm";
import ScheduleTable from "../components/ScheduleTable";
import SummaryStats from "../components/SummaryStats";
import Charts from "../components/Charts";
import { toast } from "react-toastify";
import { ArrowDownToLine } from 'lucide-react';

const Home = () => {
  const [schedule, setSchedule] = useState([]);
  const [summary, setSummary] = useState({ totalInterest: 0, totalAmount: 0 });

  const API_URL = import.meta.env.VITE_API_URL;

  const handleCalculate = async (loanDetails) => {
    try {
      const response = await fetch(`${API_URL}/api/loan/calculate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loanDetails),
      });
      const data = await response.json();
      if (response.ok) {
        setSchedule(data.schedule);
        calculateSummary(data.schedule);
        toast.success("Schedule calculated successfully!");
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      toast.error("Failed to calculate schedule.");
    }
  };

  const calculateSummary = (schedule) => {
    const totalInterest = schedule.reduce((sum, row) => sum + parseFloat(row.interest), 0);
    const totalAmount = schedule.reduce((sum, row) => sum + parseFloat(row.emi), 0);
    setSummary({ totalInterest, totalAmount });
  };

  const handleExportCSV = async () => {
    try {
      const response = await fetch(`${API_URL}/api/loan/export-csv`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ schedule, summary }),
      });
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "loan_schedule.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        toast.success("CSV exported successfully!");
      } else {
        toast.error("Failed to export CSV.");
      }
    } catch (error) {
      toast.error("Failed to export CSV.");
    }
  };
  
  const handleExportPDF = async () => {
    try {
      const response = await fetch(`${API_URL}/api/loan/export-pdf`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ schedule, summary }),
      });
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "loan_schedule.pdf");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        toast.success("PDF exported successfully!");
      } else {
        toast.error("Failed to export PDF.");
      }
    } catch (error) {
      toast.error("Failed to export PDF.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-6">Loan Repayment Schedule Calculator</h1>
        <LoanForm onCalculate={handleCalculate} />
        {schedule.length > 0 && (
          <>
          <div className="flex gap-4 mt-6">
              <button
                onClick={handleExportCSV}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                <ArrowDownToLine size={16} />
                Export CSV
              </button>
              <button
                onClick={handleExportPDF}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                <ArrowDownToLine size={16} />
                Export PDF
              </button>
            </div>
            <SummaryStats summary={summary} />
            <Charts schedule={schedule} />
            <ScheduleTable schedule={schedule} />
            
          </>
        )}
      </div>
    </div>
  );
};

export default Home;