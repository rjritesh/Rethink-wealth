import React from 'react'
import dynamic from 'next/dynamic';

const StockOrdersSideMenu = dynamic(()=>import("@/components/admin/orders/StockOrdersSideMenu"));

function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <div className='py-10 md:py-[80px]'>
      <div className='px-4 max-w-screen-xl mx-auto'>
        <div className='border  border-gray-200 rounded-xl flex overflow-hidden bg-white min-h-[90%]'>
          <div className='h-full px-3 py-4 overflow-y-auto bg-white border-r border-r-gray-200'>
            <StockOrdersSideMenu />
          </div>
          <div className='flex-auto p-4 bg-white h-full'>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default layout
