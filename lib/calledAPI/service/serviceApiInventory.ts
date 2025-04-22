import { useQuery , useMutation, useQueryClient } from "@tanstack/react-query";
import { Inventory } from "../../../models/inventoryModel/inventoryModel";
import { DetailWarehouse } from "../../../models/detail_warehouse/detail_warehouse";
import API from "../axios";

export const fetchInventory = async() => {
    const response = await API.get ("/api/inventory");
    const inventoryResponse = response.data;
    return inventoryResponse.data;
}

export const fetchDetailInventory = async() => {
    const response = await API.get(`/api/detailInventory`);
    const detailinventoryResponse = response.data;
    return detailinventoryResponse.data;
}

export const insertInventory = async(inventory: Inventory) => {
    const response = await API.post("/api/inventory", inventory);
    return response;
}

export const insertDetailInventory = async(detailInventory: DetailWarehouse) => {
    const response = await API.post("/api/detailInventory", detailInventory);
    return response;
}

// ----------------------------------------------------- custom hook to call data from API ------------------------------------------------------------------------

export const useFetchInventory = () => {
    return useQuery({
        queryKey:["inventory"],
        queryFn : fetchInventory,
    });
};

export const useFetchDetailInventory = () =>{
    return useQuery({
        queryKey: ["detailInventory"],
        queryFn : fetchDetailInventory,
    });
};

export const useInsertInventory = () =>{
    const queryClient = useQueryClient();
    return useMutation ({
        mutationFn : insertInventory,
        onSuccess: ()=>{
             queryClient.invalidateQueries({ queryKey: ["inventory"] });
        }
    });
};

export const useInsertDetailInventory = () =>{
    const queryClient = useQueryClient();
    return useMutation ({
        mutationFn : insertDetailInventory,
        onSuccess: ()=>{
             queryClient.invalidateQueries({ queryKey: ["detailinventory"] });
        }
    });
};