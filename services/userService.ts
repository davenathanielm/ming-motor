import {getAllUsers,getUserById, insertUser, updateUser, deleteUser} from "../models/userModel/userModel";
import {User} from "../models/userModel/userModel";

export async function getAllUsersService(): Promise<{ success: boolean; data?: User[]; message?: string }> {
    try {
        const users = await getAllUsers();
        return {success: true, data: users}; 
    } catch (error: any) {
        return {success: false, message: error.message}; 
    }
}

export async function getUserByIdService(id: number): Promise<{ success: boolean; data?: User; message?: string }> {
    try {
        const user = await getUserById(id);
        return {success: true, data: user ?? undefined}; 
    } catch (error: any) {
        return {success: false, message: error.message}; 
    }
}

export async function insertUserService(user: User): Promise<{ success: boolean; message?: string}>{
    try{
        const result = await insertUser(user);
        return {success: true , message: "User inserted successfully"};
    } catch (error: any) {
        return {success: false, message: error.message};
    }
}

export async function updateUserService(id:number,user: User): Promise<{success: boolean; message?: string}>{
    try{
        const result = await updateUser(id,user);
        return {success: true , message: "User updated successfully"};
    } catch (error: any) {
        return {success: false, message: error.message};
    }
}

export async function deleteUserService(id:number): Promise<{success: boolean; message?: string}>{
    try{
        const result = await deleteUser(id);
        return {success:true, message: "User deleted successfully"}

    }catch(error: any){
        return {success: false, message: error.message};
    }
}