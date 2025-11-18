export type Stock = {
  id?: string;
  name: string;
  code: string;
  lastPrice: number;
  currentPrice: number;
  imageUrl?: string;
  description: string;
  financials: StockFinancials;
  fundamentals: string;
  shareholding?: string;
  peerRatio?: string;
  financialReports?: FinancialReport[];
  category: StockCategory;
  minQuantity: number;
  sector: string;
};
export type StockFinancials = {
  income_statement?: string;
  balance_sheet?: string;
  cash_flow?: string;
}

export interface FinancialReport {
  reportName: string;
  reportLink: string;
}

export const STOCK_CATEGORIES = ["Unknown", "HOT PICK"] as const;
export type StockCategory = (typeof STOCK_CATEGORIES)[number];

export type EquityData = {
  category: StockCategory;
  currentPrice: number;
  id: string;
  imageUrl: string;
  lastPrice: number;
  name: string;
  slug: string;
};

export type StockDescription = {
    name: string | undefined;
    description: string | undefined;
    fundamentals: string | undefined;
    peerRatio: string | undefined;
    shareholding: string | undefined;
    financials: StockFinancials | undefined;
}