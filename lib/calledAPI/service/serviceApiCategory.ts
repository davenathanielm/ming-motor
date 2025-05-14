import { useQuery , useMutation, useQueryClient } from "@tanstack/react-query";
import { Category } from "../../../models/categoryModel/categoryModel";
import API from "../axios";

export const fetchCategoryProduct =  async() => {
    const response = await API.get ("/api/category");
    const categoryData = response.data
    return categoryData.data;
}

export const insertCategoryProduct = async(category: Category) => {
    const response = await API.post("/api/category", category);
    return response;
}

export const updateCategoryProduct = async (id:string, category:Category) => {
    const response = await API.put(`/api/category/${id}`, category);
    const categoryData = response.data
    return categoryData.data;
}

export const deleteCategory = async (id:string)=> {
    const response = await API.delete(`/api/category/${id}`);
    return response;
}
// ----------------------------------------------------- custom hook to call data from API ------------------------------------------------------------------------

export const useFetchCategoryProduct = () => {
    return useQuery({
        queryKey: ["category"],
        queryFn: fetchCategoryProduct,
    });
}

export const useInsertCategoryProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: insertCategoryProduct,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey : ["category"]});
        },
    });
}

export const useUpdateCategoryProduct = (id: any) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (category: Category) => updateCategoryProduct(id, category),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey : ["category"]});
        },
    });
}

export const useDeleteCategory = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id_category : string) => deleteCategory (id_category),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey : ["category"]});
        },
    });
}
