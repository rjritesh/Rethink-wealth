import Skeleton from "./Skeleton";

export function StockDetailSkeleton() {
    return (
        <div>
            {/* Header Section */}
            <section className='bg-white text-black py-[40px] md:py-[75px]'>
                <div className='max-w-screen-xl mx-auto px-4'>
                    <div className='flex justify-center items-center flex-wrap'>
                        <div className='w-full md:w-2/3'>
                            <div className="block">
                                <div className='w-[60px] md:w-[150px]'>
                                    <Skeleton className="h-[60px] w-[60px] md:h-[75px] md:w-[75px] rounded-full" />
                                </div>
                                <div className='mt-4'>
                                    <Skeleton className="h-[18px] w-3/4 md:h-[36px] md:w-1/2" />
                                    <div className="flex items-center mt-1 md:mt-3">
                                        <Skeleton className="h-[13px] w-[50px] md:h-[18px] md:w-[80px]" />
                                        <Skeleton className="h-[12px] w-[60px] md:h-[14px] md:w-[100px] ms-4" />
                                    </div>
                                </div>
                            </div>
                            <div className="mt-2 md:mt-3 flex items-center">
                                <Skeleton className="h-[15px] w-[80px] md:h-[32px] md:w-[120px]" />
                                <Skeleton className="h-[15px] w-[60px] md:h-[32px] md:w-[80px] ms-2" />
                                <Skeleton className="h-[12px] w-[30px] md:h-[20px] md:w-[40px] ms-2 md:ms-4" />
                            </div>
                        </div>
                        <div className='w-full md:w-1/3 mt-8 md:mt-0'>
                            <Skeleton className="h-[200px] w-full rounded-lg" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Tabs Section */}
            <section className='bg-white text-black py-[40px] md:py-[75px] border-t border-[#555151]'>
                <div className='max-w-screen-xl mx-auto px-4'>
                    <div className='flex items-center flex-wrap gap-4'>
                        <Skeleton className="h-10 w-32 rounded-lg" />
                        <Skeleton className="h-10 w-32 rounded-lg" />
                    </div>

                    <div className='mt-10'>
                        {/* Company Overview Skeleton */}
                        <div className="w-full lg:w-[70%] space-y-4">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-4/5" />
                            <Skeleton className="h-4 w-3/4" />
                            <Skeleton className="h-4 w-5/6" />
                            <Skeleton className="h-4 w-2/3" />
                            <Skeleton className="h-4 w-3/5" />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}