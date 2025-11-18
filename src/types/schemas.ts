import { z } from "zod";
import { STOCK_CATEGORIES } from "./stock.types";

export const stockFormSchema = z.object({
  name: z.string().min(2, { message: "Stock name must be at least 2 characters." }).max(100),
  code: z.string().min(1, { message: "Stock code is required." }).max(20),
  lastPrice: z.coerce.number().positive({ message: "Last price must be a positive number." }),
  currentPrice: z.coerce.number().positive({ message: "Current price must be a positive number." }),
  imageUrl: z.string().url({ message: "Please enter a valid image URL." }).optional().or(z.literal('')),
  description: z.string().min(10, { message: "Description is required." }),
  fundamentals: z.string().min(10, { message: "Fundamentals must be at least 10 characters if provided." }).optional(),
  shareholding: z.string().min(10, { message: "Shareholding must be at least 10 characters if provided." }).optional(),
  peerRatio: z.string().min(10, { message: "Peer ratio must be at least 10 characters if provided." }).optional(),
  financials: z.object({
    income_statement: z.string().optional(),
    balance_sheet: z.string().optional(),
    cash_flow: z.string().optional()
  }).optional().default({}),
  financialReports: z.array(
    z.object({
      reportName: z.string().min(1, { message: "Report name cannot be empty." }),
      reportLink: z.string().url({ message: "Please enter a valid URL." })
        .min(1, { message: "Report URL cannot be empty." })
    })
  ).optional().default([]),
  category: z.enum(STOCK_CATEGORIES, { errorMap: () => ({ message: "Please select a valid category." }) }).optional(),
  minQuantity: z.coerce.number().int().positive({ message: "Minimum quantity must be a positive integer." }),
  sector: z.string().min(4, { message: "Sector is required." }),
});

export type StockFormValues = z.infer<typeof stockFormSchema>;