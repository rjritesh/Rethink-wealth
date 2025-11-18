import React from 'react'
import dynamic from 'next/dynamic';

const CustomerSearch = dynamic(()=>import("@/components/admin/customer-report/CustomerSearch"));

function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <div className="py-10 md:py-[80px]">
      <div className="px-4 max-w-screen-xl mx-auto">
        <div className="border border-gray-200 rounded-xl flex flex-wrap md:flex-nowrap overflow-hidden bg-white min-h-[90%]">
          <CustomerSearch />
          {children}
        </div>
      </div>
    </div>
  )
}

export default layout
