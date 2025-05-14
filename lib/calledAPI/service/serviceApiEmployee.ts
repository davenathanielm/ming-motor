import {useQuery , useMutation, useQueryClient} from "@tanstack/react-query";
import { Employee } from "../../../models/employeeModel/employeeModel";
import API from "../axios";

export const fetchEmployee = async() =>{
    const response = await API.get ("/api/employee");
    const employeeData = response.data
    return employeeData.data;
}
export const fetchEmployeeById = async (id: any) => {
    const response = await API.get(`/api/employee/${id}`);
    const employeeData = response.data
    return employeeData.data;
}

export const insertEmployee = async(employee: Employee) =>{
    const response = await API.post("/api/employee", employee);
    return response;
}

export const updateEmployee = async (id:string, employee:Employee) => {
    const response = await API.put(`/api/employee/${id}`, employee);
    return response;
}

export const deleteEmployee = async (id:string)=> {
    const response = await API.delete(`/api/employee/${id}`);
    return response;
}

// ----------------------------------------------------- custom hook to call data from API ------------------------------------------------------------------------

export const useFetchEmployee = () => {
    return useQuery({
        queryKey: ["employee"],
        queryFn: fetchEmployee,
    });
}

export const useFetchEmployeeById = (id: any) => {
    return useQuery({
        queryKey: ["employee", id],
        queryFn: () => fetchEmployeeById(id),
        enabled: !!id,
    });
}

export const useInsertEmployee = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: insertEmployee,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey : ["employee"]});
        },
    });
}

export const useUpdateEmployee = (id: any) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (employee: Employee) => updateEmployee(id, employee),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey : ["employee"]});
        },
    });
}

export const useDeleteEmployee = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id_employee : string) => deleteEmployee (id_employee),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey : ["employee"]});
        },
    });
}