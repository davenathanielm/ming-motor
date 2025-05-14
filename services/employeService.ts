import { getAllEmployee , getEmployeeById , insertEmployee , updateEmployee , deleteEmployee, Employee } from "../models/employeeModel/employeeModel";
import { updateRole } from "../models/userModel/userModel";

export async function getAllEmployeeService(): Promise<{ success: boolean; data?: any[]; message?: string }> {
    try {
        const employee = await getAllEmployee();
        return {success: true, data: employee}; 
    } catch (error: any) {
        return {success: false, message: error.message}; 
    }
}

export async function getEmployeeByIdService(id_employee : any) : Promise<{ success: boolean; data?: any; message?: string; status:number}> {
    try{
        // const id_employee = 4;
        const employee = await getEmployeeById(id_employee);
        if(!!employee){
            return {success: true, data: employee, status: 201}
        }
        else{
            return {success: false, status: 404, message: "Employee not found"}
        }
    }
    catch (error : any){
        return {success: false, message:error.message , status:500}
    }
}

export async function insertEmployeeService(employee:Employee) : Promise<{success: boolean; data?:any; message?:string}>{
    try{
        await insertEmployee(employee);
        return {success:true, message:"Employee inserted successfully"}
    }catch(error:any){
        return {success:false, message:error.message}
    }
}

export async function updateEmployeeService(id_employee:any, employee:Employee): Promise<{success: boolean; status: number, message?:string}>{
    try{
        const result = await updateEmployee(id_employee,employee);
        if(!!employee.id_user){
            try{
                await updateRole(employee.id_user, employee.position);
            }
            catch(e:any){
                return {success:false, message:"role can't be updated", status:500}
            }
        }
        if(result){
            return {success: true , message: "Employee Updated Successfully", status:201}
        } else{
            return {success:false, message:"Employee not found", status:404}
        }
    } catch(e:any){
        return {success:false, message:e.message, status:500}
    }
}

export async function deleteEmployeeService(id_employee:any): Promise<{success:boolean, status:number, message?:string}>{
    try{
        const result = await deleteEmployee(id_employee);
        if(result){
            return {success:true, message:"Employee deleted successfully", status:201}
        }else{
            return {success:false, message:"Employee not found", status:404}
        }
    }catch(e:any){
        return {success:false, message:e.message, status:500}
    }
}