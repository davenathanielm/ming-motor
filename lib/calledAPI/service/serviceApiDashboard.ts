import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import API from "../axios";

export const fetchDashboardSummary = async () => {
    const response = await API.get("/api/dashboard");
    const result =  response.data;
    return result.data;
};

// ----------------------------------------------------- custom hook to call data from API ------------------------------------------------------------------------

export const useFetchDashboardSummary = () => {
    return useQuery({
        queryKey: ["dashboardSummary"],
        queryFn: fetchDashboardSummary,
    });
};