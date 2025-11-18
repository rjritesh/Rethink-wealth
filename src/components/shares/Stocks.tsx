'use client'
import { useQuery } from '@tanstack/react-query'
import EquityCard from '../shared/EquityCard';
import { getAllStocks } from '@/services/stock_actions';
import { EquityCardSkeleton } from '../skeletons/EquityCardSkeleton';

function Stocks() {
    const { data: stocks, isLoading, error } = useQuery({
        queryKey: ['stocks'],
        queryFn: getAllStocks
    });

    if (error) return <div>Error loading stocks</div>;

    return (
        <section className='bg-gray-50 py-[40px] md:py-[75px]'>
            <div className='max-w-screen-xl mx-auto px-4 '>
                <div className='flex justify-center items-center flex-wrap'>
                    {
                        isLoading ? <EquityCardSkeleton /> :
                            stocks?.map((item) => (
                                <EquityCard key={item.id} item={item} />
                            ))
                    }
                </div>
            </div>
        </section>
    )
}                                   

export default Stocks
