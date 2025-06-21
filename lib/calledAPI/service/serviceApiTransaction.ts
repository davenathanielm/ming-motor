import { useMutation , useQuery , useQueryClient } from "@tanstack/react-query";
import { ProductTransaction } from "../../../models/productModel/productModel";
import API from "../axios";

export const transactionService = async (items: ProductTransaction[]) => {
    const response = await API.put("/api/transaction", items);
    return response.data;
};

export const insertTransactionService = async (transaction :any , transactionItems : any[]) => {
    const response = await API.post("/api/transaction", {transaction, transactionItems});
    return response.data;
}

export const fetchAllTransactionService = async () => {
    const response = await API.get("/api/transaction");
    const result = response.data;
    return result.data
}

export const fetchTransactionEarningService = async () => {
    const response = await API.get("/api/transaction/earning");
    const result = response.data;
    return result.data;
}

export const fetchTransactionToday = async () => {
    const response = await API.get("/api/transaction/dashboard");
    const result = response.data;
    return result.data;
}

export const fetchTransactionItems = async(id: any) => {
    const response = await API.get(`/api/transaction/transactionItems/${id}`);
    const result = response.data;
    return result.data;
}

// ----------------------------------------------------- custom hook to call data from API ------------------------------------------------------------------------
export const useTransactionService = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: transactionService,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["transactions"] });
        },
        onError: (error: any) => {
            console.error("Error during transaction:", error);
        },
    });
};

export const useInsertTransaction = () =>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn : ({transaction, transactionItems} : {transaction : any , transactionItems : any[]}) => insertTransactionService(transaction, transactionItems),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["transactions"] });
        },
        onError: (error: any) => {
            console.error("Error during transaction insertion:", error);
        },
    })
}

export const useFetchAllTransaction = () => {
    return useQuery({
        queryKey: ["transactions"],
        queryFn: fetchAllTransactionService,
    });
};

export const useFetchTransactionEarning = () => {
    return useQuery({
        queryKey: ["transactionEarning"],
        queryFn: fetchTransactionEarningService,
    });
};

export const useFetchTransactionToday = () => {
    return useQuery({
        queryKey : ["transactionToday"],
        queryFn : fetchTransactionToday,
    })
}

export const useFetchTransactionItems = (id: any) => {
    return useQuery({
        queryKey: ["transactionItems", id],
        queryFn: () => fetchTransactionItems(id),
        enabled: !!id, // Only run the query if id is defined
    });
}