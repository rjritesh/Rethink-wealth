import { Metadata } from "next";
import StockDetails from "./StockDetails";
import { getStockDetailsById } from "@/services/stock_actions";

export async function generateMetadata({ params }: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  try {
    const {id} = await params;
    const data = await getStockDetailsById(id);
    return {
      title: `${data?.name} Unlisted Share Price - Pre-IPO Stock | Rethink Wealth`,
      description: `Check the latest unlisted share price of ${data?.name}, traded in the grey market. View valuation, key insights, and buy before it gets listed only on Rethink Wealth.`,
    };
  } catch  {
    return {
      title: "Stock Details | Rethink Wealth",
      description: "View detailed information about unlisted shares",
    };
  }
}

const Page = async () => {
  return <StockDetails />;
};

export default Page;