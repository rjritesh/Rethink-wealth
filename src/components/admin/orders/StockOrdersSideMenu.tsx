import React from 'react'
import SideMenu from './SideMenu'
import { getAllStocks } from '@/services/stock_actions'

async function StockOrdersSideMenu() {
    const stocks = await getAllStocks();
    const stockData = stocks.map((stock) => ({
        id: stock.id,
        name: stock.name,
    }));
    return (
        <>
            <SideMenu data = {stockData} preLink={'/admin/stock-report'} />
        </>
    )
}

export default StockOrdersSideMenu
