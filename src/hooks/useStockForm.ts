// hooks/useStockForm.ts
import { useCallback, useEffect, useState } from "react";
import { FinancialReport, Stock, STOCK_CATEGORIES } from "@/types/stock.types";

export function useStockForm(initialData?: Partial<Stock>) {
    const [formData, setFormData] = useState<Stock>({
        name: initialData?.name || '',
        code: initialData?.code || '',
        lastPrice: initialData?.lastPrice || 0,
        currentPrice: initialData?.currentPrice || 0,
        imageUrl: initialData?.imageUrl || '',
        description: initialData?.description || '',
        fundamentals: initialData?.fundamentals || '',
        peerRatio: initialData?.peerRatio || '',
        shareholding: initialData?.shareholding || '',
        category: initialData?.category || STOCK_CATEGORIES[0],
        minQuantity: initialData?.minQuantity ?? 1,
        sector: initialData?.sector || '',
        financials: {
            income_statement: initialData?.financials?.income_statement || '',
            balance_sheet: initialData?.financials?.balance_sheet || '',
            cash_flow: initialData?.financials?.cash_flow || ''
        }
    });
    const [financialReports, setFinancialReports] = useState<FinancialReport[]>(
        initialData?.financialReports?.length
            ? initialData.financialReports.map(report =>
                typeof report === 'string'
                    ? { reportName: '', reportLink: report }
                    : report
            )
            : [{ reportName: '', reportLink: '' }]

    );
    useEffect(() => {
        if (initialData) {
            setFormData({
                name: initialData.name || '',
                code: initialData.code || '',
                lastPrice: initialData.lastPrice ?? 0,
                currentPrice: initialData.currentPrice ?? 0,
                imageUrl: initialData.imageUrl || '',
                description: initialData.description || '',
                fundamentals: initialData.fundamentals || '',
                peerRatio: initialData.peerRatio || '',
                shareholding: initialData.shareholding || '',
                financials: initialData.financials || {
                    income_statement: '',
                    balance_sheet: '',
                    cash_flow: ''
                },
                category: initialData.category || STOCK_CATEGORIES[0],
                minQuantity: initialData.minQuantity ?? 1,
                sector: initialData.sector || '',
            });
            setFinancialReports(initialData.financialReports?.length
                ? initialData.financialReports.map(report =>
                    typeof report === 'string'
                        ? { reportName: '', reportLink: report }
                        : report
                )
                : [{ reportName: '', reportLink: '' }]);
        }
    }, [initialData]);

    const handleInputChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
            const { name, value } = e.target;
            setFormData((prev) => ({ ...prev, [name]: value }));
        },
        []
    );

    const handleDescriptionChange = useCallback((field:string ,html: string) => {
        setFormData((prev) => ({ ...prev, [field]: html }));
    }, []);
    
    const handleFinancialChange = useCallback((field: string, html: string) => {
        setFormData((prev) => ({ ...prev, financials: { ...prev.financials, [field]: html } }));
    }, []);

    const handleReportChange = useCallback(
        (index: number, field: keyof FinancialReport, value: string) => {
            setFinancialReports((prev) =>
                prev.map((item, i) =>
                    i === index ? { ...item, [field]: value } : item
                )
            );
        },
        []
    );

    const addReportField = useCallback(() => {
        setFinancialReports((prev) => [...prev, { reportName: '', reportLink: '' }]);
    }, []);

    const removeReportField = useCallback((index: number) => {
        setFinancialReports((prev) => prev.filter((_, i) => i !== index));
    }, []);

    const isValidUrl = useCallback((string: string) => {
        try {
            new URL(string);
            return true;
        } catch {
            return false;
        }
    }, []);

    const validateForm = useCallback(() => {
        const { name, code, lastPrice, currentPrice, minQuantity } = formData;

        if (!name || !code || !lastPrice || !currentPrice || !minQuantity) {
            return "Please fill in all required fields.";
        }

        const parsedLastPrice = lastPrice;
        const parsedCurrentPrice = currentPrice;
        const parsedMinQuantity = minQuantity;

        if (
            isNaN(parsedLastPrice) ||
            parsedLastPrice <= 0 ||
            isNaN(parsedCurrentPrice) ||
            parsedCurrentPrice <= 0 ||
            isNaN(parsedMinQuantity) ||
            parsedMinQuantity <= 0
        ) {
            return "Prices and Minimum Quantity must be positive numbers.";
        }

        if (
            financialReports.some(
                (report) => report.reportLink.trim() !== "" && !isValidUrl(report.reportLink)
            )
        ) {
            return "Please enter valid URLs for financial reports.";
        }

        return null;
    }, [formData, financialReports, isValidUrl]);

    const resetForm = useCallback(() => {
        setFormData({
            name: '',
            code: '',
            lastPrice: 0,
            currentPrice: 0,
            imageUrl: '',
            description: '',
            fundamentals: '',
            peerRatio: '',
            shareholding: '',
            financials: {
                income_statement: '',
                balance_sheet: '',
                cash_flow: ''
            },
            category: STOCK_CATEGORIES[0],
            minQuantity: 1,
            sector: '',
        });
        setFinancialReports([{ reportName: '', reportLink: '' }]);
    }, []);

    return {
        formData,
        financialReports,
        setFormData,
        setFinancialReports,
        handleInputChange,
        handleDescriptionChange,
        handleFinancialChange,
        handleReportChange,
        addReportField,
        removeReportField,
        validateForm,
        resetForm,
    };
}