"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getStocksByCategory } from "@/services/stock_actions";
import EquityCard from "@/components/shared/EquityCard";

export default function DRHPPage() {
  const { data: stocks } = useQuery({
    queryKey: ["drhp-stocks"],
    queryFn: () => getStocksByCategory("HOT PICK"), // same as homepage
  });

  return (
    <section className="py-[40px] md:py-[75px]">
      <div className="max-w-screen-xl mx-auto px-4">
        <h2 className="text-white text-center text-2xl md:text-5xl leading-[36px] md:leading-[70px] font-bold">
          DRHP Filed Companies
        </h2>

        <div className="flex justify-center items-center flex-wrap mt-5 md:mt-10">
          {stocks?.map((item) => (
            <EquityCard item={item} category={item.category} key={item.id} />
          ))}
        </div>
      </div>
    </section>
  );
}
