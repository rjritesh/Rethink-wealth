'use client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { StockFormValues } from '@/types/schemas';
import { addStockAction, deleteStockById, getStockDetailsById, updateStockDetails } from '@/services/stock_actions';

export function useStockOperations(id?: string) {
    const queryClient = useQueryClient();

    // Add Stock
    const addStock = useMutation({
        mutationFn: addStockAction,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['stocks'] });
        }
    });

    // Update Stock
    const updateStock = useMutation({
        mutationFn: ({ id, data }: { id: string, data: StockFormValues }) =>
            updateStockDetails(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['stocks'] });
            queryClient.invalidateQueries({ queryKey: ['stock'] });
        }
    });

    // Get Stock by ID
    const getStock = useQuery({
        queryKey: ['stock', id],
        queryFn: () => getStockDetailsById(id!),
        enabled: !!id
    });

    // Delete Stock
    const deleteStock = useMutation({
        mutationFn: deleteStockById,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['stocks'] });
        }
    });

    return {
        addStock,
        updateStock,
        getStock,
        deleteStock
    };
}