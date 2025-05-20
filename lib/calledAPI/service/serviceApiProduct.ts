import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Product } from "../../../models/productModel/productModel";
import { UpdateQtyData } from "../../../models/productModel/productModel";
import { toast } from "sonner";
import API from "../axios";

export const fetchProduct = async (role : any) => {
    const response = await API.get(`/api/products?role=${role}`); // this for pass role from req.query and very sensitive case and spacy
    return response.data;
};

export const fetchProductById = async (id:any , role : any) =>{
    const response = await API.get(`/api/products/${id}?role=${role}`);
    return response.data;
};

export const searchBarcodeProduct = async (barcode: any , role :any) => {
  try {
    const response = await API.post(`/api/products/barcode/?role=${role}`, barcode); 
    return { status: response.status, data: response.data };
  } catch (error: any) {
    if (error.response?.status === 404) {
      return { status: 404, data: null }; // safely return 404 instead of throwing
    }
    throw error; // throw for unexpected errors
  }
};

export const insertProduct = async(productData:any) => {
    const response = await API.post("/api/products", productData);
    return response.data;
};

export const updateProduct = async(id:any, productData:any , role: any) => {
    const response = await API.put(`/api/products/${id}?role=${role}`, productData);
    return response.data;
};

export const updateQtyProduct = async(id : any, updateQtyData : UpdateQtyData)=>{
    const response = await API.put(`/api/products/qtyProduct/${id}`, updateQtyData);
    return response.data;
};

export const deleteProduct = async(id:any) => {
    const response = await API.delete(`/api/products/${id}`);
    return response.data;
};

// ----------------------------------------------------- custom hook to call data from API ------------------------------------------------------------------------

export const useFetchProducts = (role : any) => { 
    return useQuery({
        queryKey: ["product"],
        queryFn:() => fetchProduct(role),
    });
};


export const useFetchProductById = (id:any , role : any)=>{
    return useQuery({
        queryKey: ["product", id],
        queryFn: () => fetchProductById(id , role ),
        enabled: !!id, // only run the query if id is truthy
    });
};

export const useSearchBarcodeProduct = (role : string) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (Barcode :any) => searchBarcodeProduct (Barcode,role),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["product"] });
        },
    });
};

export const useInsertProduct = () => {
    const queryClient = useQueryClient();
    return useMutation ({
        mutationFn: insertProduct,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["product"] });
        },
    });
}

export const useUpdateProduct = (id:any , role: any) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn : (productData: Product) => updateProduct(id, productData , role),
        onSuccess:() =>{
            queryClient.invalidateQueries({ queryKey: ["product"] });
        },
        onError: (error: any) => {
            toast.error(error.message || "Gagal memperbarui produk");
        },
    });
}
export const useUpdateQtyProduct = (id : any) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn : (productData: any) => updateQtyProduct(id,productData),
        onSuccess:() =>{
            queryClient.invalidateQueries({ queryKey: ["product"] });
        },
        onError: (error: any) => {
            toast.error(error.message || "Gagal memperbarui qty produk");
        },
    });
}

export const useDeleteProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id:string) => deleteProduct(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["product"] });
        },
    });
}


// information
// 1. if rreturn not only 1 object but return an object must explitly write return but if return only 1 object it can be simplified to just return the object without using return keyword. 
// because already use arrow function =>
// 2. queryKey is key for invalidateQueries
