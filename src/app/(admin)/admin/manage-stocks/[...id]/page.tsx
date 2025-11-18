'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { deleteStockById, getStockDetailsById, updateStockDetails } from "@/services/stock_actions"; // You must implement these
import { Stock, StockCategory } from "@/types/stock.types";
import { useStockForm } from '@/hooks/useStockForm';
import dynamic from 'next/dynamic';

const MessageAlert = dynamic(() => import("@/components/admin/MessageAlert"));
const StockFormSection = dynamic(() => import("@/components/admin/StockFormSection"));
const FinancialReportsInput = dynamic(() => import("@/components/admin/FinancialReportsInput"));
const SubmitButton = dynamic(() => import("@/components/admin/SubmitButton"));

const UpdateStock = () => {
    const params = useParams();
    const id = typeof params.id === 'string' ? params.id : Array.isArray(params.id) ? params.id[0] : '';
    const router = useRouter();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    // Fetch stock by ID on mount
    const [initialForm, setInitialForm] = useState<Stock | null>(null);
    useEffect(() => {
        const fetchData = async () => {
            const stock = await getStockDetailsById(id as string);

            if (stock) {
                setInitialForm({
                    name: stock.name,
                    code: stock.code,
                    lastPrice: stock.lastPrice,
                    currentPrice: stock.currentPrice,
                    imageUrl: stock.imageUrl || '',
                    description: stock.description,
                    financials: stock.financials,
                    fundamentals: stock.fundamentals || '',
                    shareholding: stock.shareholding || '',
                    peerRatio: stock.peerRatio || '',
                    category: stock.category as StockCategory,
                    minQuantity: stock.minQuantity,
                    sector: stock.sector || '',
                    financialReports: stock.financialReports?.length ? stock.financialReports : []
                });
            }
        };

        fetchData();
    }, [id]);

    const {
        formData,
        financialReports,
        handleReportChange,
        addReportField,
        removeReportField,
        validateForm,
        handleDescriptionChange,
        handleFinancialChange,
        handleInputChange
    } = useStockForm(initialForm || undefined);

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
            financialReports: financialReports.filter(report => (report.reportName.trim() !== '' && report.reportLink.trim() !== '')),
        };

        try {
            const result = await updateStockDetails(id, stockData);
            if (result.success) {
                setMessage({ type: 'success', text: result.message || "Stock updated successfully!" });
                router.push('/admin/manage-stocks');
            } else {
                setMessage({ type: 'error', text: result.message || "Failed to add stock." });
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'An unexpected error occurred. Please try again.' });
            console.error("Submission error:", error);
        } finally {
            setIsSubmitting(false);
        }
    }, [formData, financialReports, validateForm, id, router]);

    const handleDeleteStock = useCallback(async () => {
        const result = await deleteStockById(id);
        if (result.success) {
            router.push('/admin/manage-stocks');
        }
        else {
            setMessage({ type: "error", text: result.message || "Failed to delete stock." });
        }
    }, [id, router]);
    return (
        <section className="bg-gray-800 py-12">
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-10 text-center">
                    <h1 className="text-4xl font-bold text-white mb-2">Edit Stock</h1>
                    <p className="text-gray-100 text-lg">Update existing stock information.</p>
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

                    <div className="text-center flex justify-center gap-4">
                        <SubmitButton isSubmitting={isSubmitting} label="Update Stock" />
                        <button onClick={handleDeleteStock} className='inline-block text-white bg-[#d32335] font-normal rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2 cursor-pointer hover:bg-[#f13246] transition-colors duration-200'>
                            Delete Stock
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default UpdateStock