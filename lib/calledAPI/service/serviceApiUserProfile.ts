import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import { User } from '../../../models/userModel/userModel';
import API from '../axios';

export const fetchAllUser = async() => {
    const response = await API.get("/api/users")
    const userResponse = response.data;
    return userResponse.data;
}

export const fetchUserById = async(id: any) => {
    const response = await API.get(`/api/users/${id}`)
    const userResponse = response.data;
    return userResponse.data;
}

export const insertUser = async(user: User) => {
    const response = await API.post("/api/users", user)
    return response.data;
}

export const updateUser = async(id: any, user : User) => {
    const response = await API.put(`/api/users/${id}`, user)
    return response.data;
}

export const deleteUser = async(id:any) => {
    const response = await API.delete(`/api/users/${id}`)
    return response.data;
}

export const checkPassword = async(id:any, password: string) => {
    try{
        const response = await API.put(`api/users/checkPassword/${id}`, password)
        return response.data;
    }catch(err: any) {
        if(err.response?.status === 404) {
            return { status: 404, data: null }; // safely return 404 instead of throwing
        }
        throw err; // throw for unexpected errors
    }
}

export const updatePassword = async(id:any, password: string) => {
    const response = await API.put(`/api/users/updatePassword/${id}`, password)
    return response.data;
}

export const updateUsername = async(id:any, username: string) => {
    const response = await API.put(`/api/users/updateUsername/${id}`, username)
    return response.data;
}

export const registerUser = async(user: User) => {
    const response = await API.post("/api/auth/register", user)
    return response.data;
}

export const loginUser = async(user : User) => {
    try{
        const response = await API.post("/api/auth/login", user)
        return { status: response.status , token: response.data.token }; // return status and token
    }catch (error:any){
    if (error.response?.status === 404 || error.response?.status === 401) {
      return { status: 401 }; // safely return 404 instead of throwing
    }
    throw error; 
    }
}

export const userAccess = async() => {
    const response = await API.get("/api/auth/userAccess")
    return response.data;
}


// ----------------------------------------------------- custom hook to call data from API ------------------------------------------------------------------------

export const useFetchUser = () => {
    return useQuery({
        queryKey:["users"],
        queryFn : fetchAllUser,
    });
}

export const useFetchUserById = (id: any) => {
    return useQuery({
        queryKey:["user",id],
        queryFn : () => fetchUserById(id),
        enabled: !!id,
    });
}

export const useInsertUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn : insertUser,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["users"]})
        },
    });
}

export const useLoginUser = ()=> {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn : loginUser,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["users"]})
        },
    })
 }

export const useRegisterUser = () =>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn : registerUser,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["users"]})
        },
    });
}

export const useUpdateUser = (id:any) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn : (user : User) => updateUser(id, user),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["users"]})
        },
    });
}

export const useCheckPassword = (id:any) => {
    return useMutation({
        mutationFn : (password: any) => checkPassword(id, password),
    });
}

export const useUpdatePassword = (id:any) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn : (password: any) => updatePassword(id, password),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["users"]})
        },
    });
}

export const useUpdateUsername = (id:any) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn : (username: any) => updateUsername(id, username),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["users"]})
        },
    });
}

export const useDeleteUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn : (id : any) => deleteUser(id),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["users"]})
        },
    })

}
export const useUserAccess = () => {
    return useQuery({
        queryKey:["users access"],
        queryFn : userAccess,
    });
}

