'use client';

import React, { useState, useCallback } from 'react';
import { addStockAction } from "@/services/stock_actions";
import { StockCategory } from "@/types/stock.types";
import { useStockForm } from '@/hooks/useStockForm';
import dynamic from 'next/dynamic';

const MessageAlert = dynamic(() => import("@/components/admin/MessageAlert"));
const StockFormSection = dynamic(() => import("@/components/admin/StockFormSection"));
const FinancialReportsInput = dynamic(() => import("@/components/admin/FinancialReportsInput"));
const SubmitButton = dynamic(() => import("@/components/admin/SubmitButton"));

const AddStockSimplePage = () => {

  const {
    formData,
    financialReports,
    handleReportChange,
    handleDescriptionChange,
    handleFinancialChange,
    handleInputChange,
    addReportField,
    removeReportField,
    validateForm,
    resetForm,
  } = useStockForm();


  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Form submission
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    const validationError = validateForm();
    if (validationError) {
      setMessage({ type: 'error', text: validationError });
      setIsSubmitting(false);
      return;
    }

    const { name, code, lastPrice, currentPrice, imageUrl, description, fundamentals, peerRatio, shareholding, financials, category, minQuantity, sector } = formData;

    const stockData = {
      name,
      code,
      lastPrice: lastPrice,
      currentPrice: currentPrice,
      imageUrl: imageUrl || undefined,
      description,
      fundamentals,
      peerRatio,
      shareholding,
      financials,
      category: category as StockCategory,
      minQuantity: minQuantity,
      sector: sector,
      financialReports: financialReports.filter(report => (report.reportLink.trim() !== '' && report.reportName.trim() !== '')),
    };
    try {
      const result = await addStockAction(stockData);
      if (result.status) {
        setMessage({ type: 'success', text: result.message || "Stock added successfully!" });
        resetForm();
      } else {
        setMessage({ type: 'error', text: result.message || "Failed to add stock." });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An unexpected error occurred. Please try again.' });
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, financialReports, validateForm, resetForm]);


  return (
    <section className="bg-gray-800 py-12">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-white mb-2">Add New Stock</h1>
          <p className="text-gray-100 text-lg">Use this form to enter all the stock details.</p>
        </div>
        <MessageAlert message={message} setMessage={setMessage} />

        <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-xl shadow-md p-8 space-y-8">
          <StockFormSection
            formData={formData}
            handleDescriptionChange={handleDescriptionChange}
            handleFinancialChange={handleFinancialChange}
            handleInputChange={handleInputChange}
          />
          <FinancialReportsInput
            reports={financialReports}
            onReportChange={handleReportChange}
            onAddReport={addReportField}
            onRemoveReport={removeReportField}
          />
          <div className="text-center">
            <SubmitButton isSubmitting={isSubmitting} />
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddStockSimplePage;