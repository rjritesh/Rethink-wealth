// components/addStock/FinancialReportsInput.tsx
'use client';

import { FinancialReport } from '@/types/stock.types';
import React from 'react';



interface FinancialReportsInputProps {
  reports: FinancialReport[];
  onReportChange: (index: number, field: keyof FinancialReport, value: string) => void;
  onAddReport: () => void;
  onRemoveReport: (index: number) => void;
}

const FinancialReportsInput: React.FC<FinancialReportsInputProps> = ({
  reports,
  onReportChange,
  onAddReport,
  onRemoveReport,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 lg:grid-cols-6 gap-6">
      <div className='col-span-1 md:col-span-4 lg:col-span-5'>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Financial Reports
        </label>
        {reports.length > 0 && reports.map((report, index) => (
          <div key={index} className="mb-4">
            <div className="flex items-center mb-2">
              <div className='w-full flex'>
                <input
                  type="text"
                  value={report.reportName}
                  onChange={(e) => onReportChange(index, 'reportName', e.target.value)}
                  className="w-[30%] px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-transparent placeholder:text-gray-350 placeholder:text-sm"
                  placeholder="Report name"
                />
                <input
                  type="url"
                  value={report.reportLink}
                  onChange={(e) => onReportChange(index, 'reportLink', e.target.value)}
                  className="w-[65%] ms-3 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-transparent placeholder:text-gray-350 placeholder:text-sm"
                  placeholder="https://example.com/report.pdf"
                />
              </div>
              {index === reports.length - 1 ? (
                <button
                  type="button"
                  onClick={onAddReport}
                  className="ml-2 p-2 bg-green-300 text-green-800 rounded-full h-[30px] w-[30px] flex items-center justify-center hover:bg-green-400 transition-colors shadow-sm"
                  aria-label="Add another report"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14" /><path d="M12 5v14" />
                  </svg>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => onRemoveReport(index)}
                  className="ml-2 p-2 rounded-full h-[30px] w-[30px] flex items-center justify-center shadow-sm bg-red-100 text-red-400 hover:text-red-600 hover:bg-red-200"
                  aria-label="Remove this report"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 6 6 18" /><path d="m6 6 12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        ))}
        <p className="text-xs text-gray-500 mt-1">
          Add financial reports with names and URLs (annual reports, quarterly statements, etc.)
        </p>
      </div>
    </div>
  );
};

export default FinancialReportsInput;