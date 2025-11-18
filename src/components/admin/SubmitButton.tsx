// components/addStock/SubmitButton.tsx
'use client';

import React from 'react';

interface SubmitButtonProps {
  isSubmitting: boolean;
  label?:string
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ isSubmitting, label="Add Stock" }) => {
  return (
    <button
      type="submit"
      disabled={isSubmitting}
      className={`inline-block text-white bg-[#14438B] font-normal rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2 ${
        isSubmitting ? 'opacity-75 cursor-not-allowed' : 'cursor-pointer hover:bg-[#0d366f]'
      }`}
    >
      {isSubmitting ? (
        <span className="flex items-center justify-center gap-2">
          <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Submitting...
        </span>
      ) : label}
    </button>
  );
};

export default SubmitButton;