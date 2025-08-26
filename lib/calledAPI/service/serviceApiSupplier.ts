import { useQuery , useMutation, useQueryClient } from "@tanstack/react-query";
import { Supplier } from "../../../models/supplierModel/supplierModel";
import { DetailSupplier } from "../../../models/detail_supplier/detail_supplier";
import { SupplierSummary } from "../../../models/detail_supplier/detail_supplier";
import API from "../axios";
import { insertNotification } from "../../../models/notificationModel/notificationModel";

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
    const response = await API.post(`/api/supplier`, supplier);
    return response.data;
}

export const insertDetailSupplier = async(detailSupplier: DetailSupplier) => {
    const response = await API.post("/api/detailSupplier", detailSupplier);
    return response;
}

export const updateSupplier = async (id:string,supplier:Supplier)=>{
    const response = await API.put(`/api/supplier/${id}`, supplier);
    const supplierData = response.data;
    return supplierData.data;
}

export const deleteSupplier = async(id:string) =>{
    const response = await API.delete(`/api/supplier/${id}`);
    return response;
}

export const getSupplierSummary = async () => {
    const response = await API.get("/api/summarySupplier");
    const supplierSummaryResponse = response.data;
    return supplierSummaryResponse.data;
}

export const fetchSupplierSummaryToday = async () => {
    const response = await API.get("/api/summarySupplier/dashboard");
    const result = response.data;
    return result.data;
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
        mutationFn : (supplier: Supplier) => insertSupplier(supplier),
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
}

export const useUpdateSupplier = (id:any) => {
    const queryClient= useQueryClient();
    return useMutation({
        mutationFn: (supplier:Supplier)=> updateSupplier(id,supplier),
        onSuccess:()=>{
            queryClient.invalidateQueries({ queryKey: ["supplier"] });
        },
    });

}

export const useDeleteSupplier = ()=>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id:any) => deleteSupplier(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["supplier"] });
        },
    });
}

export const useFetchSupplierSummary = () => {
    return useQuery({
        queryKey: ["supplierSummary"],
        queryFn: getSupplierSummary,
    });
};

export const useFetchSupplierSummaryToday = () => {
    return useQuery({
        queryKey: ["supplierSummaryToday"],
        queryFn: fetchSupplierSummaryToday,
    });
}