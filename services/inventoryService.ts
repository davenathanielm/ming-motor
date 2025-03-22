import { getAllInventory, getInventoryById , updateInventory, deleteInventory , insertInventory, Inventory} from "../models/inventoryModel/inventoryModel";

export async function getAllInventoryService(): Promise<{ success: boolean; data?: Inventory[]; message?: string }> {
    try {
        const inventory = await getAllInventory();
        return {success: true, data: inventory}; 
    } catch (error: any) {
        return {success: false, message: error.message}; 
    }
}

export async function getInventoryByIdService(id_inventory : number) : Promise<{ success: boolean; data?: Inventory; message?: string; status:number}> {
    try{
        const inventory = await getInventoryById(id_inventory);
        if(inventory){
            return {success: true, data: inventory, status: 201}
        }
        else{
            return {success: false, status: 404, message: "Inventory not found"}
        }

    } catch (error : any){
        return {success: false, message:error.message , status:500}
    }
}

export async function insertInventoryService(inventory:Inventory) : Promise<{success: boolean; data?:Inventory; message?:string}>{
    try{
        const result = await insertInventory(inventory);
        return {success:true, message:"Inventory inserted successfully"}
    }catch(error:any){
        return {success:false, message:error.message}
    }
}

export async function updateInventoryService(id_inventory:number, inventory:Inventory): Promise<{success: boolean; status: number, message?:string}>{
    try{
        const result = await updateInventory(id_inventory,inventory);
        if(result){
            return {success: true , message: "Inventory Updated Successfully", status:201}
        } else{
            return {success:false, message:"Inventory not found", status:404}
        }
    } catch(e:any){
        return {success:false, message:e.message, status:500}
    }
}

export async function deleteInventoryService(id_inventory:number): Promise<{success:boolean, status:number, message?:string}>{
    try{
        const result = await deleteInventory(id_inventory);
        if(result){
            return {success:true, message:"Inventory deleted successfully", status:201}
        }else{
            return {success:false, message:"Inventory not found", status:404}
        }
    }catch(e:any){
        return {success:false, message:e.message, status:500}
    }
}