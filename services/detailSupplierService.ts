import { DetailSupplier , getAllDetailSupplier, updateDetailSupplier, insertDetailSupplier ,deleteDetailSupplier, getSupplierSummary, getSupplierSummaryToday } from "../models/detail_supplier/detail_supplier";

export async function getAllDetailSupplierService(): Promise<{ success: boolean; data?: DetailSupplier[]; message?: string }> {
    try {
        const detailSupplier = await getAllDetailSupplier();
        return {success: true, data: detailSupplier}; 
    } catch (error: any) {
        return {success: false, message: error.message}; 
    }
}

export async function insertDetailSupplierService(detailSupplier:DetailSupplier) : Promise<{success: boolean; data?:DetailSupplier; message?:string}>{
    try{
        const result = await insertDetailSupplier(detailSupplier);
        return {success:true, message:"Detail Supplier inserted successfully"}
    }catch(error:any){
        return {success:false, message:error.message}
    }
}

export async function updateDetailSupplierService(detailSupplier:DetailSupplier): Promise<{success: boolean; status: number, message?:string}>{
    try{
        const result = await updateDetailSupplier(detailSupplier);
        if(result){
            return {success: true , message: "Detail Supplier Updated Successfully", status:201}
        } else{
            return {success:false, message:"Detail Supplier not found", status:404}
        }
    } catch(e:any){
        return {success:false, message:e.message, status:500}
    }
}

export async function deleteDetailSupplierService(id_detail_supplier:number): Promise<{success:boolean, status:number, message?:string}>{
    try{
        const result = await deleteDetailSupplier(id_detail_supplier);
        if(result){
            return {success:true, message:"Detail Supplier deleted successfully", status:201}
        }else{
            return {success:false, message:"Detail Supplier not found", status:404}
        }
    }catch(e:any){
        return {success:false, message:e.message, status:500}
    }
}

export async function getSupplierSummaryService(): Promise<{ success: boolean; data?: any[]; message?: string;}> {
    try{
        const result = await getSupplierSummary();
        return {success: true, data: result}
    }
    catch(error:any){
        return {success: false, message:error.message}
    }
}

export async function getSupplierSummaryTodayService(): Promise<{ success: boolean; data?: any[]; message?: string;}> {
    try{
        const result = await getSupplierSummaryToday();
        return {success: true, data: result}
    }
    catch(error:any){
        return {success: false, message:error.message}
    }
}