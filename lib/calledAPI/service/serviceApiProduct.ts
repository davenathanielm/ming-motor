import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import API from "../axios";

export const fetchProduct = async () => {
    const response = await API.get("/api/products");
    return response.data;
};

export const fetchCategoryProduct =  async() => {
    const response = await API.get ("/api/category");
    return response.data;
}

export const useFetchProducts = () => { 
    return useQuery({
        queryKey: ["product"],
        queryFn: fetchProduct,
    });
};

export const useFetchCategoryProduct = () => {
    return useQuery({
        queryKey: ["category"],
        queryFn: fetchCategoryProduct,
    });

}
