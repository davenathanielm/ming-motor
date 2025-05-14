import {getAllUsers,getUserById,insertUser, updateUser, deleteUser, updateUsername, updatePassword} from "../models/userModel/userModel";
import {User} from "../models/userModel/userModel";
import { checkPassword, checkUsername } from "../models/userModel/userModel";
import { comparePassword } from "../lib/auth/hash";
import { hashPassword } from "../lib/auth/hash";
import { updateRole } from "../models/userModel/userModel";
import { Employee, insertEmployeeWithUser } from "../models/employeeModel/employeeModel";

export async function getAllUsersService(): Promise<{ success: boolean; data?: User[]; message?: string }> {
    try {
        const users = await getAllUsers();
        return {success: true, data: users}; 
    } catch (error: any) {
        return {success: false, message: error.message}; 
    }
}

export async function getUserByIdService(id: any): Promise<{ success: boolean; data?: User; message?: string }> {
    try {
        const user = await getUserById(id);
        return {success: true, data: user ?? undefined}; 
    } catch (error: any) {
        return {success: false, message: error.message}; 
    }
}

export async function checkUsernameService(username: string): Promise<{ success: boolean; data?: User; message?: string; status?: number }> {
    try {
        const user = await checkUsername(username);
        if (user){
            return {success: true, data: user ?? undefined, status: 201}; 
        }
        else{
            return {success:false, message: "User not found", status: 404}
        }
    } catch (error: any) {
        return {success: false, message: error.message}; 
    }
}

export async function checkPasswordService(id:any, password: string):Promise<{success: boolean; message?: string; data?:User; status?: number}>{
    try{
        const userResult = await getUserById(id);
        if (userResult === null || userResult === undefined){
            return {success: false, message: "User not found", status: 404};
        }

        const userPassword = userResult.password;
        const result = await comparePassword(password, userPassword);
        if(result){
            return {success: true, message: "Password is correct", data: userResult, status: 200};    
        }        
        else{
            return {success: false, message: "Password is Incorrect", status : 404};
        }
    }catch(error: any){
        return {success: false, message: error.message, status : 500};
    }
}

export async function insertUserService(user: User): Promise<{ success: boolean; message?: string}>{
    try{
       const result = await insertUser(user);
       const employee : Employee = {
            id_user: result,
            full_name: user.fullName,
            phone: user.phone_number,
            position: ""
        };
        const employeeResult = await insertEmployeeWithUser(employee);
        if(!employeeResult){
            return {success: false, message: "Error creating employee"};
       }
        
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

export async function deleteUserService(id:number): Promise<{success: boolean; message?: string; status?: number}>{
    try{
        const result = await deleteUser(id);
        if(result){
            return {success:true, message: "User deleted successfully" , status: 201};
        }
        else{
            return {success: false, message: "User not found", status: 404};
        }

    }catch(error: any){
        return {success: false, message: error.message};
    }
}

export async function updatePasswordService(id: string, newPassword: string): Promise<{ success: boolean; message?: string; status?: number}> {
    try {
        const hashedPassword = await hashPassword(newPassword);
        await updatePassword(id, hashedPassword);
        return { success: true, message: "Password updated successfully", status: 201 };
    } catch (error: any) {
        return { success: false, message: error.message, status: 500 };
    }
}


export async function updateUsernameService(id: string, username: string): Promise<{ success: boolean; message?: string; status?: number}> {
    try {
        await updateUsername(id,username);
        return { success: true, message: "Username updated successfully", status: 201};
    } catch (error: any) {
        return { success: false, message: error.message , status: 500};
    }
}

export async function updateRoleService(id: string, role: string): Promise<{ success: boolean; message?: string; status?: number}> {
    try {
        await updateRole(id, role);
        return { success: true, message: "Role updated successfully", status: 201 };
    } catch (error: any) {
        return { success: false, message: error.message, status: 500 };
    }
}
