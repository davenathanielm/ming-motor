import { useQuery , useMutation, useQueryClient } from "@tanstack/react-query";
import { Category } from "../../../models/categoryModel/categoryModel";
import API from "../axios";

export const fetchCategoryProduct =  async() => {
    const response = await API.get ("/api/category");
    const categoryData = response.data
    return categoryData.data;
}

// ----------------------------------------------------- custom hook to call data from API ------------------------------------------------------------------------

export const useFetchCategoryProduct = () => {
    return useQuery({
        queryKey: ["category"],
        queryFn: fetchCategoryProduct,
    });
}