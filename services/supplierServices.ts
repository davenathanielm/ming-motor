import { getAllSupplier, getSupplierById, insertSupplier,updateSupplier,deleteSupplier,Supplier } from "../models/supplierModel/supplierModel";
import { insertNotificationService } from "./notificationService";

export async function getAllSupplierService(): Promise<{ success: boolean; data?: Supplier[]; message?: string }> {
    try {
        const supplier = await getAllSupplier();
        return {success: true, data: supplier}; 
    } catch (error: any) {
        return {success: false, message: error.message}; 
    }
}

export async function getSupplierByIdService(id_supplier : number) : Promise<{ success: boolean; data?: Supplier; message?: string; status:number}> {
    try{
        const supplier = await getSupplierById(id_supplier);
        if(supplier){
            return {success: true, data: supplier, status: 201}
        }
        else{
            return {success: false, status: 404, message: "Supplier not found"}
        }

    } catch (error : any){
        return {success: false, message:error.message , status:500}
    }
}

export async function insertSupplierService(supplier:Supplier, userId : any) : Promise<{success: boolean; data?:Supplier; message?:string}>{
    try{
        await insertSupplier(supplier);
        const notification = {
            id_user : userId,
            message : `menambahkan data supplier ${supplier.supplier_name}`,
            type: "insert supplier",
            table_name : "supplier",
            entity_name :`${supplier?.supplier_name}`
        }
        await insertNotificationService(notification, userId);
        return {success:true, message:"Supplier inserted successfully"}
    }catch(error:any){
        return {success:false, message:error.message}
    }
}

export async function updateSupplierService(id_supplier:number, supplier:Supplier): Promise<{success: boolean; status: number, message?:string}>{
    try{
        const userId = 5;
        const result = await updateSupplier(id_supplier,supplier);
        if(result){
            const notification = {
                id_user : userId,
                message : `mengubah data supplier ${supplier.supplier_name}`,
                type: "update supplier",
                table_name : "supplier",
                entity_name :`${supplier?.supplier_name}`
            }
            await insertNotificationService(notification, userId);
            return {success: true , message: "Supplier Updated Successfully", status:201}
        } else{
            return {success:false, message:"Supplier not found", status:404}
        }
    } catch(e:any){
        return {success:false, message:e.message, status:500}
    }
}

export async function deleteSupplierService(id_supplier:number): Promise<{success:boolean, status:number, message?:string}>{
    try{
        const userId = 5;
        const supplier = await getSupplierById(id_supplier);
        const result = await deleteSupplier(id_supplier);
        if(result){
            const notification = {
                id_user : userId,
                message : `menghapus data supplier ${supplier?.supplier_name}`,
                type: "delete supplier",
                table_name : "supplier",
                entity_name :`${supplier?.supplier_name}`
            }
            await insertNotificationService(notification, userId);
            return {success:true, message:"Supplier deleted successfully", status:201}
        }else{
            return {success:false, message:"Supplier not found", status:404}
        }
    }catch(e:any){
        return {success:false, message:e.message, status:500}
    }
}