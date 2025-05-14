import { DetailWarehouse , getAllDetailWarehouse, insertDetailWarehouse, updateDetailWarehouse,deleteDetailWarehouse, InventorySummary , getInventorySummary } from "../models/detail_warehouse/detail_warehouse";


export async function getAllDetailWarehouseService(): Promise<{ success: boolean; data?: DetailWarehouse[]; message?: string }> {
    try {
        const detailWarehouse = await getAllDetailWarehouse();
        return {success: true, data: detailWarehouse}; 
    } catch (error: any) {
        return {success: false, message: error.message}; 
    }
}

export async function insertDetailWarehouseService(detailWarehouse:DetailWarehouse) : Promise<{success: boolean; data?:DetailWarehouse; message?:string}>{
    try{
        const result = await insertDetailWarehouse(detailWarehouse);
        return {success:true, message:"Detail Warehouse inserted successfully"}
    }catch(error:any){
        return {success:false, message:error.message}
    }
}

export async function updateDetailWarehouseService(detailWarehouse:DetailWarehouse): Promise<{success: boolean; status: number, message?:string}>{
    try{
        const result = await updateDetailWarehouse(detailWarehouse);
        if(result){
            return {success: true , message: "Detail Warehouse Updated Successfully", status:201}
        } else{
            return {success:false, message:"Detail Warehouse not found", status:404}
        }
    } catch(e:any){
        return {success:false, message:e.message, status:500}
    }
}
// export async function updateDetailWarehouseService(id_detail_warehouse:number, detailWarehouse:DetailWarehouse): Promise<{success: boolean; status: number, message?:string}>{
//     try{
//         const result = await updateDetailWarehouse(id_detail_warehouse,detailWarehouse);
//         if(result){
//             return {success: true , message: "Detail Warehouse Updated Successfully", status:201}
//         } else{
//             return {success:false, message:"Detail Warehouse not found", status:404}
//         }
//     } catch(e:any){
//         return {success:false, message:e.message, status:500}
//     }
// }

export async function deleteDetailWarehouseService(id_detail_warehouse:number): Promise<{success:boolean, status:number, message?:string}>{
    try{
        const result = await deleteDetailWarehouse(id_detail_warehouse);
        if(result){
            return {success:true, message:"Detail Warehouse deleted successfully", status:201}
        }else{
            return {success:false, message:"Detail Warehouse not found", status:404}
        }
    }catch(e:any){
        return {success:false, message:e.message, status:500}
    }
}

export async function getInventorySummaryService(): Promise<{success: boolean; data?: InventorySummary[]; message?: string}> {
    try{
        const result = await getInventorySummary();
        return {success: true, data: result}
    }
    catch(error:any){
        return {success: false, message:error.message}
    }
}