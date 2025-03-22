import { getAllSupplier, getSupplierById, insertSupplier,updateSupplier,deleteSupplier,Supplier } from "../models/supplierModel/supplierModel";

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

export async function insertSupplierService(supplier:Supplier) : Promise<{success: boolean; data?:Supplier; message?:string}>{
    try{
        const result = await insertSupplier(supplier);
        return {success:true, message:"Supplier inserted successfully"}
    }catch(error:any){
        return {success:false, message:error.message}
    }
}

export async function updateSupplierService(id_supplier:number, supplier:Supplier): Promise<{success: boolean; status: number, message?:string}>{
    try{
        const result = await updateSupplier(id_supplier,supplier);
        if(result){
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
        const result = await deleteSupplier(id_supplier);
        if(result){
            return {success:true, message:"Supplier deleted successfully", status:201}
        }else{
            return {success:false, message:"Supplier not found", status:404}
        }
    }catch(e:any){
        return {success:false, message:e.message, status:500}
    }
}