import { Stock } from '@/types/stock.types';
import dynamic from 'next/dynamic';
import React, { Suspense, useState } from 'react'
const TiptapEditor = dynamic(
    () => import('@/components/RichTextEditor/RichTextEditor'),
    {
        ssr: false,
        loading: () => <div className="min-h-[150px] p-2 border rounded">Loading editor...</div>
    }
);
type FinancialState = 'description' | 'fundamentals' | 'shareholding' | 'peerRatio' | 'income_statement' | 'balance_sheet' | 'cash_flow';

type FinancialEditorProp = {
    formData: Stock;
    handleDescriptionChange: (field: string, html: string) => void;
    handleFinancialChange: (field: keyof Stock['financials'], html: string) => void;
}

function Financials({ formData, handleDescriptionChange, handleFinancialChange }: FinancialEditorProp) {

    const [finState, setFinState] = useState<FinancialState>("description");
    const buttons = [
        { name: "Description", id: "description" },
        { name: "Income Statement", id: "income_statement" },
        { name: "Balance Sheet", id: "balance_sheet" },
        { name: "Cash Flow", id: "cash_flow" },
        { name: "Fundamentals", id: "fundamentals" },
        { name: "Shareholding", id: "shareholding" },
        { name: "Peer Ratio", id: "peerRatio" }
    ];
    const hendleFinStateChange = (e: React.MouseEvent, data: FinancialState) => {
        e.preventDefault();
        setFinState(data);
    }
    const financials = formData.financials || {
        income_statement: '',
        balance_sheet: '',
        cash_flow: ''
    };
    const getEditorProps = () => {
        if (finState === 'description' || finState === 'fundamentals' || finState === 'shareholding' || finState === 'peerRatio') {
            return {
                value: formData[finState] || '',
                onChange: (content: string) => handleDescriptionChange(finState, content)
            }
        }
        return {
            value: financials[finState] || '',
            onChange: (content: string) => handleFinancialChange(finState, content)
        };
    };
    const editorProps = getEditorProps();

    return (
        <div>
            <div>
                {
                    buttons.map((btn) => (
                        <button key={btn.id} onClick={(e) => hendleFinStateChange(e, btn.id as FinancialState)} className={`inline-block m-2 text-white ${finState == btn.id ? "bg-[#14438B]" : "bg-[#8eafe0]"} font-normal rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2 cursor-pointer`} type='button'>{btn.name}</button>
                    ))
                }
            </div>
            <Suspense fallback={<div>Loading...</div>}>
                <TiptapEditor value={editorProps?.value ?? ''}
                    onChange={editorProps?.onChange ?? (() => { })} />
            </Suspense>
        </div>
    )
}

export default Financials
