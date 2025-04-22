import { useQuery , useMutation, useQueryClient } from "@tanstack/react-query";
import { Supplier } from "../../../models/supplierModel/supplierModel";
import { DetailSupplier } from "../../../models/detail_supplier/detail_supplier";
import API from "../axios";

export const fetchSupplier = async() => {
    const response = await API.get ("/api/supplier");
    const supplierResponse = response.data;
    return supplierResponse.data;
}

export const fetchDetailSupplier = async() => {
    const response = await API.get(`/api/detailSupplier`);
    const detailSupplierResponse = response.data;
    return detailSupplierResponse.data;
}

export const insertSupplier = async(supplier: Supplier) => {
    const response = await API.post("/api/supplier", supplier);
    return response;
}

export const insertDetailSupplier = async(detailSupplier: DetailSupplier) => {
    const response = await API.post("/api/detailSupplier", detailSupplier);
    return response;
}

// ----------------------------------------------------- custom hook to call data from API ------------------------------------------------------------------------

export const useFetchSuplier = () => {
    return useQuery({
        queryKey:["supplier"],
        queryFn : fetchSupplier,
    });
};

export const useFetchDetailSupplier = () =>{
    return useQuery({
        queryKey: ["detailSupplier"],
        queryFn : fetchDetailSupplier,
    });
};

export const useInsertSupplier = () =>{
    const queryClient = useQueryClient();
    return useMutation ({
        mutationFn : insertSupplier,
        onSuccess: ()=>{
             queryClient.invalidateQueries({ queryKey: ["supplier"] });
        }
    });
};

export const useInsertDetailSupplier = () =>{
    const queryClient = useQueryClient();
    return useMutation ({
        mutationFn : insertDetailSupplier,
        onSuccess: ()=>{
             queryClient.invalidateQueries({ queryKey: ["detailSupplier"] });
        }
    });
};