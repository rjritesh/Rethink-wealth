// components/addStock/StockFormSection.tsx
'use client';

import React, { ChangeEvent } from 'react';
import Financials from './Financials';
import { Stock, STOCK_CATEGORIES } from '@/types/stock.types';

type StockFormSectionProps = {
  formData: Stock;
  handleDescriptionChange: (field: string, html: string) => void;
  handleFinancialChange: (field: keyof Stock['financials'], html: string) => void;
  handleInputChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
};

const StockFormSection = ({
  formData,
  handleDescriptionChange,
  handleFinancialChange,
  handleInputChange
}: StockFormSectionProps) => {

  const stockCategories = STOCK_CATEGORIES;
  return (
    <>
      {/* Name and Code */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1">
            Stock Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-transparent placeholder:text-gray-350 placeholder:text-sm"
            placeholder="Rethink Wealth"
          />
        </div>

        <div>
          <label htmlFor="code" className="block text-sm font-semibold text-gray-700 mb-1">
            Stock Code
          </label>
          <input
            type="text"
            id="code"
            name="code"
            value={formData.code}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-transparent placeholder:text-gray-350 placeholder:text-sm"
            placeholder="INE12345678"
          />
        </div>
      </div>

      {/* Prices */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="lastPrice" className="block text-sm font-semibold text-gray-700 mb-1">
            Last Price
          </label>
          <input
            type="number"
            step="0.01"
            id="lastPrice"
            name="lastPrice"
            value={formData.lastPrice}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-transparent placeholder:text-gray-350 placeholder:text-sm"
          />
        </div>

        <div>
          <label htmlFor="currentPrice" className="block text-sm font-semibold text-gray-700 mb-1">
            Current Price
          </label>
          <input
            type="number"
            step="0.01"
            id="currentPrice"
            name="currentPrice"
            value={formData.currentPrice}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-transparent placeholder:text-gray-350 placeholder:text-sm"
          />
        </div>
      </div>

      {/* Image URL */}
      <div>
        <label htmlFor="imageUrl" className="block text-sm font-semibold text-gray-700 mb-1">
          Image URL (Optional)
        </label>
        <input
          type="url"
          id="imageUrl"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-transparent placeholder:text-gray-350 placeholder:text-sm"
          placeholder="https://placehold.co/300x200.png"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Description
        </label>
        <div className="bg-white border border-gray-300 rounded-lg shadow-inner">
          <Financials formData={formData} handleDescriptionChange={handleDescriptionChange} handleFinancialChange={handleFinancialChange} />
        </div>
      </div>

      {/* Category & Min Quantity */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div>
          <label htmlFor="category" className="block text-sm font-semibold text-gray-700 mb-1">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-transparent placeholder:text-gray-350 placeholder:text-sm"
          >
            {stockCategories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="minQuantity" className="block text-sm font-semibold text-gray-700 mb-1">
            Minimum Quantity
          </label>
          <input
            type="number"
            id="minQuantity"
            name="minQuantity"
            value={formData.minQuantity}
            onChange={handleInputChange}
            step="1"
            min="1"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-transparent placeholder:text-gray-350 placeholder:text-sm"
          />
        </div>
        <div>
          <label htmlFor="sector" className="block text-sm font-semibold text-gray-700 mb-1">
            Sector
          </label>
          <input
            id="sector"
            name="sector"
            value={formData.sector}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-transparent placeholder:text-gray-350 placeholder:text-sm"
          />
        </div>
      </div>
    </>
  );
};

export default StockFormSection;