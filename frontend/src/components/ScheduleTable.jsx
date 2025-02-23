import React from "react";

const ScheduleTable = ({ schedule }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-50">
            <th className="p-2 border border-gray-200 text-left">No.</th>
            <th className="p-2 border border-gray-200 text-left">Date</th>
            <th className="p-2 border border-gray-200 text-right">Opening Balance</th>
            <th className="p-2 border border-gray-200 text-right">EMI</th>
            <th className="p-2 border border-gray-200 text-right">Interest</th>
            <th className="p-2 border border-gray-200 text-right">Principal</th>
            <th className="p-2 border border-gray-200 text-right">Closing Balance</th>
          </tr>
        </thead>
        <tbody>
        {schedule.map((row) => (
                    <tr key={row.paymentNumber} className="hover:bg-gray-50">
                      <td className="p-2 border border-gray-200">{row.paymentNumber}</td>
                      <td className="p-2 border border-gray-200">{row.date}</td>
                      <td className="p-2 border border-gray-200 text-right">
                        {parseFloat(row.openingBalance).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </td>
                      <td className="p-2 border border-gray-200 text-right">
                        {parseFloat(row.emi).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </td>
                      <td className="p-2 border border-gray-200 text-right">
                        {parseFloat(row.interest).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </td>
                      <td className="p-2 border border-gray-200 text-right">
                        {parseFloat(row.principal).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </td>
                      <td className="p-2 border border-gray-200 text-right">
                        {parseFloat(row.closingBalance).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </td>
                    </tr>
                  ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScheduleTable;